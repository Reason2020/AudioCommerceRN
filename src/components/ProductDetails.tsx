import React from 'react';

import { Dimensions, StyleSheet, Text, Image } from 'react-native';

import images from '../../images';
import { colors } from '../constants/colors';
import CustomContainer from './CustomContainer';
import { ProductType } from '../constants/dummyData';

const ProductDetails = ({ title, rating, price }: ProductType) => {
  return (
    <CustomContainer
      vMargin={10}
      style={styles.flexGrow}
      width={Dimensions.get('screen').width * 0.7}
    >
      <Text style={styles.titleText} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.priceText}>USD {price}</Text>
      <CustomContainer row justifyContent="space-between" alignItems="center">
        <CustomContainer row justifyContent="flex-start" alignItems="center">
          <Image
            source={images.StarFilledIcon}
            style={styles.ratingIcon}
          />
          <Text style={styles.reviewText}>{rating.rate}</Text>
        </CustomContainer>
        <Text style={styles.reviewText}>{rating.count} Reviews</Text>
        <Image
          source={images.MoreVerticalIcon}
          style={styles.moreIcon}
        />
      </CustomContainer>
    </CustomContainer>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: colors.darkGrey,
  },
  flexGrow: {
    flexGrow: 2,
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
    letterSpacing: 0.2
  },
  reviewText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 15,
    letterSpacing: 0.2
  },
  ratingIcon: {
    height: 16,
    width: 16,
  },
  moreIcon: {
    height: 20,
    width: 20,
  }
});
