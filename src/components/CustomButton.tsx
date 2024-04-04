import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

type CustomButtonProps = {
  iconName?: string;
  iconType?: string;
  buttonText: string;
  handleButtonPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  iconName,
  iconType,
  buttonText,
  handleButtonPress,
}): React.JSX.Element => {
  return (
    <Pressable style={styles.button} onPress={handleButtonPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
      {/* { iconName &&  } */}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 20,
  },
});
