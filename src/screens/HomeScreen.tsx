import React, { useState, useCallback, useMemo, useRef } from 'react';

import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';

import Header from '../components/Header';
import { colors } from '../constants/colors';
import BannerCard from '../components/BannerCard';
import CustomTitle from '../components/CustomTitle';
import CustomContainer from '../components/CustomContainer';
import CustomProductList from '../components/CustomProductList';
import { useGetAllProductsQuery } from '../redux/services/productsApi';
import { useGetAllCategoriesQuery } from '../redux/services/categoriesApi';
import CustomButton from '../components/CustomButton';

type ActiveFilterItemType = string;

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [activeFilterItem, setActiveFilterItem] = useState<ActiveFilterItemType>('All');

  const onLeftIconPress = () => {
    console.log('Menu');
  };

  const { data, isLoading, error } = useGetAllProductsQuery();

  const [products, setProducts] = useState(data);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const handleFilterProduct = () => {
    const filteredProducts = data.filter((item: any) => item.category === activeFilterItem);
    setProducts(filteredProducts);
    handleModalClose();
  };

  //ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  //snapPoints
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  //callbacks
  const handleOpenModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('Sheet changes...', index);
  }, []);
  const handleModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  console.log('Fetched Data: ', data);

  if (isLoading) {
    return <ActivityIndicator size={'large'} color={colors.accent} />;
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar animated backgroundColor={colors.white} barStyle={'dark-content'} />
        <View style={{ marginTop: StatusBar.currentHeight }} />

        <ScrollView style={styles.container}>
          <Header
            hasTitle={true}
            isTitleLogo={true}
            titleText="Audio"
            leftIconName="bars-staggered"
            rightIconName="user"
            handleLeftIconPress={onLeftIconPress}
          />
          <CustomTitle subText="Hi, Andrea" importantText="What are you looking for today?" />

          <CustomContainer row flex alignItems="center" hPadding={16}>
            <Pressable onPress={() => navigation.navigate('Search')} style={{ flex: 1 }}>
              <CustomContainer
                color={colors.white}
                vPadding={15}
                hPadding={15}
                vMargin={10}
                row={true}
                borderRadius={10}
                border={true}
                borderColor={colors.darkGrey}
                alignItems="center"
              >
                <Feather name="search" size={24} color={colors.darkGrey} />
                <Text>Search headphone</Text>
              </CustomContainer>
            </Pressable>

            <Pressable style={styles.filterButton} onPress={handleOpenModalPress}>
              <SimpleLineIcons name="equalizer" size={24} color={colors.black} />
            </Pressable>
          </CustomContainer>

          <View style={styles.contentContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => <BannerCard {...item} />}
              keyExtractor={(item, index): string => index.toString()}
            />

            <CustomProductList
              productsCategory={`${
                activeFilterItem === 'All'
                  ? 'Featured'
                  : activeFilterItem[0].toUpperCase() + activeFilterItem.slice(1)
              } Products`}
              products={products || data}
            />
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.modalContainer}>
              <CustomContainer justifyContent="space-between">
                <CustomContainer
                  row
                  justifyContent="space-between"
                  vMargin={10}
                  alignItems="center"
                >
                  <Text style={styles.modalTitle}>Filter</Text>
                  <Pressable
                    onPress={() => {
                      setProducts(data);
                      setActiveFilterItem('All');
                      handleModalClose();
                    }}
                  >
                    <FontAwesome name="close" size={24} color={colors.black} />
                  </Pressable>
                </CustomContainer>
                <Text style={styles.filterTitle}>Category</Text>
                <FlatList
                  data={categoriesData}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.filterContainer}
                  renderItem={({ item }) => {
                    return (
                      <Pressable
                        onPress={() => setActiveFilterItem(item)}
                        style={[
                          styles.filterItemContainer,
                          activeFilterItem === item ? { backgroundColor: colors.primary } : null,
                        ]}
                      >
                        <Text
                          style={{
                            color: activeFilterItem === item ? colors.white : colors.black,
                            fontWeight: '500',
                          }}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    );
                  }}
                />
                <CustomButton buttonText="Apply Filter" handleButtonPress={handleFilterProduct} />
              </CustomContainer>
            </BottomSheetView>
          </BottomSheetModal>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    backgroundColor: colors.white,
    flex: 1,
  },
  contentContainer: {
    // flex: 1,
    padding: 15,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: colors.lightGrey1,
  },
  filterContainer: {
    height: 40,
  },
  filterItemContainer: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: colors.darkGrey,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    flex: 0,
    alignSelf: 'center',
  },
  modalContainer: {
    padding: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    marginVertical: 8,
  },
});
