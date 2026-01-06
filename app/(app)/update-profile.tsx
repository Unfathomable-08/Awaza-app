import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";
import { updateProfile } from "@/utils/accountSetting";

export default function UpdateProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState<string | null>(user?.avatar || null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const IMGBB_API_KEY = "1a385d5be9971dda6af6d90952c6e372";

    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = user?.avatar || "";

      if (image && image !== user?.avatar) {
        const base64 = await FileSystem.readAsStringAsync(image, { encoding: "base64" });
        const formData = new FormData();
        formData.append("image", base64);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = res.data.data.url;
      }

      await updateProfile(name.trim(), imageUrl);

      Alert.alert("Success", "Profile updated!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg={colors.background}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
        <Pressable onPress={() => router.back()} style={styles.cancelBtn}>
          <Ionicons name="close" size={24} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Pressable onPress={pickImage} style={styles.avatarWrapper}>
            <Image
              source={image ? { uri: image } : require("@/assets/images/default_user.jpg")}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </Pressable>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <Button
            title="Update Profile"
            onPress={handleSave}
            loading={loading}
            buttonStyle={{ marginTop: spacing.xl }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.m,
    position: 'relative',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.separator
  },
  title: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color: colors.text
  },
  cancelBtn: {
    position: 'absolute',
    left: spacing.m
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.m,
    paddingTop: spacing.xl
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  avatarWrapper: {
    position: 'relative'
  },
  avatar: {
    width: hp(14),
    height: hp(14),
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: 'white'
  },
  form: {
    gap: spacing.s
  },
  label: {
    fontSize: hp(1.8),
    color: colors.textLight,
    marginLeft: 4
  }
});