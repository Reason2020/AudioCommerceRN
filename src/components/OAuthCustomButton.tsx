import React from 'react';

import { Image, StyleSheet, View } from 'react-native';

import { colors } from '../constants/colors';

type OAuthCustomButtonProps = {
  iconName: string;
};

const OAuthCustomButton: React.FC<OAuthCustomButtonProps> = ({ iconName }): React.JSX.Element => {
  return (
    <View style={styles.container}>
      {iconName === 'apple' ? (
        <Image source={require('../../images/apple.png')} style={styles.image} />
      ) : iconName === 'google' ? (
        <Image source={require('../../images/google.png')} style={styles.image} />
      ) : (
        <Image source={require('../../images/facebook.png')} style={styles.image} />
      )}
    </View>
  );
};

export default OAuthCustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey2,
    padding: 15,
    borderRadius: 12,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
