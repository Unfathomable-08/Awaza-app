import { StyleSheet, TextStyle } from "react-native";
import { wp, hp } from "@/utils/common";
import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: hp(3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  } as TextStyle,
  container: {
    flex: 1,
    paddingTop: hp(4),
  },
  profileSection: {
    alignItems: "center",
    marginBottom: hp(5),
  },
  avatarContainer: {
    position: "relative",
    marginBottom: hp(2),
  },
  avatar: {
    width: hp(12),
    height: hp(12),
    borderRadius: hp(6),
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  displayName: {
    fontSize: hp(2.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: hp(0.5),
  } as TextStyle,
  username: {
    fontSize: hp(2),
    color: theme.colors.textLight || "#666",
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(5),
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
  },
  optionText: {
    fontSize: hp(2.1),
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
  },
});

export const profileStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  cancel: {
    fontSize: hp(2.1),
    color: theme.colors.textLight,
  },
  save: {
    fontSize: hp(2.1),
    color: theme.colors.primary,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(4),
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: hp(4),
  },
  avatar: {
    width: hp(15),
    height: hp(15),
    borderRadius: hp(7.5),
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: hp(2),
    color: theme.colors.textLight,
    marginBottom: hp(1),
  },
  input: {
    width: "100%",
    fontSize: hp(2.4),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});