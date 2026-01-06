import { colors } from '@/constants/Colors';
import { hp } from '@/constants/Styles';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface AvatarProps {
    uri?: string;
    size?: number;
    rounded?: number;
    style?: any;
    onPress?: () => void; // Optional onPress for interactivity
}

const Avatar = ({
    uri,
    size = hp(4.5),
    rounded = hp(2.25),
    style,
    onPress
}: AvatarProps) => {
    const source = uri ? { uri } : require('@/assets/images/default_user.jpg');

    // If onPress is provided, wrap in Pressable
    if (onPress) {
        return (
            <Pressable onPress={onPress}>
                <Image
                    source={source}
                    transition={100}
                    style={[
                        styles.avatar,
                        { height: size, width: size, borderRadius: rounded },
                        style,
                    ]}
                />
            </Pressable>
        )
    }

    return (
        <Image
            source={source}
            transition={100}
            style={[
                styles.avatar,
                { height: size, width: size, borderRadius: rounded },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    avatar: {
        borderColor: colors.border,
        borderWidth: 1,
        backgroundColor: '#eee',
    },
});

export default Avatar;
