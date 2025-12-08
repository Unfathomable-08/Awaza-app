import Icon from "@/assets/icons";
import ScreenWrapper from "@/components/ui/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { hp, wp } from "@/utils/common";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { styles } from "@/styles/inbox";
import { timeAgo } from "@/utils/common";

export default function Inbox(){
   const router = useRouter();
   const { user } = useAuth();
   const conversations = [
     {
        id: "1",
        user: {
           id: "2",
           name: "Muhammad",
           username: "muhammad124711",
           image: "https://i.pravatar.cc/150?img=1"
        },
        lastMessage: "Hey, how are you doing?",
        lastMessageAt: "2024-07-20T12:00:00Z",
     },
     {
        id: "2",
        user: {
           id: "3",
           name: "MD",
           username: "m8374527",
           image: "https://i.pravatar.cc/150?img=2"
        },
        lastMessage: "I'm good, thanks! How about you?",
        lastMessageAt: "2024-07-20T12:05:00Z"
     },
     {
        id: "3",
        user: {
           id: "4",
           name: "John Doe",
           username: "johndoe",
           image: "https://i.pravatar.cc/150?img=3"
        },
        lastMessage: "Let's catch up soon!",
        lastMessageAt: "2024-07-20T12:10:00Z"
     }
   ]

  return (
    <ScreenWrapper bg="#fff">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Pressable onPress={() => router.push("/(app)/inbox2")}>
          <Icon name="chat" size={24} color={theme.colors.text} />
        </Pressable>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.conversationItem}
            onPress={() => router.push(`/(app)/inbox/${item.id}`)}
            >
            <Image
              source={{ uri: item.user.image }}
              style={styles.conversationAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.conversationName}>{item.user.name}</Text>
              <Text style={styles.conversationLastMessage}>
                {item.lastMessage}
              </Text>
              <Text style={styles.conversationTime}>
                {timeAgo(item.lastMessageAt)}
              </Text>
            </View>
            {/* Unread dot */}
            {item.id === "1" && (
              <View style={styles.unreadDot} />
            )}
            {/* Unread count */}
            <View style={styles.unreadCount}>
              <Text style={styles.unreadCountText}>2</Text>
            </View>
          </Pressable>
        ))}
      />
      {/* New Message Button */}
      <Pressable style={styles.newMessageBtn}>
        <Icon name="edit" size={24} color="#fff" />
      </Pressable>
  )
}