import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import CustomContainer from './CustomContainer';
import { useSelector } from 'react-redux';
import { CartItemsListType } from '../redux/reducers/cartSlice';
import { RootState } from '../redux/store';

type HeaderProps = {
  hasTitle: Boolean;
  isTitleLogo: Boolean;
  leftIconName: 'chevron-back' | 'bars-staggered';
  rightIconName: 'user' | 'shopping-cart' | 'trash-2';
  titleText: string;
  handleLeftIconPress: () => void;
  handleRightIconPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  hasTitle,
  isTitleLogo,
  leftIconName,
  rightIconName,
  titleText,
  handleLeftIconPress,
  handleRightIconPress,
}): React.JSX.Element => {
  const cartItems: CartItemsListType = useSelector((state: RootState) => state.cartItems);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLeftIconPress}>
        {leftIconName === 'chevron-back' ? (
          <Ionicons name={leftIconName} size={20} color={colors.black} />
        ) : (
          <FontAwesome6 name={leftIconName} size={20} color={colors.black} />
        )}
      </Pressable>

      {hasTitle ? <Text style={styles.headerTitleText}>{titleText}</Text> : null}

      <Pressable onPress={handleRightIconPress}>
        {rightIconName === 'user' ? (
          <Image source={require('../../images/userProfile.png')} style={styles.image} />
        ) : rightIconName === 'shopping-cart' ? (
          <CustomContainer>
            <Feather name="shopping-cart" size={20} color={colors.black} />
            {cartItems.length > 0 && <View style={styles.redCircle} />}
          </CustomContainer>
        ) : (
          <Feather name="trash-2" size={20} color={colors.black} />
        )}
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  redCircle: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: 'red',
  },
});
