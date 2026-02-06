// src/screens/ProductDetail/ProductDetailScreen.styles.ts
import { StyleSheet } from 'react-native';

interface Colors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryDark: string;
}

export function getStyles(colors: Colors) {
  return StyleSheet.create({
    largeImage: {
      width: '100%',
      height: 300,
      marginBottom: 16,
    },
    infoContainer: {
      padding: 16,
    },
    name: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    price: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 24,
    },
    addButton: {
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
}