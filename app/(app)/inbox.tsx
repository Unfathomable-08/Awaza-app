import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { commonStyles, hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";
import { getChatsMetadata } from "@/utils/inbox";
import { searchUsers } from "@/utils/search";

export default function Inbox() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getChatsMetadata();
      setMessages(res || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setIsSearching(true);
    try {
      const results = await searchUsers(searchQuery.trim());
      setSearchResults(results || []);
    } catch (err) {
      Alert.alert("Error", "Failed to search users.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setSearchResults([]);
  };

  const renderMessageItem = ({ item }: { item: any }) => {
    const otherUser = item.users?.find((u: any) => u._id !== user?.id) || item.users?.[0];
    const username = otherUser?.username || 'Unknown';
    const avatar = otherUser?.avatar;
    const isOnline = otherUser?.isOnline;

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => router.push(`/(app)/inbox/${item.slug}`)} // Assuming slug is unique ID for chat room
      >
        <View>
          <Image source={avatar ? { uri: avatar } : require("@/assets/images/default_user.jpg")} style={styles.avatar} />
          {isOnline && <View style={styles.onlineDot} />}
        </View>
        <View style={styles.chatContent}>
          <View style={commonStyles.rowBetween}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.time}>{item.timestamp}</Text>
          </View>
          <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage}</Text>
        </View>
        {item.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unread}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSearchUser = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => {
        if (!user?.username || !item.username) return;
        const sortedUsernames = [user.id, item._id].sort();
        const chatPath = sortedUsernames.join("_");
        router.push(`/(app)/inbox/${chatPath}`);
      }}
    >
      <Image
        source={item.avatar ? { uri: item.avatar } : require("@/assets/images/default_user.jpg")}
        style={styles.avatar}
      />
      <View style={{ justifyContent: 'center', marginLeft: 10 }}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper bg={colors.background}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.text} />
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={clearSearch}>
            <Ionicons name="close-circle" size={18} color={colors.textLight} />
          </Pressable>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <FlashList
          data={isSearching ? searchResults : messages}
          keyExtractor={(item: any) => item._id}
          renderItem={({ item }) =>
            isSearching ? renderSearchUser({ item }) : renderMessageItem({ item })
          }
          estimatedItemSize={70}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: spacing.m, paddingTop: hp(1) }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubbles-outline" size={80} color="#ddd" />
              <Text style={styles.emptyText}>
                {isSearching ? "No users found" : "No messages yet"}
              </Text>
              <Text style={styles.emptySubtext}>
                {isSearching
                  ? `No results for "${searchQuery}"`
                  : "Start a conversation!"}
              </Text>
            </View>
          }
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: '700',
    color: colors.text
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    marginHorizontal: spacing.m,
    paddingHorizontal: spacing.s,
    borderRadius: radius.m,
    height: 40,
    gap: 8
  },
  searchInput: {
    flex: 1,
    color: colors.text
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.separator,
    gap: spacing.m
  },
  avatar: {
    width: hp(6),
    height: hp(6),
    borderRadius: radius.full,
    backgroundColor: '#eee'
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: colors.success,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.background
  },
  chatContent: {
    flex: 1,
    gap: 4
  },
  username: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: colors.text
  },
  time: {
    fontSize: hp(1.4),
    color: colors.textMuted
  },
  lastMsg: {
    fontSize: hp(1.6),
    color: colors.textLight
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(10),
    gap: 10
  },
  emptyText: {
    fontSize: hp(2),
    color: colors.text,
    fontWeight: '600'
  },
  emptySubtext: {
    fontSize: hp(1.6),
    color: colors.textLight
  }
});
