import { colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
    children: React.ReactNode;
    bg?: string;
}

const ScreenWrapper = ({ children, bg = colors.background }: ScreenWrapperProps) => {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === 'ios' ? (top > 0 ? top + 5 : 30) : top + 10;

    return (
        <View style={[styles.container, { backgroundColor: bg, paddingTop }]}>
            <StatusBar style="dark" />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ScreenWrapper;
