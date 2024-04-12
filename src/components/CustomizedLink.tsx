import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { Link } from '@react-navigation/native';

import { colors } from '../constants/colors';

type CustomizedLinkProps = {
  descriptionText: string;
  linkText: string;
  route: string;
};

const CustomizedLink: React.FC<CustomizedLinkProps> = ({
  descriptionText,
  linkText,
  route,
}): React.JSX.Element => {
  return (
    <Text style={styles.descriptionText}>
      {descriptionText}
      <Link style={styles.linkText} to={route}>
        {linkText}
      </Link>
    </Text>
  );
};

export default CustomizedLink;

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  linkText: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
    color: colors.primary,
    textDecorationStyle: 'solid',
    fontWeight: '700'
  },
});
