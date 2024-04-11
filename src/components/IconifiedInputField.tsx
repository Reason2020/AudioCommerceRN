import React, { useState } from 'react';

import Feather from 'react-native-vector-icons/Feather';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { colors } from '../constants/colors';
import images from '../../images';

type IconifiedInputFieldProps = {
  iconName: 'Mail' | 'Lock' | 'Search';
  placeholderText: string;
  iconType: 'antdesign' | 'feather';
  showBorder: boolean;
  value: string;
  secure?: boolean;
  handleChange: (newValue: string) => void;
  handleBlur?: (e: any) => void;
};

const IconifiedInputField: React.FC<IconifiedInputFieldProps> = ({
  iconName,
  placeholderText,
  iconType,
  showBorder,
  value,
  handleChange,
  secure = false,
  handleBlur,
}): React.JSX.Element => {
  return (
    <View
      style={[
        styles.container,
        showBorder ? { borderColor: colors.grey, borderWidth: 1, borderRadius: 10 } : null,
      ]}
    >
      <View>
        {iconName === 'Lock' ? (
          <Image
            source={images.LockIcon}
            style={styles.image}
          />
        ) : iconName === 'Mail' ? (
            <Image
              source={images.MailIcon}
              style={styles.image}
            />
          ) : (
              <Image
                source={images.SearchIcon}
                style={styles.image}
              />
        )}
      </View>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholderText}
        placeholderTextColor={colors.grey}
        secureTextEntry={secure}
        onBlur={handleBlur}
        style={styles.textEntry}
      />
    </View>
  );
};

export default IconifiedInputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 12,
    marginVertical: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
  textEntry: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20
  }
});
