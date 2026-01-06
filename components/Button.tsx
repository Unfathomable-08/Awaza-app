import { colors } from '@/constants/Colors';
import { commonStyles, hp, radius } from '@/constants/Styles';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

interface ButtonProps {
    buttonStyle?: any;
    textStyle?: any;
    title?: string;
    onPress?: () => void;
    loading?: boolean;
    hasShadow?: boolean;
    disabled?: boolean; // Added disabled prop
}

const Button = ({
    buttonStyle,
    textStyle,
    title = '',
    onPress = () => { },
    loading = false,
    hasShadow = true,
    disabled = false, // Default to false
}: ButtonProps) => {
    const shadowStyle = hasShadow ? commonStyles.shadowMedium : {};

    // If loading or disabled, we might want to reduce opacity or change color
    const opacity = disabled || loading ? 0.6 : 1;

    if (loading) {
        return (
            <View style={[styles.button, buttonStyle, { backgroundColor: 'white', opacity }]}>
                <ActivityIndicator size="small" color={colors.primary} />
            </View>
        );
    }

    return (
        <Pressable
            onPress={onPress}
            style={[styles.button, shadowStyle, buttonStyle, { opacity }]}
            disabled={disabled} // Disable interaction
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.xl,
    },
    text: {
        fontSize: hp(2.5),
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Button;
