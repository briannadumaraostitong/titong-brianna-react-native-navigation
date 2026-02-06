// src/screens/HomeScreen/HomeScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text,
  TextInput, 
  Pressable,
  FlatList 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import ProductItem from '../../components/ProductItem';
import { getStyles } from './HomeScreen.styles';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity?: number;
}

const products: Product[] = [
  { 
    id: 1, 
    name: 'Audio-Technica AT2020', 
    price: 2695.00, 
    image: 'https://imgur.com/eNo0IAx.jpg',
    description: 'Audio Technica AT2020 is a popular capacitive microphone used by many musicians, podcasts, anchors, and recording engineers for studio and live recording applications.'
  },
  { 
    id: 2, 
    name: 'Sony WH-CH520 / WH CH520 Wireless Bluetooth Headphones', 
    price: 2299.00, 
    image: 'https://imgur.com/9stswNp.jpg',
    description: 'Enjoy high sound quality all day long. The WH-CH520 headphones with up to 50 hours of battery life, stable connectivity, and enhanced call performance, meet the demands of your day.'
  },
  { 
    id: 3, 
    name: 'Lovito Men Casual Sweatshirt', 
    price: 340.00, 
    image: 'https://imgur.com/gbs0bxj.jpg',
    description: 'This is a casual plus-size sweatshirt made from 95% polyester and 5% spandex. It features a regular fit with slight stretch, is not sheer, and has a simple plain style. It is manufactured in China.'
  },
  { 
    id: 4, 
    name: 'Remote/Touch Bedside Lamp LED Night Light', 
    price: 164.00, 
    image: 'https://imgur.com/rfYlGL4.jpg',
    description: 'LED Touch Bedside Lamp that has soft eye-protecting light that helps you fall asleep.'
  },
  { 
    id: 5, 
    name: 'Roblox Man Face Mug', 
    price: 325.00, 
    image: 'https://imgur.com/RQ8KlLF.jpg',
    description: 'This is a sparkling white ceramic mug with an 11oz (325ml) capacity, measuring 9.5cm tall and 8.2cm in diameter, featuring a high-quality, non-fading color print that is both dishwasher-safe and microwave-safe, with production starting quickly once our aunties return from their coffee break.'
  },
  { 
    id: 6, 
    name: 'Retro Y2K Star Baseball Cap Washed Denim Hole', 
    price: 198.00, 
    image: 'https://imgur.com/uxTIyYW.jpg',
    description: 'This retro Y2K-inspired star baseball cap is crafted from washed denim with distressed holes for a vintage, laid-back vibe.'
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { cartItems, addToCart } = useCart();
  const { colors, toggleTheme, isDark } = useTheme();

  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const styles = getStyles(colors, isDark);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={[
          styles.searchContainer,
          { 
            backgroundColor: isDark ? '#1e1f22' : '#f2f3f5',
            borderColor: colors.border 
          }
        ]}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search products..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.rightIcons}>
          <Pressable onPress={toggleTheme} style={styles.themeToggle}>
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={26} color={colors.text} />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Cart')}
            style={({ pressed }) => [styles.cartButton, pressed && { opacity: 0.7 }]}
          >
            <Ionicons name="cart-outline" size={26} color={colors.text} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            style={({ pressed }) => ({
              flex: 1,
              opacity: pressed ? 0.92 : 1,
              marginHorizontal: 4,
            })}
          >
            <ProductItem 
              product={item} 
              onAddToCart={() => addToCart(item)}
            />
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No products found
          </Text>
        }
      />
    </View>
  );
}