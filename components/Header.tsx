import { colors } from '@/constants/Colors';
import { hp } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
    title?: string;
    showBackButton?: boolean;
}

const Header = ({ title = '', showBackButton = true }: HeaderProps) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {showBackButton && (
                <View style={styles.backButtonWrapper}>
                    <Pressable onPress={() => router.back()} hitSlop={15} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={26} color={colors.text} />
                    </Pressable>
                </View>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        height: 44,
    },
    backButtonWrapper: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
    },
    backButton: {
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 12,
    },
    title: {
        fontSize: hp(2.7),
        fontWeight: '600',
        color: colors.text,
    },
});

export default Header;
