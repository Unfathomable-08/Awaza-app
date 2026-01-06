import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/Colors';
import { commonStyles, hp, wp } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Welcome() {
   const router = useRouter();

   return (
      <ScreenWrapper bg={colors.background}>
         <StatusBar barStyle="dark-content" />
         <View style={[commonStyles.container, styles.container]}>
            {/* Hero Image */}
            <View style={styles.imageContainer}>
               <Image
                  source={require('@/assets/images/welcome.png')}
                  style={styles.welcomeImage}
                  resizeMode="contain"
               />
            </View>

            {/* Text Content */}
            <View style={styles.contentContainer}>
               <Text style={styles.title}>Awaza</Text>
               <Text style={styles.punchline}>
                  Your ultimate social media app for sharing your favorite moments and connecting with friends globally!
               </Text>
            </View>

            {/* Footer Actions */}
            <View style={styles.footer}>
               <Button
                  title="Getting Started"
                  buttonStyle={styles.startButton}
                  onPress={() => router.push('/(auth)/signup')}
               />
               <View style={styles.loginRow}>
                  <Text style={styles.alreadyText}>Already have an account?</Text>
                  <Pressable onPress={() => router.push('/(auth)/login')}>
                     <Text style={styles.loginText}>Login</Text>
                  </Pressable>
               </View>
            </View>
         </View>
      </ScreenWrapper>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: wp(5),
      justifyContent: 'space-between',
      paddingBottom: hp(5),
   },
   imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp(5),
   },
   welcomeImage: {
      width: wp(80),
      height: hp(40),
   },
   contentContainer: {
      gap: 10,
      alignItems: 'center',
      marginBottom: hp(5),
   },
   title: {
      fontSize: hp(5),
      fontWeight: '800', // Bold for premium feel
      color: colors.primary,
      letterSpacing: 1,
   },
   punchline: {
      fontSize: hp(2),
      textAlign: 'center',
      color: colors.textLight,
      lineHeight: hp(3),
      paddingHorizontal: wp(5),
   },
   footer: {
      gap: 20,
      width: '100%',
   },
   startButton: {
      width: '100%',
   },
   loginRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
   },
   alreadyText: {
      fontSize: hp(1.8),
      color: colors.text,
   },
   loginText: {
      fontSize: hp(1.8),
      color: colors.primary,
      fontWeight: '700',
   },
});