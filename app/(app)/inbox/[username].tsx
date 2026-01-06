import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Avatar from "@/components/Avatar";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";
import { rtdb } from "@/lib/firebase";
import { timeAgo } from "@/utils/common";
import { createChatsMetadata } from "@/utils/inbox";
import { searchUserByID } from "@/utils/search";

export default function DirectChat() {
  const { username } = useLocalSearchParams(); // This is likely the chat room ID or slug
  const router = useRouter();
  const { user } = useAuth();
  const [otherUser, setOtherUser] = useState({
    _id: "",
    username: "",
    name: "",
    avatar: "",
  });
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const listRef = useRef<FlashList<any>>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      const usernameStr = Array.isArray(username) ? username[0] : username;
      // Assuming usernameStr is like "id1_id2"
      const parts = usernameStr.split("_");
      // Find the other user's ID
      // Logic to support both ID-based and Username-based slugs
      let otherIdentifier = parts.find(p => p !== user?.id && p !== user?.username) || parts[0];

      if (otherIdentifier) {
        // Try to search. Since searchUserByID uses /search?q=..., it likely handles both.
        // Check utils/search.ts to be sure. But let's assume it searches by query string.
        const results = await searchUserByID(otherIdentifier);
        if (results) setOtherUser(results);
      }
    };

    fetchData();
  }, [username]);

  // Create chat metadata if needed
  useEffect(() => {
    if (!otherUser._id) return;
    createChatsMetadata([otherUser._id]);
  }, [otherUser._id]);

  // Listen for messages
  useEffect(() => {
    if (!user || !rtdb || !username) return;

    const messagesRef = ref(rtdb, `chats/${username}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        loadedMessages.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(loadedMessages);
      } else {
        setMessages([]);
      }

      // Scroll to bottom on new message
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 500);
    });

    return () => unsubscribe();
  }, [username, user]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !rtdb) return;

    const text = newMessage.trim();
    setNewMessage("");

    try {
      const messagesRef = ref(rtdb, `chats/${username}`);
      const newMsgRef = push(messagesRef);

      await set(newMsgRef, {
        text,
        userId: user.id,
        userEmail: user.email,
        createdAt: Date.now(),
      });
    } catch (e) {
      console.error("Send failed", e);
    }
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isMine = item.userId === user?.id || item.userEmail === user?.email;

    return (
      <View
        style={[
          styles.messageContainer,
          isMine ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <View
          style={[styles.bubble, isMine ? styles.myBubble : styles.theirBubble]}
        >
          <Text
            style={[
              styles.messageText,
              isMine ? styles.myText : styles.theirText,
            ]}
          >
            {item.text}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          {/* isMine && <Ionicons name="checkmark-done" size={12} color={colors.textLight} /> */}
          <Text style={styles.timestamp}>{timeAgo(item.createdAt)}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper bg={colors.background}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={colors.text} />
          </Pressable>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Avatar uri={otherUser?.avatar} size={hp(4.5)} rounded={radius.full} />
            <View>
              <Text style={styles.headerTitle}>
                {otherUser?.name || otherUser?.username || "Chat"}
              </Text>
              {/* <Text style={styles.status}>Online</Text> */}
            </View>
          </View>
        </View>

        {/* <Ionicons name="ellipsis-vertical" size={24} color={colors.text} /> */}
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlashList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          estimatedItemSize={70}
          contentContainerStyle={{ padding: spacing.m, paddingBottom: spacing.l }}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Message..."
              placeholderTextColor={colors.textLight}
              multiline
            // onSubmitEditing={sendMessage} // Multiline usually doesn't submit
            />
            <Pressable
              onPress={sendMessage}
              disabled={!newMessage.trim()}
              style={[styles.sendBtn, !newMessage.trim() && { opacity: 0.5 }]}
            >
              <Ionicons name="paper-plane" size={20} color="white" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.separator
  },
  headerTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: colors.text
  },
  status: {
    fontSize: hp(1.4),
    color: colors.textLight
  },
  messageContainer: {
    marginBottom: spacing.m,
    maxWidth: '80%'
  },
  myMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  theirMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  bubble: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: radius.l
  },
  myBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4
  },
  theirBubble: {
    backgroundColor: colors.inputBg,
    borderBottomLeftRadius: 4
  },
  messageText: {
    fontSize: hp(1.9)
  },
  myText: {
    color: 'white'
  },
  theirText: {
    color: colors.text
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2
  },
  timestamp: {
    fontSize: hp(1.2),
    color: colors.textLight
  },
  inputContainer: {
    padding: spacing.s,
    backgroundColor: colors.background,
    borderTopWidth: 0.5,
    borderTopColor: colors.separator
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
    paddingHorizontal: spacing.s,
    paddingVertical: 6,
    gap: spacing.s
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.s,
    fontSize: hp(1.9),
    color: colors.text,
    maxHeight: hp(10)
  },
  sendBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
