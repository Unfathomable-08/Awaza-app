import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";

import Avatar from "@/components/Avatar";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { commonStyles, hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";

export default function AccountSettings() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScreenWrapper bg={colors.background}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.title}>Account Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.container}>
        {/* Current Avatar & Name */}
        <View style={styles.profileSection}>
          <Avatar uri={user?.avatar} size={hp(12)} rounded={radius.xl} />
          <Text style={styles.displayName}>{user?.name || "Your Name"}</Text>
          <Text style={styles.username}>@{user?.username || "username"}</Text>
        </View>

        {/* Options */}
        <Pressable
          style={styles.optionButton}
          onPress={() => router.push("/(app)/update-profile")}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="person-outline" size={24} color={colors.text} />
            <Text style={styles.optionText}>Edit Name & Avatar</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
        </Pressable>

        <Pressable
          style={styles.optionButton}
          onPress={() => router.push("/(app)/update-username")}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="at-outline" size={24} color={colors.text} />
            <Text style={styles.optionText}>Change Username</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    marginTop: spacing.s
  },
  title: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color: colors.text
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.m,
    paddingTop: spacing.xl
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: spacing.xl * 1.5,
    gap: spacing.xs
  },
  displayName: {
    fontSize: hp(2.4),
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.s
  },
  username: {
    fontSize: hp(1.8),
    color: colors.textLight
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.m,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.separator
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m
  },
  optionText: {
    fontSize: hp(1.9),
    color: colors.text,
    fontWeight: '500'
  }
});