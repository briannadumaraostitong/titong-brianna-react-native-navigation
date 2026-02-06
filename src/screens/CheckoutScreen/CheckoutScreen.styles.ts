// src/screens/CheckoutScreen/CheckoutScreen.styles.ts
import { StyleSheet, Platform } from 'react-native';

interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

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

export function getStyles(colors: Colors, insets: EdgeInsets) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 16,
      textAlign: 'center',
    },
    listContent: {
      paddingBottom: 120,
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      marginTop: 60,
      opacity: 0.7,
    },
    bottomSection: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingBottom: insets.bottom + 20,
      marginBottom: Platform.OS === 'android' ? 8 : 0,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: '600',
    },
    totalAmount: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
}