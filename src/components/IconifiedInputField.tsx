import React, { useState } from 'react';

import Feather from 'react-native-vector-icons/Feather';
import { StyleSheet, TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { colors } from '../constants/colors';

type IconifiedInputFieldProps = {
  iconName: string;
  placeholderText: string;
  iconType: 'antdesign' | 'feather';
  showBorder: boolean;
  value: string;
  handleChange: (newValue: string) => void;
};

const IconifiedInputField: React.FC<IconifiedInputFieldProps> = ({
  iconName,
  placeholderText,
  iconType,
  showBorder,
  value,
  handleChange,
}): React.JSX.Element => {
  return (
    <View
      style={[
        styles.container,
        showBorder ? { borderColor: colors.grey, borderWidth: 1, borderRadius: 15 } : null,
      ]}
    >
      <View>
        {iconType === 'antdesign' ? (
          <AntDesign name={iconName} size={20} color={colors.grey} />
        ) : (
          <Feather name={iconName} size={20} color={colors.grey} />
        )}
      </View>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholderText}
        placeholderTextColor={colors.grey}
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
    paddingVertical: 8,
    gap: 10,
    marginVertical: 10,
    marginHorizontal: 15,
  },
});
