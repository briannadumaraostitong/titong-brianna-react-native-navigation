// src/screens/CheckoutScreen/CheckoutScreen.tsx
import React from 'react';
import { View, Text, Button, FlatList, Alert, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import ProductItem from '../../components/ProductItem';
import { getStyles } from './CheckoutScreen.styles';

// Define CartItem interface here
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity: number;
}

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const total = getTotalPrice();
  const styles = getStyles(colors, insets);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { fontFamily: undefined },
    });
  }, [navigation]);

  const handleCheckout = () => {
    Alert.alert(
      'Checkout Successful',
      'Thank you for your purchase!',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => <ProductItem product={item} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Order Summary</Text>

        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No items to checkout
            </Text>
          }
          contentContainerStyle={styles.listContent}
        />

        {cartItems.length > 0 && (
          <View style={styles.bottomSection}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
              <Text style={[styles.totalAmount, { color: colors.text }]}>
                ₱{parseFloat(total).toLocaleString('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
            <Button
              title="Checkout"
              onPress={handleCheckout}
              color={colors.primary}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}