import React from 'react';

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { colors } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import CustomizedLink from '../components/CustomizedLink';
import IconifiedInputField from '../components/IconifiedInputField';
import AuthScreenBackground from '../components/AuthScreenBackground';

const LoginScreen = ({ navigation }: { navigation: any }): React.JSX.Element => {
  const handleLoginPress = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthScreenBackground>
        <View style={styles.formContainer}>
          <IconifiedInputField
            iconName="mail"
            placeholderText="Email Address"
            iconType="antdesign"
            showBorder={false}
          />
          <IconifiedInputField
            iconName="lock"
            placeholderText="Password"
            iconType="feather"
            showBorder={false}
          />
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          <CustomButton
            iconName=""
            iconType=""
            buttonText="Sign In"
            handleButtonPress={handleLoginPress}
          />

          <CustomizedLink
            descriptionText="Don't have an account?"
            linkText="Sign up here"
            route="/Signup"
          />
        </View>
      </AuthScreenBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
  forgotPasswordText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  signUpLinkText: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
    color: colors.primary,
    textDecorationStyle: 'solid',
  },
});
