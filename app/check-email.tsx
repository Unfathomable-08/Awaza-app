import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import Icon from '../assets/icons';

export default function CheckEmail() {
  const router = useRouter();

  return (
    <ScreenWrapper bg="white">
      <StatusBar barStyle="dark-content" />

      {/* Back Button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Icon name="arrowLeft" size={26} color={theme.colors.text} strokeWidth={2.5} />
      </Pressable>

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Check Your Email</Text>
        </View>

        {/* Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            We've sent a verification link to your email address. Check your <Text style={{fontWeight: 650}}>Inbox</Text> or <Text style={{fontWeight: 650}}>Spam</Text> folder.
          </Text>
        </View>

        {/* Button to Login */}
        <Button
          title="Go to Login"
          hasShadow={true}
          style={{ marginTop: 30 }}
          onPress={() => router.replace('/login')}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(8),
    paddingBottom: hp(5),
    gap: 20,
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 4,
    padding: 4,
    borderRadius: theme.radius.xxl,
    backgroundColor: 'rgba(0,0,0,0.07)',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: hp(4),
    color: theme.colors.primary,
    fontFamily: theme.fonts.extraBold,
    fontWeight: theme.fonts.extraBold,
    textAlign: 'center',
  },
  messageContainer: {
    gap: 15,
  },
  messageText: {
    fontSize: hp(2.6),
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
    textAlign: 'center',
  },
});