import { theme } from "@/constants/theme";
import { hp, wp } from "@/utils/common";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: hp(2.6),
    fontWeight: "700",
    color: theme.colors.text,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.lightGray,
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
  commentContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    gap: wp(3),
  },
  commentAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  commentContent: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: "#f2f2f2",
    padding: wp(3.5),
    borderRadius: 18,
    borderTopLeftRadius: 4,
  },
  commentName: {
    fontWeight: "600",
    color: theme.colors.text,
    fontSize: hp(1.9),
  },
  commentText: {
    color: theme.colors.text,
    fontSize: hp(1.95),
    marginTop: hp(0.5),
    lineHeight: hp(2.6),
  },
  commentImage: {
    width: "100%",
    height: wp(60),
    borderRadius: 12,
    marginTop: hp(1.5),
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(5),
    marginTop: hp(1),
    paddingLeft: wp(3.5),
  },
  commentTime: {
    fontSize: hp(1.7),
    color: theme.colors.textLight,
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
