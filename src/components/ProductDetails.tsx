import React from 'react';

import { Dimensions, StyleSheet, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
          <AntDesign name="star" size={24} color={colors.accent} />
          <Text style={styles.reviewText}>{rating.rate}</Text>
        </CustomContainer>
        <Text style={styles.reviewText}>{rating.count} Reviews</Text>
        <Entypo name="dots-three-vertical" size={24} color={colors.darkGrey} />
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
    fontSize: 21,
    fontWeight: '400',
    color: colors.black,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  reviewText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
});
