import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { ProductType } from '../constants/dummyData';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ title, price, rating, image, category, description, id }: ProductType) => {
  const navigation = useNavigation();

  const navigateToProductDetail = (productId: number) => {
    navigation.navigate('ProductDetail', { productId });
  };

  return (
    <Pressable onPress={() => navigateToProductDetail(id)} style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.titleText} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.priceText}>USD {price}</Text>
      <View style={styles.reviewsContainer}>
        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={24} color={colors.accent} />
          <Text style={styles.reviewsText}>{rating.rate}</Text>
        </View>
        <Text style={styles.reviewsText}>{rating.count} Reviews</Text>
        <Entypo name="dots-three-vertical" size={24} color={colors.darkGrey} />
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginRight: 15,
    padding: 15,
    width: Dimensions.get('screen').width * 0.5,
    marginVertical: 15,
  },
  image: {
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').height * 0.2,
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  reviewsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  reviewsText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
});
