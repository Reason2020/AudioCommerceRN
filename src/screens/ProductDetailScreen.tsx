import React, { useState } from 'react';

import {
  Text,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';

import images from '../../images';
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} from '../redux/services/productsApi';
import Header from '../components/Header';
import { RootState } from '../redux/store';
import { colors } from '../constants/colors';
import { reviews } from '../constants/dummyData';
import CustomButton from '../components/CustomButton';
import { addItemToCart } from '../redux/reducers/cartSlice';
import CustomContainer from '../components/CustomContainer';
import CustomProductList from '../components/CustomProductList';

type FilterItemType = 'Overview' | 'Features';
const filterItems: FilterItemType[] = ['Overview', 'Features'];

const ProductDetailScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const [activeFilterItem, setActiveFilterItem] = useState<FilterItemType>('Overview');

  const { productId } = route.params ?? {};

  const {
    data: productData,
    isLoading: loadingProduct,
    error: productError,
  } = useGetProductByIdQuery(productId);
  const {
    data: allProducts,
    isLoading: loadingAllProducts,
    error: allProductsError,
  } = useGetAllProductsQuery();

  const cartItems = useSelector((state: RootState) => state.cartItems);
  const dispatch = useDispatch();

  const calculateSimilarProducts = () => {
    const similarProducts = allProducts.filter(
      (item: any) => item.category === productData.category
    );
    return similarProducts;
  };

  const renderFilterMenuItem = (filterItem: FilterItemType) => {
    return (
      <Pressable onPress={() => setActiveFilterItem(filterItem)} style={[styles.filterButton]}>
        <Text style={styles.filterItemText}>{filterItem}</Text>
        {activeFilterItem === filterItem && <View style={styles.underline} />}
      </Pressable>
    );
  };

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Image
        source={images.StarFilledIcon}
        style={styles.ratingIcon}
      />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Image
        source={images.StarOutlinedIcon}
        style={styles.ratingIcon}
      />);
    }

    return stars;
  };

  const renderOverview = () => {
    return (
      <CustomContainer
        vPadding={30}
        hPadding={15}
        borderRadius={10}
        color={colors.lightGrey1}
        justifyContent="center"
        alignItems="center"
      >
        <Image source={{ uri: productData.image }} style={styles.productOverviewImage} />
      </CustomContainer>
    );
  };

  const renderFeatures = () => {
    return (
      <CustomContainer style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{productData.description}</Text>
      </CustomContainer>
    );
  };

  const handleAddToCartPress = () => {
    //check if the item already exists in cart
    const alreadyExists = cartItems.findIndex(item => item.id === productData.id);

    //if not add to cart
    if (alreadyExists === -1) {
      dispatch(
        addItemToCart({
          id: productData.id,
          title: productData.title,
          price: Number(productData.price),
          count: 1,
          image: productData.image,
        })
      );
    } else {
      Toast.show({
        type: 'info',
        text1: 'Item already added to cart',
        position: 'top',
        swipeable: true,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 100
      })
    }
  };

  if (loadingProduct || loadingAllProducts) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ marginTop: StatusBar.currentHeight }} />

      <ScrollView style={styles.container}>
        <Header
          hasTitle={false}
          isTitleLogo={false}
          leftIconName="chevron-back"
          rightIconName="shopping-cart"
          titleText=""
          handleLeftIconPress={() => navigation.pop()}
          handleRightIconPress={() => navigation.navigate('Cart')}
        />

        <CustomContainer vMargin={20} hPadding={15}>
          <CustomContainer>
            <Text style={styles.priceText}>USD {Math.floor(Number(productData.price))}</Text>
            <Text style={styles.titleText}>{productData.title}</Text>
          </CustomContainer>

          <CustomContainer>
            <FlatList
              data={filterItems}
              renderItem={({ item }) => renderFilterMenuItem(item)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </CustomContainer>

          {activeFilterItem === 'Overview' ? renderOverview() : renderFeatures()}

          {/* Main Reviews Container */}

          {activeFilterItem === 'Overview' ? (
            <CustomContainer vMargin={15} hPadding={10}>
              {/* <Text style={styles.reviewTitleText}>Review ({reviews.length})</Text> */}
              {reviews.map((review, index) => {
                return (
                  // Review Card Container
                  <CustomContainer row alignItems="flex-start" vMargin={10} key={index}>
                    <Image source={images.UserProfile} style={styles.reviewerProfileImage} />

                    {/* Review Details Container */}
                    <CustomContainer width={Dimensions.get('screen').width * 0.75}>
                      {/* Reviewer Details Container */}
                      <CustomContainer row justifyContent="space-between">
                        {/* Reviewer Username and stars container */}
                        <CustomContainer>
                          <Text style={styles.usernameText}>{review.username}</Text>
                          <CustomContainer row>
                            {renderStars(productData.rating.rate).map((star, index) => (
                              <CustomContainer key={index}>{star}</CustomContainer>
                            ))}
                          </CustomContainer>
                        </CustomContainer>
                        <Text style={styles.reviewTimeText}>{review.time} Months ago</Text>
                      </CustomContainer>
                      <Text style={styles.commentText}>{review.comment}</Text>
                    </CustomContainer>
                  </CustomContainer>
                );
              })}
            </CustomContainer>
          ) : null}

          {productData && (
            <CustomProductList
              productsCategory="Similar Products"
              products={calculateSimilarProducts()}
            />
          )}
        </CustomContainer>
      </ScrollView>
      <CustomContainer hPadding={15} vPadding={10}>
        <CustomButton buttonText="Add to Cart" handleButtonPress={handleAddToCartPress} />
      </CustomContainer>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.black,
    lineHeight: 36,
    letterSpacing: 0.2,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterItemText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  productOverviewImage: {
    height: 285,
    width: 247,
    resizeMode: 'contain',
  },
  reviewTitleText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  reviewerProfileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  reviewTimeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.darkGrey,
    lineHeight: 15,
    letterSpacing: 0.2,
  },
  commentText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 22,
    letterSpacing: 0.2
  },
  descriptionContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  ratingIcon: {
    height: 16,
    width: 16,
  },
  underline: {
    height: 3,
    width: 24,
    backgroundColor: colors.primary,
    // marginTop: 10,
    position: 'absolute',
    bottom: 0,
  },
});
