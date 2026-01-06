import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import Avatar from "@/components/Avatar";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";
import { createComment } from "@/utils/actions";

const MAX_CHARS = 380;

export default function WriteComment() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Parse ID: Format "postId_parentCommentId"
    const idString = Array.isArray(id) ? id[0] : id;
    const [postId, parentCommentId] = (idString || "").split("_");

    const isOverLimit = text.length > MAX_CHARS;
    const isEmpty = text.trim().length === 0;
    const isDisabled = isEmpty || isOverLimit || loading;

    const handlePost = async () => {
        if (isDisabled) return;
        if (!postId) {
            Alert.alert("Error", "Invalid post ID");
            return;
        }

        setLoading(true);

        try {
            await createComment(postId, text.trim(), parentCommentId);

            Alert.alert("Success", "Your reply has been posted!", [
                { text: "Done", onPress: () => router.back() },
            ]);
        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.message || "Failed to post. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper bg={colors.background}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} hitSlop={10}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </Pressable>

                    <Text style={styles.title}>Reply</Text>

                    <Pressable
                        style={[styles.postButton, isDisabled && styles.postButtonDisabled]}
                        onPress={handlePost}
                        disabled={isDisabled}
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.primary} />
                        ) : (
                            <Text style={[styles.postButtonText, isDisabled && styles.postButtonTextDisabled]}>
                                Post
                            </Text>
                        )}
                    </Pressable>
                </View>

                {/* Main content */}
                <View style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: spacing.m,
                            paddingTop: spacing.l,
                            paddingBottom: spacing.l,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* User Row */}
                        <View style={styles.userRow}>
                            <Avatar uri={user?.avatar} size={hp(5)} rounded={radius.full} />
                            <Text style={styles.username}>{user?.username || "You"}</Text>
                        </View>

                        {/* Text Input */}
                        <TextInput
                            style={[styles.textInput, isOverLimit && styles.textInputError]}
                            placeholder="Type your reply..."
                            placeholderTextColor={colors.textLight}
                            multiline
                            value={text}
                            onChangeText={setText}
                            textAlignVertical="top"
                            autoFocus
                        />
                    </ScrollView>

                    {/* Bottom Toolbar pinned */}
                    <View style={styles.toolbar}>
                        <View style={styles.charCounter}>
                            <Text
                                style={[
                                    styles.count,
                                    {
                                        color: text.length > 300
                                            ? colors.error
                                            : text.length > 200
                                                ? "#ffad1f"
                                                : colors.textLight,
                                    },
                                ]}
                            >
                                {text.length}
                            </Text>
                            <Text style={styles.slash}>/</Text>
                            <Text style={styles.max}>{MAX_CHARS}</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
    cancelText: {
        fontSize: hp(2),
        color: colors.text
    },
    title: {
        fontSize: hp(2),
        fontWeight: '700',
        color: colors.text
    },
    postButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: radius.full,
    },
    postButtonDisabled: {
        backgroundColor: colors.inputBg, // Light gray for disabled
    },
    postButtonText: {
        fontSize: hp(1.8),
        color: "white",
        fontWeight: "bold",
    },
    postButtonTextDisabled: {
        color: colors.textLight,
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.l,
        gap: spacing.s
    },
    username: {
        fontSize: hp(2),
        fontWeight: "600",
        color: colors.text,
    },
    textInput: {
        fontSize: hp(2.2),
        color: colors.text,
        minHeight: hp(20),
    },
    textInputError: {
        color: colors.error,
    },
    toolbar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: spacing.m,
        borderTopWidth: 0.5,
        borderTopColor: colors.separator,
        backgroundColor: colors.background
    },
    charCounter: {
        flexDirection: "row",
        alignItems: "center",
    },
    count: {
        fontSize: hp(1.6),
    },
    slash: {
        fontSize: hp(1.6),
        color: colors.textLight,
        marginHorizontal: 2,
    },
    max: {
        fontSize: hp(1.6),
        color: colors.textLight,
    },
});