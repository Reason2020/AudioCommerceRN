import React, { useState } from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, Image, ActivityIndicator, Dimensions } from 'react-native';

import Header from '../components/Header';
import { colors } from '../constants/colors';
import ProductDetails from '../components/ProductDetails';
import CustomContainer from '../components/CustomContainer';

import { ProductType } from '../constants/dummyData';
import IconifiedInputField from '../components/IconifiedInputField';
import { useGetAllProductsQuery } from '../redux/services/productsApi';

const lastSearchData = ['TMA2 Wireless', 'Cable', 'Headphones'];

const SearchScreen = ({ navigation }: { navigation: any }) => {
  const [searchText, setSearchText] = useState('');

  const { data, isLoading, error } = useGetAllProductsQuery();

  const handleLeftIconPress = () => {
    navigation.pop();
  };

  if (isLoading) {
    return <ActivityIndicator size={'large'} color={colors.accent} />;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        <Header
          hasTitle={true}
          isTitleLogo={false}
          leftIconName="chevron-back"
          rightIconName="shopping-cart"
          titleText="Search"
          handleLeftIconPress={handleLeftIconPress}
        />

        <IconifiedInputField
          iconName="search"
          iconType="feather"
          placeholderText="Search headphone"
          showBorder={true}
          value={searchText}
          handleChange={newSearchText => setSearchText(newSearchText)}
        />

        <CustomContainer vPadding={15} hPadding={15} vMargin={10}>
          <Text style={styles.sectionTitle}>Latest search</Text>
          {lastSearchData.map((item, index) => {
            return (
              <CustomContainer
                row={true}
                vMargin={10}
                justifyContent="space-between"
                alignItems="center"
                key={index}
              >
                <CustomContainer row={true} justifyContent="flex-start" alignItems="center">
                  <Feather name="clock" size={24} color={colors.darkGrey} />
                  <Text style={styles.searchItemText}>{item}</Text>
                </CustomContainer>
                <Entypo name="cross" size={24} color={colors.darkGrey} />
              </CustomContainer>
            );
          })}
        </CustomContainer>

        <CustomContainer vPadding={15} hPadding={15} vMargin={10}>
          <Text style={styles.sectionTitle}>Popular products</Text>
          {data.map((item: ProductType, index: number) => {
            return (
              <CustomContainer row key={item.id} vMargin={10}>
                <CustomContainer
                  color={colors.lightGrey1}
                  borderRadius={15}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.image}
                  />
                </CustomContainer>
                <ProductDetails {...item} />
              </CustomContainer>
            );
          })}
        </CustomContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  searchItemText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
  },
  image: {
    height: 100,
    width: Dimensions.get('screen').width * 0.2,
    resizeMode: 'contain',
  },
});
