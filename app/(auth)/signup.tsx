import Icon from '@/assets/icons';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/Colors';
import { hp, wp } from '@/constants/Styles';
import { signUp } from '@/utils/auth';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Signup() {
  const router = useRouter();

  const nameRef = useRef<string>('');
  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const name = nameRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    // Validation
    if (!name || !email || !password) {
      Alert.alert('Sign Up', 'Please fill all the fields!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Sign Up', 'Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      // Typically successful signup logs you in, or sends verification
      // If auto-login, redirect. If verification, show alert or special screen.
      // Based on previous code, it replaces to home.
      // router.replace('/(app)/home') 
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Sign Up Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar barStyle="dark-content" />

      {/* Back Button */}
      <View style={styles.backButton}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Icon name="arrowLeft" size={26} color={colors.text} strokeWidth={2.5} />
        </Pressable>
      </View>

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.title}>Get Started</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name Field */}
          <Input
            icon={<Icon name="user" size={26} color={colors.textLight} />}
            placeholder="Create a username"
            onChangeText={(text: string) => (nameRef.current = text)}
          />

          {/* Email Field */}
          <Input
            icon={<Icon name="mail" size={26} color={colors.textLight} />}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text: string) => (emailRef.current = text)}
          />

          {/* Password Field */}
          <Input
            icon={<Icon name="lock" size={26} color={colors.textLight} />}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text: string) => (passwordRef.current = text)}
          />

          {/* Signup Button */}
          <Button
            title="Signup"
            buttonStyle={{ marginTop: 20 }}
            loading={loading}
            onPress={onSubmit}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginText}>Login</Text>
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
    paddingTop: hp(4),
    gap: 20,
  },
  backButton: {
    paddingLeft: wp(5),
    paddingTop: 10,
  },
  header: {
    gap: 6,
    marginBottom: hp(2),
  },
  welcomeText: {
    fontSize: hp(3.5),
    color: colors.text,
    fontWeight: 'bold',
  },
  title: {
    fontSize: hp(4),
    color: colors.primary,
    fontWeight: '800',
  },
  form: {
    gap: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
  },
  footerText: {
    color: colors.text,
    fontSize: hp(1.8),
  },
  loginText: {
    color: colors.primary,
    fontSize: hp(1.8),
    fontWeight: '700',
    marginLeft: 5,
  },
});