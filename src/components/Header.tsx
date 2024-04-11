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
import images from '../../images';

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
          <Image
            source={images.ChevronLeftIcon}
            style={styles.icon}
          />
        ) : (
            <Image
              source={images.MenuVariantIcon}
              style={styles.icon}
            />
        )}
      </Pressable>

      {hasTitle ? <Text style={styles.headerTitleText}>{titleText}</Text> : null}

      <Pressable onPress={handleRightIconPress}>
        {rightIconName === 'user' ? (
          <Image
            source={images.UserProfile} style={styles.image} />
        ) : rightIconName === 'shopping-cart' ? (
          <CustomContainer>
            <Pressable onPress={handleRightIconPress}>
                <Image
                  source={images.ShoppingCartIcon}
                  style={styles.icon}
                />
              {cartItems.length > 0 && <View style={styles.redCircle} />}
            </Pressable>
          </CustomContainer>
        ) : (
              <Image
                source={images.TrashIcon}
                style={styles.icon}
              />
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
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
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
  icon: {
    height: 20,
    width: 20,
  }
});
