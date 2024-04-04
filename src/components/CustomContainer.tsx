import React from 'react';

import { StyleSheet, Text, View, ViewProps } from 'react-native';

interface ContainerProps extends ViewProps {
  color?: string;
  row?: boolean;
  vPadding?: number;
  hPadding?: number;
  vMargin?: number;
  hMargin?: number;
  borderRadius?: number;
  width?: number | string;
  flex?: boolean;
  justifyContent?: 'center' | 'space-between' | 'flex-start';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  children: React.ReactNode;
  border?: boolean;
  borderColor?: string;
  flexGrow?: number;
}

const CustomContainer = ({
  color,
  row = false,
  vPadding = 0,
  hPadding = 0,
  vMargin = 0,
  hMargin = 0,
  borderRadius = 0,
  width = 0,
  children,
  flex = false,
  justifyContent,
  alignItems,
  border = false,
  borderColor,
  flexGrow = 1,
  ...props
}: ContainerProps) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          flexDirection: row ? 'row' : 'column',
          paddingVertical: vPadding,
          paddingHorizontal: hPadding,
          marginVertical: vMargin,
          marginHorizontal: hMargin,
          borderRadius,
          gap: 10,
        },
        flex && {
          flex: 1,
        },
        width
          ? {
              width,
            }
          : null,
        justifyContent && {
          justifyContent,
        },
        alignItems && {
          alignItems,
        },
        border && {
          borderColor,
          borderWidth: 1,
        },
        props.style,
      ]}
    >
      {children}
    </View>
  );
};

export default CustomContainer;

const styles = StyleSheet.create({});
