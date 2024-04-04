import React from 'react';

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import ProductCard from './ProductCard';
import { colors } from '../constants/colors';
import { ProductType } from '../constants/dummyData';

type ProductListProps = {
  productsCategory: string;
  products: () => ProductType[];
};

const CustomProductList = ({ productsCategory, products }: ProductListProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{productsCategory}</Text>
        <Pressable>
          <Text style={styles.seeAllBtn}>See all</Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={(item, index): string => index.toString()}
      />
    </View>
  );
};

export default CustomProductList;

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
  },
  seeAllBtn: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.darkGrey,
  },
});
