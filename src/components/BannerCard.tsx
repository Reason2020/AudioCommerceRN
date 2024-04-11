import React from 'react';

import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { ProductType } from '../constants/dummyData';
import images from '../../images';

const BannerCard = ({ title, price, rating, image }: ProductType) => {
  return (
    <View style={styles.container}>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.titleText} numberOfLines={3}>
          {title}
        </Text>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Shop now</Text>
        <Image
          source={images.ArrowRightIcon}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default BannerCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.9,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginVertical: 15,
  },
  productDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
    width: '50%',
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  image: {
    width: 117,
    height: 135,
    resizeMode: 'contain',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0.2
  },
  icon: {
    height: 20,
    width: 20
  }
});
