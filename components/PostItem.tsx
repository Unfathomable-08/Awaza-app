import Avatar from '@/components/Avatar';
import { colors } from '@/constants/Colors';
import { commonStyles, hp, radius, spacing } from '@/constants/Styles';
import { likePost } from '@/utils/actions';
import { timeAgo } from '@/utils/common';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { memo, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PostItemProps {
    item: any;
    currentUser?: any;
    router?: any;
    hasShadow?: boolean;
}

const PostItem = ({ item, currentUser, router, hasShadow = true }: PostItemProps) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        if (!item) return;
        setLikesCount(item?.likesCount || item?.likes?.length || 0);

        // Check if current user liked the post
        const userId = currentUser?._id || currentUser?.id;
        if (userId && item?.likes) {
            const isLiked = item.likes.some((id: any) =>
                (typeof id === 'string' ? id : id._id) === userId
            );
            setLiked(isLiked);
        }
    }, [item, currentUser]);

    const openPostDetails = () => {
        router.push({ pathname: '/(app)/post/[id]', params: { id: item?._id || item?.id } });
    };

    const openProfile = () => {
        // Navigate to profile
    };

    const handleLike = async () => {
        // Optimistic update
        const newLiked = !liked;
        setLiked(newLiked);
        setLikesCount(prev => newLiked ? prev + 1 : prev - 1);

        try {
            await likePost(item?._id || item?.id);
        } catch (error) {
            // Revert on error
            setLiked(!newLiked);
            setLikesCount(prev => !newLiked ? prev + 1 : prev - 1);
            console.error("Failed to like post", error);
        }
    };

    const createdAt = timeAgo(item?.createdAt || new Date().toISOString());

    return (
        <View style={[styles.container, hasShadow && commonStyles.shadowSmall]}>
            <Pressable onPress={openPostDetails}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={commonStyles.row}>
                        <Avatar
                            size={hp(4.5)}
                            uri={item?.user?.avatar}
                            onPress={openProfile}
                            rounded={radius.m}
                        />
                        <View style={{ marginLeft: spacing.s }}>
                            <Text style={styles.username}>{item?.user?.name}</Text>
                            <Text style={styles.timestamp}>{createdAt}</Text>
                        </View>
                    </View>

                    <Pressable hitSlop={10}>
                        <Ionicons name="ellipsis-horizontal" size={20} color={colors.textLight} />
                    </Pressable>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.textBody}>{item?.content}</Text>
                    {item?.image && (
                        <View style={styles.imageWrapper}>
                            <Image
                                source={item?.image}
                                style={styles.postImage}
                                contentFit="cover"
                                transition={200}
                            />
                        </View>
                    )}
                </View>
            </Pressable>

            {/* Footer Actions */}
            <View style={styles.footer}>
                <Pressable style={styles.footerButton} onPress={handleLike}>
                    <Ionicons
                        name={liked ? "heart" : "heart-outline"}
                        size={24}
                        color={liked ? colors.primary : colors.textLight}
                    />
                    <Text style={[styles.footerCount, liked && { color: colors.primary }]}>
                        {likesCount}
                    </Text>
                </Pressable>
                <Pressable style={styles.footerButton} onPress={openPostDetails}>
                    <Ionicons name="chatbubble-outline" size={24} color={colors.textLight} />
                    <Text style={styles.footerCount}>{item?.commentsCount || 0}</Text>
                </Pressable>
                <View style={styles.footerButton}>
                    <Ionicons name="share-social-outline" size={24} color={colors.textLight} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderWidth: 0.5,
        borderColor: colors.cardBorder,
        borderRadius: radius.l,
        padding: spacing.m,
        marginVertical: spacing.s,
        marginHorizontal: spacing.m,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    username: {
        fontSize: hp(1.9),
        fontWeight: '600',
        color: colors.text,
    },
    timestamp: {
        fontSize: hp(1.4),
        color: colors.textMuted,
    },
    content: {
        marginVertical: spacing.xs,
        gap: spacing.s,
    },
    textBody: {
        fontSize: hp(1.8), // Previously likely too small
        color: colors.text,
        lineHeight: hp(2.6),
    },
    imageWrapper: {
        height: hp(35),
        width: '100%',
        borderRadius: radius.l,
        overflow: 'hidden',
        marginTop: spacing.s,
    },
    postImage: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: spacing.xl,
        marginTop: spacing.m,
        paddingTop: spacing.s,
        borderTopWidth: 0.5,
        borderTopColor: colors.separator,
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerCount: {
        color: colors.textLight,
        fontSize: hp(1.6),
    },
});

export default memo(PostItem);
