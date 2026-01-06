import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import Avatar from "@/components/Avatar";
import PostItem from "@/components/PostItem";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { commonStyles, hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";

export default function UserProfile() {
    const { userId } = useLocalSearchParams();
    const router = useRouter();
    const { user } = useAuth(); // Current user
    const [profile, setProfile] = useState<any>(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock fetching profile
    useEffect(() => {
        if (userId) fetchProfile();
    }, [userId]);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            // const data = await getUserProfile(userId);
            // setProfile(data);
            // Mock data
            setProfile({
                id: userId,
                name: "User Name",
                username: "username",
                avatar: null,
                bio: "This is a bio."
            });
            // const userPosts = await getUserPosts(userId);
            // setPosts(userPosts);
            setPosts([]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleMessage = () => {
        // Logic to start chat or go to existing chat
        if (!user || !profile) return;
        const sorted = [user.id, profile.id].sort();
        const chatSlug = sorted.join("_");
        router.push(`/(app)/inbox/${chatSlug}`);
    };

    if (loading) {
        return (
            <View style={commonStyles.center}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <ScreenWrapper bg={colors.background}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color={colors.text} />
                </Pressable>
                <Text style={styles.title}>Profile</Text>
                <View style={{ width: 26 }} />
            </View>

            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => (
                    <PostItem item={item} router={router} currentUser={user} />
                )}
                ListHeaderComponent={
                    <View style={styles.profileInfo}>
                        <Avatar uri={profile?.avatar} size={hp(10)} rounded={radius.xl} />
                        <Text style={styles.name}>{profile?.name}</Text>
                        <Text style={styles.username}>@{profile?.username}</Text>
                        <Text style={styles.bio}>{profile?.bio}</Text>

                        <View style={styles.statsRow}>
                            <View style={styles.stat}>
                                <Text style={styles.statNum}>0</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statNum}>0</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                        </View>

                        {userId !== user?.id && (
                            <View style={styles.actions}>
                                <Pressable style={[styles.btn, styles.primaryBtn]}>
                                    <Text style={styles.primaryBtnText}>Follow</Text>
                                </Pressable>
                                <Pressable style={[styles.btn, styles.secondaryBtn]} onPress={handleMessage}>
                                    <Text style={styles.secondaryBtnText}>Message</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: colors.textMuted }}>No posts yet.</Text>
                    </View>
                }
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s
    },
    title: {
        fontSize: hp(2.2),
        fontWeight: '700',
        color: colors.text
    },
    profileInfo: {
        alignItems: 'center',
        paddingVertical: spacing.l,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.separator
    },
    name: {
        fontSize: hp(2.4),
        fontWeight: '700',
        color: colors.text,
        marginTop: spacing.s
    },
    username: {
        fontSize: hp(1.8),
        color: colors.textLight
    },
    bio: {
        fontSize: hp(1.8),
        color: colors.text,
        textAlign: 'center',
        marginHorizontal: spacing.xl,
        marginTop: spacing.s
    },
    statsRow: {
        flexDirection: 'row',
        gap: spacing.xl,
        marginTop: spacing.m
    },
    stat: {
        alignItems: 'center'
    },
    statNum: {
        fontSize: hp(2.2),
        fontWeight: '700',
        color: colors.text
    },
    statLabel: {
        fontSize: hp(1.6),
        color: colors.textLight
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.m,
        marginTop: spacing.l
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: radius.full,
        minWidth: 100,
        alignItems: 'center'
    },
    primaryBtn: {
        backgroundColor: colors.primary
    },
    primaryBtnText: {
        color: 'white',
        fontWeight: '600'
    },
    secondaryBtn: {
        backgroundColor: colors.inputBg,
        borderWidth: 1,
        borderColor: colors.border
    },
    secondaryBtnText: {
        color: colors.text,
        fontWeight: '600'
    }
});
