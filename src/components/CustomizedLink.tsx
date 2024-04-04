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
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
    color: colors.primary,
    textDecorationStyle: 'solid',
  },
});
