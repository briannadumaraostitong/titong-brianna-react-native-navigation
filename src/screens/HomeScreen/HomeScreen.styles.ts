// src/screens/HomeScreen/HomeScreen.styles.ts
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

export function getStyles(colors: Colors, isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 48,
      borderWidth: 1,
      marginRight: 12,
    },

    searchIcon: {
      marginRight: 8,
    },

    searchInput: {
      flex: 1,
      fontSize: 16,
    },

    rightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },

    themeToggle: {
      padding: 8,
      borderRadius: 50,
      backgroundColor: 'rgba(150,150,150,0.15)',
    },

    cartButton: {
      padding: 8,
      borderRadius: 20,
      position: 'relative',
    },

    badge: {
      position: 'absolute',
      right: -6,
      top: -6,
      backgroundColor: '#ff3b30',
      borderRadius: 12,
      minWidth: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
    },

    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },

    listContent: {
      padding: 8,
      paddingBottom: 40,
    },

    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      marginTop: 60,
      opacity: 0.6,
    },
  });
}