import { theme } from "@/constants/theme";
import { timeAgo } from "@/utils/common";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NestedCommentProps {
    comment: any;
    postId: string;
    currentUserId?: string;
    depth: number;
    isLastInThread?: boolean; // We'll calculate this in parent
}

export const NestedComment = ({
    comment,
    postId,
    currentUserId,
    depth = 0,
    isLastInThread = false,
}: NestedCommentProps) => {
    const router = useRouter();
    const [liked, setLiked] = useState(comment.likes?.includes(currentUserId));
    const [likesCount, setLikesCount] = useState(comment.likesCount || 0);

    const handleLike = async () => {
        const newLiked = !liked;
        setLiked(newLiked);
        setLikesCount(prev => newLiked ? prev + 1 : prev - 1);
    };

    const hasReplies = comment.replies && comment.replies.length > 0;
    const showThreadLine = depth > 0;

    // Only increase indent up to depth 4, then stop
    const indent = Math.min(depth, 4) * 52; // 32 (avatar) + 20 gap

    return (
        <View style={{ position: "relative" }}>
            {/* Vertical thread line - Twitter style */}
            {showThreadLine && (
                <View
                    style={[
                        styles.threadLine,
                        {
                            left: 16, // Always aligned to first avatar center (16 = half of 32)
                            height: hasReplies || !isLastInThread ? "100%" : 40,
                            top: hasReplies ? 0 : 40,
                            opacity: depth >= 5 ? 0.4 : 1,
                        },
                    ]}
                />
            )}

            {/* Horizontal connector line (only for replies) */}
            {depth > 0 && (
                <View style={[styles.connectorLine, { left: 16, bottom: isLastInThread ? undefined : "50%" }]} />
            )}

            <View style={[styles.commentContainer, { paddingLeft: depth === 0 ? 0 : 52 }]}>
                <View style={styles.avatarWrapper}>
                    <Pressable onPress={() => { }}>
                        <Image
                            source={
                                comment.user?.avatar
                                    ? { uri: comment.user.avatar }
                                    : require("@/assets/images/default_user.jpg")
                            }
                            style={styles.avatar}
                        />
                    </Pressable>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{comment.user?.name}</Text>
                        <Text style={styles.username}>@{comment.user?.username || 'user'}</Text>
                        <Text style={styles.dot}>·</Text>
                        <Text style={styles.time}>{timeAgo(comment.createdAt)}</Text>
                    </View>

                    <Text style={styles.text}>{comment.content}</Text>

                    <View style={styles.actions}>
                        <Pressable style={styles.actionBtn} onPress={handleLike}>
                            <Ionicons
                                name={liked ? "heart" : "heart-outline"}
                                size={18}
                                color={liked ? "#f91880" : theme.colors.textLight}
                            />
                            {likesCount > 0 && <Text style={styles.actionCount}>{likesCount}</Text>}
                        </Pressable>

                        <Pressable
                            style={styles.actionBtn}
                            onPress={() =>
                                router.push(`/(app)/comment/${postId}_${comment._id}`)
                            }
                        >
                            <Ionicons name="chatbubble-outline" size={18} color={theme.colors.textLight} />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Render replies */}
            {
                hasReplies &&
                comment.replies.map((reply: any, index: number) => (
                    <NestedComment
                        key={reply._id}
                        comment={reply}
                        postId={postId}
                        currentUserId={currentUserId}
                        depth={depth + 1}
                        isLastInThread={index === comment.replies.length - 1}
                    />
                ))
            }
        </View >
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        flexDirection: "row",
        marginTop: 12,
        minHeight: 60,
    },
    avatarWrapper: {
        width: 52,
        alignItems: "center",
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
    },
    content: {
        flex: 1,
        paddingRight: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 4,
    },
    name: {
        fontWeight: "700",
        fontSize: 15,
        color: theme.colors.text,
    },
    username: {
        fontSize: 14,
        color: theme.colors.textLight,
    },
    dot: {
        color: theme.colors.textLight,
        fontSize: 14,
    },
    time: {
        fontSize: 14,
        color: theme.colors.textLight,
    },
    text: {
        fontSize: 15,
        color: theme.colors.text,
        lineHeight: 22,
        marginTop: 4,
    },
    actions: {
        flexDirection: "row",
        gap: 32,
        marginTop: 10,
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    actionCount: {
        fontSize: 14,
        color: theme.colors.textLight,
    },
    // Twitter-style thin gray vertical line
    threadLine: {
        position: "absolute",
        width: 2,
        backgroundColor: "#cfd9de",
        left: 16,
        borderRadius: 1,
    },
    // Small horizontal curve connector
    connectorLine: {
        position: "absolute",
        width: 20,
        height: 2,
        backgroundColor: "#cfd9de",
        borderRadius: 1,
        top: 17, // half avatar height
    },
});