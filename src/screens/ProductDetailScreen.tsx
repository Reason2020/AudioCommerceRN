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
  Button,
  ToastAndroid,
  View,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Images from '../../images';
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
import { CartItemsListType, addItemToCart } from '../redux/reducers/cartSlice';
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
      <Pressable
        onPress={() => setActiveFilterItem(filterItem)}
        style={[
          styles.filterButton,
          {
            borderBottomColor: activeFilterItem === filterItem ? colors.primary : colors.white,
            borderBottomWidth: 2,
          },
        ]}
      >
        <Text style={styles.filterItemText}>{filterItem}</Text>
      </Pressable>
    );
  };

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<AntDesign name="star" size={20} color={colors.accent} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<AntDesign name="staro" size={20} color={colors.accent} />);
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
      ToastAndroid.showWithGravity(
        'Item already exists in cart',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  if (loadingProduct || loadingAllProducts) {
    return <ActivityIndicator size={'large'} color={colors.accent} />;
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
              <Text style={styles.reviewTitleText}>Review ({reviews.length})</Text>
              {reviews.map((review, index) => {
                return (
                  // Review Card Container
                  <CustomContainer row alignItems="flex-start" vMargin={10} key={index}>
                    <Image source={Images.UserProfile} style={styles.reviewerProfileImage} />

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
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.black,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  filterItemText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
  productOverviewImage: {
    height: Dimensions.get('screen').height * 0.5,
    width: '100%',
    resizeMode: 'contain',
  },
  reviewTitleText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
  reviewerProfileImage: {
    height: Dimensions.get('screen').width * 0.14,
    width: Dimensions.get('screen').width * 0.14,
    borderRadius: Dimensions.get('screen').width * 0.07,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
  reviewTimeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.darkGrey,
  },
  commentText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  descriptionContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
