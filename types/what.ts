// src/types/index.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Colors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryDark: string;
}

export interface NavigationTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}
