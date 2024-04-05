import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { colors } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import CustomizedLink from '../components/CustomizedLink';
import IconifiedInputField from '../components/IconifiedInputField';
import AuthScreenBackground from '../components/AuthScreenBackground';

const LoginScreen = ({ navigation }: { navigation: any }): React.JSX.Element => {
  const handleLoginPress = (values: any) => {
    console.log('Values: ', values);
    // navigation.navigate('Home');
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .max(20, 'Cannot be more than 20 characters')
      .min(8, 'Must be more than 8 characters'),
  });

  const { values, errors, handleBlur, touched, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: submitValues => handleLoginPress(submitValues),
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthScreenBackground>
        <View style={styles.formContainer}>
          <IconifiedInputField
            iconName="mail"
            placeholderText="Email Address"
            iconType="antdesign"
            showBorder={false}
            value={values.email}
            handleChange={() => handleChange('email')}
          />
          <IconifiedInputField
            iconName="lock"
            placeholderText="Password"
            iconType="feather"
            showBorder={false}
            value={values.password}
            handleChange={() => handleChange('password')}
          />
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          <CustomButton
            iconName=""
            iconType=""
            buttonText="Sign In"
            handleButtonPress={() => handleLoginPress(values)}
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
