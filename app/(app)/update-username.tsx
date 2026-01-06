import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";
import { updateUsername } from "@/utils/accountSetting";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";

export default function UpdateUsername() {
  const router = useRouter();
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  const isValidUsername = (str: string) => {
    return /^[a-z0-9_]{3,20}$/.test(str);
  };

  const handleSave = async () => {
    const trimmed = username.trim().toLowerCase();

    if (!trimmed) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }

    if (trimmed === user?.username) {
      router.back();
      return;
    }

    if (!isValidUsername(trimmed)) {
      Alert.alert(
        "Invalid Username",
        "Username must be 3-20 characters and can only contain lowercase letters, numbers, and underscores."
      );
      return;
    }

    setLoading(true);
    try {
      await updateUsername(trimmed);

      Alert.alert("Success", "Username updated successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      console.error(error);
      const message = error.message || "Failed to update username. It might already be taken.";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  const hasChanged = username.trim().toLowerCase() !== (user?.username || "");

  return (
    <ScreenWrapper bg={colors.background}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
        {/* Title? Maybe "Change Username" */}
        <Text style={styles.title}>Username</Text>
        <Pressable onPress={handleSave} disabled={loading || !hasChanged}>
          {loading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Text style={[styles.save, (!hasChanged || loading) && styles.saveDisabled]}>
              Save
            </Text>
          )}
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.atSymbol}>@</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="username"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            placeholderTextColor={colors.textLight}
          />
        </View>

        <Text style={styles.helperText}>
          Usernames can only contain lowercase letters, numbers, and underscores.
          3-20 characters.
        </Text>

        {hasChanged && username.trim() && !isValidUsername(username.trim().toLowerCase()) && (
          <Text style={styles.errorText}>
            Invalid format. Only lowercase a-z, 0-9, and _ allowed.
          </Text>
        )}
      </View>
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
  cancel: {
    fontSize: hp(2),
    color: colors.text
  },
  title: {
    fontSize: hp(2),
    fontWeight: '700',
    color: colors.text
  },
  save: {
    fontSize: hp(2),
    color: colors.primary,
    fontWeight: "700",
  },
  saveDisabled: {
    color: colors.textLight,
  },
  content: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.xl,
  },
  label: {
    fontSize: hp(1.8),
    color: colors.textLight,
    marginBottom: spacing.s,
    marginLeft: 4
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: radius.l,
    borderWidth: 1,
    borderColor: 'transparent', // or colors.border
    paddingHorizontal: spacing.m,
  },
  atSymbol: {
    fontSize: hp(2.2),
    color: colors.textLight,
    marginRight: 4,
    fontWeight: '600'
  },
  input: {
    flex: 1,
    fontSize: hp(2.2),
    paddingVertical: 14,
    color: colors.text,
    fontWeight: '600'
  },
  helperText: {
    fontSize: hp(1.6),
    color: colors.textLight,
    marginTop: spacing.m,
    lineHeight: hp(2.2),
    marginLeft: 4
  },
  errorText: {
    fontSize: hp(1.6),
    color: colors.error,
    marginTop: spacing.s,
    fontWeight: "500",
    marginLeft: 4
  },
});