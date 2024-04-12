import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { colors } from '../constants/colors';
import ErrorField from '../components/ErrorField';
import CustomButton from '../components/CustomButton';
import CustomizedLink from '../components/CustomizedLink';
import IconifiedInputField from '../components/IconifiedInputField';
import AuthScreenBackground from '../components/AuthScreenBackground';
import { FIREBASE_AUTH } from '../../Firebase';

const LoginScreen = ({ navigation }: { navigation: any }): React.JSX.Element => {
  const handleLoginPress = () => {
    signIn();
    navigation.navigate('Home');
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .max(20, 'Cannot be more than 20 characters')
      .min(8, 'Must be more than 8 characters'),
  });

  const { values, errors, handleBlur, touched, handleChange, isValid } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: submitValues => handleLoginPress(),
  });

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, values.email, values.password);
      if (response) {
        navigation.navigate('Home');
      }
    } catch (err) { 
      console.log('Error: ' + err)
      Alert.alert('SignIn failed', 'Could not sign in. Try again later');
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthScreenBackground>
        <View style={styles.formContainer}>
          <IconifiedInputField
            iconName='Mail'
            placeholderText="Email Address"
            iconType="antdesign"
            showBorder={false}
            value={values.email}
            handleChange={handleChange('email')}
            handleBlur={handleBlur('email')}
          />
          {touched.email && errors.email && <ErrorField errorText={errors.email} />}
          <IconifiedInputField
            iconName='Lock'
            placeholderText="Password"
            iconType="feather"
            showBorder={false}
            value={values.password}
            secure
            handleChange={handleChange('password')}
            handleBlur={handleBlur('password')}
          />
          {touched.password && errors.password && <ErrorField errorText={errors.password} />}
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          <CustomButton
            iconName=""
            iconType=""
            buttonText="Sign In"
            handleButtonPress={() => (isValid && signIn())}
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2
  },
  signUpLinkText: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
    color: colors.primary,
    textDecorationStyle: 'solid',
  },
});
