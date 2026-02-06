// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './src/contexts/CartContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import CartScreen from './src/screens/CartScreen/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen/CheckoutScreen';  // ← Should start with ./src/
import ProductDetailScreen from './src/screens/ProductDetail/ProductDetailScreen';
import { Product } from './types/what';

type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
  ProductDetail: { product: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  const { navigationTheme } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}