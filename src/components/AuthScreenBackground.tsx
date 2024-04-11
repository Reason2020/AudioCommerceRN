import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import Images from '../../images'
import { colors } from '../constants/colors';

type AuthScreenBackgroundProps = {
  children: React.JSX.Element;
};

const AuthScreenBackground: React.FC<AuthScreenBackgroundProps> = ({
  children,
}): React.JSX.Element => {
  return (
    <ImageBackground
      source={Images.BackgroundImage}
      style={styles.image}
    >
      <LinearGradient colors={['#0acf8344', 'transparent']} style={styles.gradient}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Audio</Text>
            <Text style={styles.subtitleText}>It's modular and designed to last</Text>
          </View>
          {children}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default AuthScreenBackground;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    paddingVertical: 50,
    flex: 1,
    justifyContent: 'space-between',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  titleText: {
    fontSize: 51,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 66,
    letterSpacing: 0.6,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 20,
    letterSpacing: 0.2
  },
});
