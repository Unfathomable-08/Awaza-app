import { theme } from "@/constants/theme"; // We might need to map this to colors if theme doesn't exist, but let's check.
import { hp, wp } from "@/utils/common";
import { StyleSheet } from "react-native";

// Mock theme if it doesn't exist or map to our colors
const colors = {
    text: '#111',
    textLight: '#666',
    border: '#eee',
    primary: '#E60023',
    ...((theme as any)?.colors || {})
};
const radius = {
    full: 9999,
    ...((theme as any)?.radius || {})
};

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    errorText: {
        color: colors.text,
        fontSize: hp(2),
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        flex: 1,
        fontSize: hp(2.2),
        fontWeight: "700",
        color: colors.text,
        textAlign: "center",
    },
    postAvatar: {
        height: hp(5.5),
        width: hp(5.5),
        borderRadius: radius.full,
        marginRight: 12,
    },
    postName: {
        fontSize: hp(2),
        fontWeight: "600",
        color: colors.text,
    },
    postUsername: {
        fontSize: hp(1.6),
        color: colors.textLight,
    },
    postTime: {
        fontSize: hp(1.6),
        color: colors.textLight,
    },
    postText: {
        fontSize: hp(2),
        color: colors.text,
        lineHeight: hp(3),
        paddingHorizontal: wp(4),
        marginVertical: hp(1),
    },
    postImage: {
        width: "100%",
        height: hp(35),
        marginVertical: hp(1.5),
    },
    postActions: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        borderTopWidth: 1,
        borderTopColor: colors.border,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        gap: 24,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    actionCount: {
        fontSize: hp(1.8),
        color: colors.textLight,
    },
    repliesTitle: {
        fontSize: hp(2),
        fontWeight: "600",
        color: colors.text,
        paddingHorizontal: wp(4),
        paddingTop: hp(2),
        paddingBottom: hp(1),
    },
    noComments: {
        fontSize: hp(1.8),
        color: colors.textLight,
        textAlign: "center",
        marginTop: hp(4),
    },
    replyFab: {
        position: "absolute",
        bottom: hp(3),
        right: wp(5),
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: radius.full,
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    }
});
