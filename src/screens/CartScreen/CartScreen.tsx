// src/screens/CartScreen/CartScreen.tsx
import React from 'react';
import { View, Text, Button, FlatList, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import ProductItem from '../../components/ProductItem';
import { getStyles } from './CartScreen.styles';

// Define CartItem interface here
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity: number;
}

const formatCurrency = (amount: number): string => {
  return `₱${Number(amount).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { cartItems, updateQuantity, getTotalPrice } = useCart();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const total = getTotalPrice();
  const styles = getStyles(colors, insets);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { fontFamily: undefined },
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: CartItem }) => (
    <ProductItem product={item} onQuantityChange={updateQuantity} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Your Cart</Text>

        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: colors.text }]}>
              Your cart is empty
            </Text>
          }
          contentContainerStyle={styles.listContent}
        />

        {cartItems.length > 0 && (
          <View style={styles.bottomSection}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
              <Text style={[styles.totalAmount, { color: colors.text }]}>
                {formatCurrency(parseFloat(total))}
              </Text>
            </View>
            <Button
              title="Go to Checkout"
              onPress={() => navigation.navigate('Checkout')}
              color={colors.primary}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}