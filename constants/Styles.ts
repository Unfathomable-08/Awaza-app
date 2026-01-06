/**
 * Awaza App Design System - Common Styles & Metrics
 */
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors } from './Colors';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

// Responsive Helpers
export const hp = (percentage: number) => (percentage * deviceHeight) / 100;
export const wp = (percentage: number) => (percentage * deviceWidth) / 100;

export const spacing = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
};

export const radius = {
    s: 6,
    m: 12,
    l: 18,
    xl: 24,
    full: 9999,
};

export const commonStyles = StyleSheet.create({
    // Flex Helpers
    flex1: { flex: 1 },
    row: { flexDirection: 'row', alignItems: 'center' },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    center: { alignItems: 'center', justifyContent: 'center' },

    // Container
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    // Shadows
    shadowSmall: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    shadowMedium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
    },

    // Text Defaults
    textBase: {
        fontSize: 16,
        color: colors.text,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
});
