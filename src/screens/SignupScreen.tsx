import React from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import ErrorField from '../components/ErrorField';
import CustomButton from '../components/CustomButton';
import CustomizedLink from '../components/CustomizedLink';
import OAuthCustomButton from '../components/OAuthCustomButton';
import IconifiedInputField from '../components/IconifiedInputField';
import AuthScreenBackground from '../components/AuthScreenBackground';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .max(20, 'Cannot be more than 20 characters.')
    .min(8, 'Must be 8 characters or more.'),
});

const SignupScreen = ({ navigation }: { navigation: any }) => {
  const handleSignUpScreen = () => {
    navigation.navigate('Home');
  };

  const { values, errors, handleBlur, handleChange, isValid, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => console.log('Signup'),
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthScreenBackground>
        <View style={styles.formContainer}>
          <IconifiedInputField
            iconName="Mail"
            placeholderText="Email"
            iconType="antdesign"
            showBorder={false}
            value={values.email}
            handleChange={handleChange('email')}
            handleBlur={handleBlur('email')}
          />
          {touched.email && errors.email && (
            <ErrorField errorText={errors.email[0].toUpperCase() + errors.email.slice(1)} />
          )}
          <IconifiedInputField
            iconName="Lock"
            placeholderText="Password"
            iconType="feather"
            showBorder={false}
            secure
            value={values.password}
            handleChange={handleChange('password')}
            handleBlur={handleBlur('password')}
          />
          {touched.password && errors.password && (
            <ErrorField errorText={errors.password[0].toUpperCase() + errors.password.slice(1)} />
          )}

          <CustomButton
            iconName=""
            iconType=""
            buttonText="Sign Up"
            handleButtonPress={() =>
              isValid ? handleSignUpScreen() : console.log('Error Signing up')
            }
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
