import Icon from "@/assets/icons";
import Avatar from "@/components/Avatar";
import Feed from "@/components/Feed";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { commonStyles, hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";
import { loadFeed } from "@/utils/feed";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Load more
  const onEndReached = () => {
    if (hasMore && !loading)
      loadFeed({
        isLoadMore: true,
        loading,
        setLoading,
        refreshing,
        setRefreshing,
        hasMore,
        setHasMore,
        cursor,
        setCursor,
        setPosts,
      });

  };

  // Pull to refresh
  const onRefresh = () => {
    setCursor(null);
    setHasMore(true);
    loadFeed({
      isLoadMore: false,
      loading,
      setLoading,
      refreshing,
      setRefreshing,
      hasMore,
      setHasMore,
      cursor,
      setCursor,
      setPosts,
    });
  };

  return (
    <ScreenWrapper bg={colors.background}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Awaza</Text>
        <View style={styles.headerIcons}>
          <Pressable onPress={() => router.push("/(app)/account-setting")}>
            <Avatar uri={user?.avatar} size={hp(4.2)} rounded={radius.full} />
          </Pressable>
          <Pressable
            style={styles.iconButton}
            onPress={() => router.push("/(app)/inbox")}
          >
            <Icon name="send" size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      {/* Feed */}
      <View style={{ flex: 1 }}>
        <Feed
          data={posts}
          loading={loading}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={refreshing}
          router={router}
          user={user}
        />
      </View>

      {/* Floating Action Button */}
      <Pressable
        style={styles.fab}
        onPress={() => router.push("/(app)/compose-post")}
      >
        <Icon name="edit" size={28} color="#fff" strokeWidth={2} />
      </Pressable>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.separator,
  },
  logo: {
    fontSize: hp(3.2),
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconButton: {
    padding: 5,
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
  },
  fab: {
    position: "absolute",
    bottom: hp(4),
    right: wp(5),
    backgroundColor: colors.primary,
    width: hp(7),
    height: hp(7),
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
    ...commonStyles.shadowMedium,
  },
});

// Import wp from existing styles or common if needed for FAB right positioning
import { wp } from "@/constants/Styles";

