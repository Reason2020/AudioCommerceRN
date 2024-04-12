import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

type CustomTitleProps = {
  subText: string;
  importantText: string;
};

const CustomTitle = ({ subText, importantText }: CustomTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subText}>{subText}</Text>
      <Text style={styles.importantText}>{importantText}</Text>
    </View>
  );
};

export default CustomTitle;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  subText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  importantText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    lineHeight: 32,
    letterSpacing: 0.5
  },
});
