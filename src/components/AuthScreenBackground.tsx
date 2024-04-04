import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import { colors } from '../constants/colors';

type AuthScreenBackgroundProps = {
  children: React.JSX.Element;
};

const AuthScreenBackground: React.FC<AuthScreenBackgroundProps> = ({
  children,
}): React.JSX.Element => {
  return (
    <ImageBackground
      source={{
        uri: 'https://s3-alpha-sig.figma.com/img/7166/f48c/d8d5ce0132fa4ccb92c4868b538ba114?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nBXVubBeKrrsaNMaaBLbAUhSW4cHztINApmxoM4S46sebEFWNWevyMq8ePkzZXwN8-XeKqdPNASyyG~5Q2fanrDyaQvkaIGBEsZIXBbN46kPE2ktBnS7dEjlERZ8m6vjsb4TxcTkhzM1JMptQ84XIfRCqgAocVsmWUG6QBhsXRj4yRAbX0UaTxzzvx6CN7lBaAjFuxfDaO9nV1bjvuFtalo-I2j3GRc3cFKXgbgXIKO3LeumBAOlO3hP5X4PtUH4EfFzS39fNeYfA8xxxcTraUJs4QCBmqA9UqZTG41ItDXagiuy2nlmnVd5FrnOEOo1nAWHNX7gKn7PndGZIMO4XQ__',
      }}
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
    fontSize: 50,
    fontWeight: '800',
    color: colors.white,
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});
