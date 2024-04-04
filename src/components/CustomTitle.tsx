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
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  importantText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.black,
  },
});
