import Icon from '@/assets/icons'; // Assuming this is compatible
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/Colors';
import { hp, wp } from '@/constants/Styles';
import { signIn } from '@/utils/auth';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    if (!email || !password) {
      Alert.alert('Login', 'Please fill in both email and password');
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
      // AuthContext/Layout will handle redirect usually, but let's encourage it
      // router.replace('/(app)/home') is handled in index.tsx or _layout logic?
      // For now, let's do manual replace if needed, or let auth state change drive it.
      // But typically with router, explicit replace is good UX feedback.
      // However, if logic is in _layout for protected routes, it might conflict.
      // Let's keep it safe.
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hey there,</Text>
          <Text style={styles.title}>Welcome Back</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            icon={<Icon name="mail" size={26} color={colors.textLight} />}
            placeholder="Enter your email"
            keyboardType="email-address"
            onChangeText={(text: string) => (emailRef.current = text)}
          />
          <Input
            icon={<Icon name="lock" size={26} color={colors.textLight} />}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text: string) => (passwordRef.current = text)}
          />

          <Pressable style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </Pressable>

          {/* Login Button */}
          <Button title="Login" loading={loading} onPress={onSubmit} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(8),
    gap: 20,
  },
  header: {
    gap: 6,
    marginBottom: hp(3),
  },
  welcomeText: {
    fontSize: hp(2.5),
    color: colors.text,
    fontWeight: '500',
  },
  title: {
    fontSize: hp(4),
    color: colors.primary,
    fontWeight: '800',
  },
  form: {
    gap: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: hp(1.8),
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
  },
  footerText: {
    color: colors.text,
    fontSize: hp(1.8),
  },
  signUpText: {
    color: colors.primary,
    fontSize: hp(1.8),
    fontWeight: '700',
    marginLeft: 5,
  },
});