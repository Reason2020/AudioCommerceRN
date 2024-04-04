import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { ProductType } from '../constants/dummyData';

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
        <AntDesign name="arrowright" size={24} color={colors.primary} />
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
    padding: 20,
    marginVertical: 15,
  },
  productDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: '900',
    color: colors.black,
    width: '50%',
  },
  image: {
    width: '50%',
    height: Dimensions.get('screen').height * 0.2,
    resizeMode: 'cover',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '600',
  },
});
