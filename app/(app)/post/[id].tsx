import { NestedComment } from "@/components/home/NestedComment";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/authContext";
import { styles } from "@/styles/post";
import { getComments, likePost } from "@/utils/actions";
import { buildCommentTree } from "@/utils/buildCommentTree";
import { timeAgo } from "@/utils/common";
import { getPost } from "@/utils/post";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View
} from "react-native";

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentTree, setCommentTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle array param
  const postId = Array.isArray(id) ? id[0] : id;

  const fetchData = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const [postData, commentsData] = await Promise.all([
        getPost(postId),
        getComments(postId)
      ]);
      setPost(postData.post || postData);
      setComments(commentsData.comments || commentsData || []);
    } catch (error: any) {
      //   Alert.alert("Error", error.message);
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  useEffect(() => {
    if (comments.length > 0) {
      setCommentTree(buildCommentTree(comments));
    }
  }, [comments]);

  const likePostFn = async (id: any) => {
    try {
      setPost((p: any) => {
        const alreadyLiked = p.likes.includes(user?._id || user?.id);
        const userId = user?._id || user?.id;

        return {
          ...p,
          likes: alreadyLiked
            ? p.likes.filter((l: string) => l !== userId)
            : [...p.likes, userId],
          likesCount: alreadyLiked ? p.likesCount - 1 : p.likesCount + 1,
        };
      });

      await likePost(id);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
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
      <View style={styles.postHeader}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={comments} // FlashList/FlatList requires data, but we render Custom items in footer for tree
        keyExtractor={(item) => item._id}
        renderItem={() => (<View />)} // Rendering empty views as we use Footer for recursive tree
        ListHeaderComponent={
          <View style={{ paddingBottom: 16 }}>
            {/* Main Post */}
            <View>
              <View style={styles.postHeader}>
                <Pressable onPress={() => { }}>
                  <Image
                    source={
                      post.user?.avatar
                        ? { uri: post.user.avatar }
                        : require("@/assets/images/default_user.jpg")
                    }
                    style={styles.postAvatar}
                  />
                </Pressable>
                <View style={{ flex: 1 }}>
                  <Pressable onPress={() => { }}>
                    <Text style={styles.postName}>{post?.user?.name}</Text>
                  </Pressable>
                  <Text style={styles.postUsername}>
                    @{post.user?.username?.toLowerCase()}
                  </Text>
                </View>
                <Text style={styles.postTime}>{timeAgo(post.createdAt)}</Text>
              </View>

              <Text style={styles.postText}>{post?.content}</Text>

              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
              )}

              <View style={styles.postActions}>
                <Pressable
                  style={styles.actionButton}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={22}
                    color={colors.textLight}
                  />
                  <Text style={styles.actionCount}>
                    {post.commentsCount || 0}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => likePostFn(post._id || post.id)}
                >
                  {(post.likes?.includes(user?._id || user?.id)) ? (
                    <Ionicons
                      name="heart"
                      size={22}
                      color={colors.primary}
                    />
                  ) : (
                    <Ionicons
                      name="heart-outline"
                      size={22}
                      color={colors.text}
                    />
                  )}
                  <Text style={styles.actionCount}>{post.likesCount}</Text>
                </Pressable>
                <Pressable>
                  <Ionicons name="share-social-outline" size={22} color={colors.text} />
                </Pressable>
              </View>
            </View>

            {/* Replies Title */}
            {commentTree?.length > 0 && (
              <Text style={styles.repliesTitle}>Replies</Text>
            )}
          </View>
        }
        ListEmptyComponent={
          commentTree.length === 0 ? <Text style={styles.noComments}>No replies yet. Be the first!</Text> : null
        }
        ListFooterComponent={
          <View>
            {commentTree.map((rootComment) => (
              <NestedComment
                key={rootComment._id}
                comment={rootComment}
                postId={post._id || post.id}
                currentUserId={user?._id || user?.id}
                depth={0}
              />
            ))}
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Reply FAB */}
      <Pressable
        style={styles.replyFab}
        onPress={() =>
          router.push(`/(app)/comment/${postId}`)
        }
      >
        <Ionicons name="chatbubble" size={28} color="#fff" />
      </Pressable>
    </ScreenWrapper>
  );
}
