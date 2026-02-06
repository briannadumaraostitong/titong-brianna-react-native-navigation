// src/screens/ProductDetail/ProductDetailScreen.tsx
import React from 'react';
import { View, Text, Image, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as any; // ← Fix: Add 'as any' here
  const { addToCart } = useCart();
  const { colors } = useTheme();

  const formatCurrency = (amount: number): string => {
    return `₱${Number(amount).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <Image
        source={{ uri: product.image }}
        style={{ width: '100%', height: 300, marginBottom: 16 }}
        resizeMode="contain"
      />

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 8 }}>
          {product.name}
        </Text>
        <Text style={{ fontSize: 22, fontWeight: '600', color: colors.text, marginBottom: 16 }}>
          {formatCurrency(product.price)}
        </Text>

        <Text style={{ fontSize: 16, lineHeight: 24, color: colors.textMuted, marginBottom: 24 }}>
          {product.description || 'No description available.'}
        </Text>

        <Pressable
          style={({ pressed }) => [
            {
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: 'center',
              backgroundColor: colors.primary,
              opacity: pressed ? 0.85 : 1,
            }
          ]}
          onPress={() => {
            addToCart(product);
            Alert.alert('Success', `${product.name} added to cart!`);
            navigation.goBack();
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Add to Cart
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}