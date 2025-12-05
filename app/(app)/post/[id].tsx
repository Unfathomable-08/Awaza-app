import Icon from "@/assets/icons";
import ScreenWrapper from "@/components/ui/ScreenWrapper";
import { RenderComment } from "@/components/home/renderComment";
import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { getPost } from "@/utils/post";
import { hp, wp } from "@/utils/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  Alert,
} from "react-native";
import { styles } from "@/styles/post";

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const postData = await getPost(id);
      setPost(postData.post);
      setComments(postData.comments);
    } catch (error: any) {
      Alert.alert("Error", error.message);
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper bg="#fff">
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrowLeft" size={24} color={theme.colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RenderComment item={item} currentUserId={user?._id} />}
        ListHeaderComponent={
          <View style={{ paddingBottom: hp(2) }}>
            {/* Main Post */}
            <View style={styles.postContainer}>
              <View style={styles.postHeader}>
                <Pressable onPress={() => router.push(`/profile/${post.user._id}`)}>
                  <Image
                    source={
                      post.user.image
                        ? { uri: post.user.image }
                        : require("@/assets/images/defaultUser.png")
                    }
                    style={styles.postAvatar}
                  />
                </Pressable>
                <View style={{ flex: 1 }}>
                  <Pressable onPress={() => router.push(`/profile/${post.user._id}`)}>
                    <Text style={styles.postName}>{post.user.name}</Text>
                  </Pressable>
                  <Text style={styles.postUsername}>@{post.user.name.toLowerCase()}</Text>
                </View>
                <Text style={styles.postTime}>{timeAgo(post.createdAt)}</Text>
              </View>

              <Text style={styles.postText}>{post.content}</Text>

              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
              )}

              <View style={styles.postActions}>
                <Pressable style={styles.actionButton}>
                  <Icon name="messageCircle" size={22} color={theme.colors.textLight} />
                  <Text style={styles.actionCount}>{post.commentsCount || 0}</Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                  <Icon
                    name="heart"
                    size={22}
                    color={post.likes.includes(user?._id) ? "red" : theme.colors.textLight}
                  />
                  <Text style={styles.actionCount}>{post.likes.length}</Text>
                </Pressable>
                <Pressable>
                  <Icon name="share" size={22} color={theme.colors.textLight} />
                </Pressable>
              </View>
            </View>

            {/* Replies Title */}
            {comments.length > 0 && (
              <Text style={styles.repliesTitle}>Replies</Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.noComments}>No replies yet. Be the first!</Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(12) }}
      />

      {/* Reply FAB */}
      <Pressable
        style={styles.replyFab}
        onPress={() =>
          router.push({
            pathname: "/(app)/compose-post",
            params: { replyTo: id, replyToUser: post.user.name },
          })
        }
      >
        <Icon name="edit" size={28} color="#fff" />
      </Pressable>
    </ScreenWrapper>
  );
}