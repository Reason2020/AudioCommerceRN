import React from 'react';

import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { store } from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SearchScreen from './src/screens/SearchScreen';
import CustomContainer from './src/components/CustomContainer';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});

export default App;
