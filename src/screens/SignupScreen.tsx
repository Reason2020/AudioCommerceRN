import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import CustomizedLink from '../components/CustomizedLink';
import OAuthCustomButton from '../components/OAuthCustomButton';
import IconifiedInputField from '../components/IconifiedInputField';
import AuthScreenBackground from '../components/AuthScreenBackground';

const SignupScreen = ({ navigation }: { navigation: any }) => {
  const handleSignUpScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthScreenBackground>
        <View style={styles.formContainer}>
          <IconifiedInputField
            iconName="mail"
            placeholderText="Email"
            iconType="antdesign"
            showBorder={false}
          />
          <IconifiedInputField
            iconName="lock"
            placeholderText="Password"
            iconType="feather"
            showBorder={false}
          />

          <CustomButton
            iconName=""
            iconType=""
            buttonText="Sign Up"
            handleButtonPress={handleSignUpScreen}
          />

          <View style={styles.oAuthButtonsContainer}>
            <OAuthCustomButton iconName="apple" />
            <OAuthCustomButton iconName="facebook" />
            <OAuthCustomButton iconName="google" />
          </View>

          <CustomizedLink
            descriptionText="If you have an account?"
            linkText="Sign in here"
            route="/Login"
          />
        </View>
      </AuthScreenBackground>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    gap: 20,
    padding: 15,
  },
  oAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
