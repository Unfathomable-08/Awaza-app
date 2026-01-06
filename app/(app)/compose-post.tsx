import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/Colors";
import { commonStyles, hp, radius, spacing } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";
import { createPost } from "@/utils/post";

const MAX_CHARS = 380;
const IMGBB_API_KEY = "1a385d5be9971dda6af6d90952c6e372"; // Kept as requested

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isOverLimit = text.length > MAX_CHARS;
  const isEmpty = text.trim().length === 0;
  // Previously disabled if empty, but images can be posted without text? 
  // Code said `isEmpty || isOverLimit || loading`. 
  // Let's allow image only posts if we want, but old code enforced text? 
  // Actually, let's stick to old logic or allow image-only. 
  // If image is present and text is empty, should be allowed.
  const isDisabled = (isEmpty && !image) || isOverLimit || loading;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => setImage(null);

  const handlePost = async () => {
    if (isDisabled) return;
    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        // Upload to ImgBB
        const base64 = await FileSystem.readAsStringAsync(image, { encoding: "base64" });
        const formData = new FormData();
        formData.append("image", base64);

        const uploadUrl = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;
        const res = await axios.post(uploadUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = res.data.data.url;
      }

      await createPost({
        content: text.trim(),
        image: imageUrl,
        isPublic: true,
      });

      router.replace("/(app)/home");
    } catch (error: any) {
      console.error("Post Error:", error);
      Alert.alert("Error", error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg={colors.background}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>New Post</Text>
        <Button
          title="Post"
          onPress={handlePost}
          loading={loading}
          disabled={isDisabled}
          buttonStyle={{ height: hp(4.5), paddingHorizontal: 20, borderRadius: radius.full }}
          textStyle={{ fontSize: hp(1.8) }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={commonStyles.row}>
          <Avatar uri={user?.avatar} size={hp(5.5)} rounded={radius.m} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.username}>{user?.name}</Text>
            <Text style={styles.placeholderText}>Public</Text>
          </View>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          placeholderTextColor={colors.textLight}
          multiline
          value={text}
          onChangeText={setText}
          autoFocus
        />

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.previewImage} resizeMode="cover" />
            <Pressable style={styles.removeBtn} onPress={removeImage}>
              <Ionicons name="close" size={16} color="white" />
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* Toolbar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <View style={styles.toolbar}>
          <View style={commonStyles.row}>
            <Pressable onPress={pickImage} style={styles.mediaBtn}>
              <Ionicons name="image-outline" size={26} color={colors.primary} />
            </Pressable>
          </View>
          <View style={commonStyles.row}>
            <Text style={{ color: text.length > MAX_CHARS ? colors.error : colors.textLight }}>
              {text.length}
            </Text>
            <Text style={{ color: colors.textLight }}>/{MAX_CHARS}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.separator,
  },
  cancelText: {
    color: colors.text,
    fontSize: hp(2),
  },
  title: {
    fontSize: hp(2.2),
    fontWeight: "700",
    color: colors.text,
  },
  content: {
    paddingHorizontal: spacing.m,
    paddingBottom: hp(10),
  },
  username: {
    fontSize: hp(2),
    fontWeight: "600",
    color: colors.text,
  },
  placeholderText: {
    fontSize: hp(1.6),
    color: colors.textLight,
  },
  textInput: {
    fontSize: hp(2.2),
    color: colors.text,
    marginVertical: spacing.l,
    minHeight: hp(15),
    textAlignVertical: 'top',
  },
  imageContainer: {
    borderRadius: radius.l,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: hp(35),
    borderRadius: radius.l,
  },
  removeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    borderRadius: radius.full,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderTopWidth: 0.5,
    borderTopColor: colors.separator,
    backgroundColor: colors.background,
  },
  mediaBtn: {
    padding: 8,
    borderRadius: radius.m,
    backgroundColor: colors.inputBg,
  },
});

