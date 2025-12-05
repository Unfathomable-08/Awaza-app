import Icon from "@/assets/icons";
import { theme } from "@/constants/theme";
import { wp } from "@/utils/common";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "@/styles/post";

interface CommentProps {
  item: {
    _id: string;
    content: string;
    image?: string;
    user: {
      _id: string;
      name: string;
      image?: string;
    };
    createdAt: string;
    likes: string[];
  };
  currentUserId?: string;
}

export const RenderComment = ({ item, currentUserId }: CommentProps) => {
  const router = useRouter();
  const timeAgo = (date: string) => {
    const now = Date.now();
    const diff = now - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <View style={styles.commentContainer}>
      <Pressable onPress={() => router.push(`/profile/${item.user._id}`)}>
        <Image
          source={
            item.user.image
              ? { uri: item.user.image }
              : require("@/assets/images/defaultUser.png")
          }
          style={styles.commentAvatar}
        />
      </Pressable>

      <View style={styles.commentContent}>
        <View style={styles.commentBubble}>
          <Pressable onPress={() => router.push(`/profile/${item.user._id}`)}>
            <Text style={styles.commentName}>{item.user.name}</Text>
          </Pressable>
          <Text style={styles.commentText}>{item.content}</Text>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.commentImage} />
          )}
        </View>

        <View style={styles.commentActions}>
          <Text style={styles.commentTime}>{timeAgo(item.createdAt)}</Text>
          <Pressable style={styles.actionButton}>
            <Icon name="heart" size={18} color={theme.colors.textLight} />
            <Text style={styles.actionCount}>
              {item.likes?.length > 0 ? item.likes.length : ""}
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Icon name="messageCircle" size={18} color={theme.colors.textLight} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};