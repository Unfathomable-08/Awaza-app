import { colors } from '@/constants/Colors';
import { hp, radius } from '@/constants/Styles';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    icon?: React.ReactNode;
    containerStyle?: any;
    inputRef?: React.RefObject<TextInput>;
}

const Input = (props: InputProps) => {
    return (
        <View style={[styles.container, props.containerStyle]}>
            {props.icon && <View style={styles.iconContainer}>{props.icon}</View>}
            <TextInput
                style={styles.input}
                placeholderTextColor={colors.textLight}
                ref={props.inputRef}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp(7.2),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: colors.border,
        borderRadius: radius.xl,
        borderCurve: 'continuous',
        paddingHorizontal: 18,
        gap: 12,
        backgroundColor: colors.inputBg,
    },
    iconContainer: {
        height: hp(7.2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: '100%',
        color: colors.text,
        fontSize: hp(1.8),
    },
});

export default Input;
