import React from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import images from '../../images';

type CustomButtonProps = {
  iconName?: string;
  iconType?: string;
  buttonText: string;
  handleButtonPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  iconName = "",
  iconType,
  buttonText,
  handleButtonPress,
}): React.JSX.Element => {
  return (
    <Pressable style={[styles.button, { justifyContent: iconName !== "" ? 'space-between' : 'center' }]} onPress={handleButtonPress}>
      <Text style={[styles.buttonText, { fontSize: iconName !== "" ? 14 : 16 }]}>{buttonText}</Text>
      {iconName === "chevron-right" && (
        <Image
          source={images.ChevronRightIcon}
          style={styles.icon}
        />
      )  }
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  icon: {
    height: 25,
    width: 25,
  }
});
