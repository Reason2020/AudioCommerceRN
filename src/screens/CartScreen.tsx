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
              <CustomContainer row flex vPadding={20} hPadding={15} style={{ gap: 15 }}>
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
                        <AntDesign name="minus" size={20} color={colors.black} />
                      </Pressable>
                      <Text style={styles.countText}>{cartItem.count}</Text>
                      <Pressable
                        style={styles.counterButtons}
                        onPress={() => dispatch(incrementCountOfItemInCart(cartItem.id))}
                      >
                        <AntDesign name="plus" size={20} color={colors.black} />
                      </Pressable>
                    </CustomContainer>

                    <Pressable onPress={() => dispatch(removeItemFromCart(cartItem.id))}>
                      <Feather name="trash-2" size={20} color={colors.black} />
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
          <Text>Total {cartItems.length} items</Text>
          <Text>USD {calculateTotalPrice()}</Text>
        </CustomContainer>
        <CustomButton
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
    height: 75,
    width: 75,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
  counterButtons: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    padding: 5,
  },
  countText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
});
