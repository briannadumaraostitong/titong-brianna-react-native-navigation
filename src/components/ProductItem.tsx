// src/components/ProductItem.tsx
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { styles } from './ProductItem.styles';
import { Product } from '../../types/what';

interface ProductItemProps {
  product: Product;
  onAddToCart?: () => void;
  onQuantityChange?: (id: number, delta: number) => void;
}

export default function ProductItem({ product, onAddToCart, onQuantityChange }: ProductItemProps) {
  const { colors } = useTheme();

  const formatCurrency = (amount: number): string => {
    return `₱${Number(amount).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.name, 
      { color: colors.text }]}
      numberOfLines={2}
      ellipsizeMode="tail"
      >{product.name}
      </Text>
      <Text style={[styles.price, { color: colors.text }]}>
        {formatCurrency(product.price)}
        {product.quantity ? ` × ${product.quantity}` : ''}
      </Text>

      {onAddToCart && (
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            { backgroundColor: colors.primary },
            pressed && { opacity: 0.85 }
          ]}
          onPress={onAddToCart}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </Pressable>
      )}

      {onQuantityChange && (
        <View style={styles.quantityContainer}>
          <Pressable onPress={() => onQuantityChange(product.id, -1)}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
          <Text style={[styles.quantity, { color: colors.text }]}>{product.quantity}</Text>
          <Pressable onPress={() => onQuantityChange(product.id, 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}