import React from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import images from '../../images';
import { colors } from '../constants/colors';
import { ProductType } from '../constants/dummyData';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ title, price, rating, image, category, description, id }: ProductType) => {
  const navigation = useNavigation();

  const navigateToProductDetail = (productId: number) => {
    // navigation.navigate('ProductDetail', { productId });
    navigation.push('ProductDetail', { productId });
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
          <Image
            source={images.StarFilledIcon}
            style={styles.ratingIcon}
          />
          <Text style={styles.reviewsText}>{rating.rate}</Text>
        </View>
        <Text style={styles.reviewsText}>{rating.count} Reviews</Text>
        <Image
          source={images.MoreVerticalIcon}
          style={styles.moreIcon}
        />
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginRight: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: 155,
    marginVertical: 15,
  },
  image: {
    width: 135,
    height: 125,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  priceText: {
    fontSize: 12,
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
    gap: 3,
    alignItems: 'center',
  },
  reviewsText: {
    fontSize: 10,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 13,
    letterSpacing: 0.2
  },
  ratingIcon: {
    height: 11,
    width: 11,
  },
  moreIcon: {
    height: 20,
    width: 20
  }
});
