import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import CustomContainer from '../components/CustomContainer';
import {
  incrementCountOfItemInCart,
  decrementCountOfItemInCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  CartItemType,
  CartItemsListType,
} from '../redux/reducers/cartSlice';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { colors } from '../constants/colors';
import images from '../../images';

const CartScreen = () => {
  const cartItems: CartItemsListType = useSelector((state: RootState) => state.cartItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDecrementPress = (item: CartItemType) => {
    if (item.count === 1) {
      dispatch(removeItemFromCart(item.id));
    } else {
      dispatch(decrementCountOfItemInCart(item.id));
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach(cartItem => {
      total += cartItem.price * cartItem.count;
    });
    return total;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollViewContainer}>
        <Header
          hasTitle={true}
          isTitleLogo={false}
          leftIconName="chevron-back"
          rightIconName="trash-2"
          titleText="Shopping Cart"
          handleLeftIconPress={() => navigation.goBack()}
          handleRightIconPress={() => dispatch(removeAllItemsFromCart())}
        />

        {cartItems.length > 0 ? (
          cartItems.map(cartItem => {
            return (
              <CustomContainer
                row
                flex
                vPadding={20}
                hPadding={15}
                style={{ gap: 15 }}
                key={cartItem.id}
              >
                {/* image container */}
                <CustomContainer
                  color={colors.lightGrey1}
                  borderRadius={15}
                  vPadding={10}
                  hPadding={10}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    source={{
                      uri: cartItem.image,
                    }}
                    style={styles.image}
                  />
                </CustomContainer>

                <CustomContainer flex>
                  <Text style={styles.titleText}>{cartItem.title}</Text>
                  <Text style={styles.priceText}>USD {cartItem.price}</Text>

                  {/* action buttons */}
                  <CustomContainer row justifyContent="space-between">
                    {/* counter container */}
                    <CustomContainer row alignItems="center" style={{ gap: 20 }}>
                      <Pressable
                        style={styles.counterButtons}
                        onPress={() => handleDecrementPress(cartItem)}
                      >
                        <Image
                          source={images.MinusIcon}
                          style={styles.icon}
                        />
                      </Pressable>
                      <Text style={styles.countText}>{cartItem.count}</Text>
                      <Pressable
                        style={styles.counterButtons}
                        onPress={() => dispatch(incrementCountOfItemInCart(cartItem.id))}
                      >
                        <Image
                          source={images.PlusIcon}
                          style={styles.icon}
                        />
                      </Pressable>
                    </CustomContainer>

                    <Pressable onPress={() => dispatch(removeItemFromCart(cartItem.id))}>
                      <Image
                        source={images.TrashIcon}
                        style={styles.icon}
                      />
                    </Pressable>
                  </CustomContainer>
                </CustomContainer>
              </CustomContainer>
            );
          })
        ) : (
          <CustomContainer flex justifyContent="center" alignItems="center">
            <Text>No Products to Display in Cart</Text>
          </CustomContainer>
        )}
      </ScrollView>

      <CustomContainer color={colors.white} hPadding={15} vPadding={15} style={{ gap: 15 }}>
        <CustomContainer row justifyContent="space-between" alignItems="center">
          <Text style={styles.totalTitleText}>Total {cartItems.length} items</Text>
          <Text style={styles.totalPriceText}>USD {calculateTotalPrice()}</Text>
        </CustomContainer>
        <CustomButton
          iconName='chevron-right'
          buttonText="Proceed to Checkout"
          handleButtonPress={() => console.log('Proceed to Checkout')}
        />
      </CustomContainer>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContainer: {
    flex: 1,
  },
  image: {
    height: 67,
    width: 67,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  counterButtons: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  icon: {
    height: 20,
    width: 20,
  },
  totalTitleText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.2,
    color: colors.darkGrey,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});
