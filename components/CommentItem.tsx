import Avatar from '@/components/Avatar';
import { colors } from '@/constants/Colors';
import { hp, radius, spacing } from '@/constants/Styles';
import { timeAgo } from '@/utils/common';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface CommentProps {
    item: any;
    onReply?: (item: any) => void;
    canDelete?: boolean;
    onDelete?: (id: string) => void;
}

const CommentItem = ({ item, onReply, canDelete, onDelete }: CommentProps) => {
    const createdAt = timeAgo(item?.createdAt || new Date().toISOString());

    return (
        <View style={styles.container}>
            <Avatar uri={item?.user?.image} size={hp(4)} rounded={radius.full} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.username}>{item?.user?.name}</Text>
                    <Text style={styles.time}>{createdAt}</Text>
                </View>
                <Text style={styles.text}>{item?.content}</Text>

                <View style={styles.actions}>
                    {onReply && (
                        <Pressable onPress={() => onReply(item)}>
                            <Text style={styles.actionText}>Reply</Text>
                        </Pressable>
                    )}
                    {canDelete && (
                        <Pressable onPress={() => onDelete && onDelete(item?._id)}>
                            <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        gap: spacing.s,
    },
    content: {
        flex: 1,
        gap: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    username: {
        fontWeight: '600',
        color: colors.text,
        fontSize: hp(1.7),
    },
    time: {
        color: colors.textMuted,
        fontSize: hp(1.5),
    },
    text: {
        color: colors.text,
        fontSize: hp(1.7),
        lineHeight: hp(2.4),
    },
    actions: { // Added actions style definition
        flexDirection: 'row',
        gap: 16,
        marginTop: 4,
    },
    actionText: {
        fontSize: hp(1.5),
        color: colors.textLight,
        fontWeight: '600',
    },
});

export default CommentItem;
