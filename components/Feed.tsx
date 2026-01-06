import { colors } from '@/constants/Colors';
import { hp } from '@/constants/Styles';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PostItem from './PostItem';

interface FeedProps {
    data: any[];
    loading: boolean;
    onEndReached?: () => void;
    onRefresh?: () => void;
    refreshing?: boolean;
    router: any;
    user: any;
}

const Feed = ({ data, loading, onEndReached, onRefresh, refreshing, router, user }: FeedProps) => {

    if (loading && data.length === 0) {
        // Skeleton loader could go here
        return (
            <View style={styles.center}>
                <Text style={{ color: colors.textMuted }}>Loading feed...</Text>
            </View>
        )
    }

    console.log("Feed rendering with data length:", data.length);
    return (
        <FlatList
            style={{ flex: 1 }}
            data={data}
            renderItem={({ item }) => (
                <PostItem item={item} currentUser={user} router={router} />
            )}
            keyExtractor={(item: any) => item.id?.toString() || Math.random().toString()}
            contentContainerStyle={{ paddingBottom: hp(10), paddingTop: 10 }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onRefresh={onRefresh}
            refreshing={refreshing}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <View style={styles.center}>
                    <Text style={styles.emptyText}>No posts yet. Be the first to post!</Text>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    center: {
        marginTop: hp(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: hp(2),
        color: colors.textMuted,
        fontWeight: '500'
    }
});

export default Feed;
