import { theme } from "@/constants/theme";
import { hp, wp } from "@/utils/common";
import { StyleSheet, TextStyle } from "react-native";

export const styles = StyleSheet.create({
  postContainer: {
    padding: wp(4),
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
    marginBottom: hp(2)
  },
  headerTitle: {
    fontSize: hp(2.6),
    fontWeight: "700",
    color: theme.colors.text,
  },
  backButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#e9e9e9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: wp(6),
  },
  errorText: {
    fontSize: hp(2),
    color: theme.colors.textLight,
    textAlign: "center",
    marginTop: hp(2),
  },
  noComments: {
    textAlign: "center",
    padding: hp(5),
    color: theme.colors.textLight,
    fontSize: hp(2),
  },
  postAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postName: {
    fontWeight: "700",
    fontSize: hp(2.1),
    color: theme.colors.text,
  },
  postUsername: {
    color: theme.colors.textLight,
    fontSize: hp(1.9),
  },
  postname: {
    color: theme.colors.dark,
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold
  } as TextStyle,
  postTime: {
    color: theme.colors.textLight,
    fontSize: hp(1.8),
  },
  postText: {
    fontSize: hp(2.1),
    marginTop: hp(2),
    lineHeight: hp(3),
    color: theme.colors.text,
  },
  postImage: {
    width: "100%",
    aspectRatio: "4/3",
    borderRadius: 16,
    marginTop: hp(2),
  },
  postActions: {
    flexDirection: "row",
    gap: wp(7),
    marginTop: hp(2.5),
    alignItems: "center",
  },
  repliesTitle: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    fontSize: hp(2.2),
    fontWeight: "600",
    color: theme.colors.text,
  },
  replyFab: {
    position: "absolute",
    bottom: hp(3),
    right: wp(5),
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionCount: {
    fontSize: hp(1.7),
    color: theme.colors.textLight,
    fontWeight: "600",
  },
});
