import { StyleSheet, TextStyle } from "react-native";
import { wp, hp } from "@/utils/common";
import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(4)
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center',
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(5),
        textAlign: 'center',
        paddingTop: 20,
        fontWeight: theme.fonts.extraBold
    } as TextStyle,
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        color: theme.colors.text
    },
    footer: {
        height: hp(20),
        width: '100%',
    },
    already: {
        fontSize: hp(1.6),
        fontWeight: theme.fonts.semibold, 
        color: theme.colors.text
    } as TextStyle,
    loginLink: {
        fontSize: hp(1.6), 
        fontWeight: theme.fonts.bold, 
        color: theme.colors.primary
    } as TextStyle
})