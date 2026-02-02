import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#e8f4f8",
    100: "#c5e2ec",
    200: "#9fcfdf",
    300: "#7abdd2",
    400: "#5aafc8",
    500: "#3da1be",
    600: "#2d8fa8",
    700: "#1e7d92",
    800: "#126b7c",
    900: "#0a5966",
  },
  surface: {
    bg: "#0f1012",
    card: "#16171b",
    border: "#25262c",
    muted: "#2b2c33",
  },
  text: {
    primary: "#f0f1f3",
    secondary: "#9ca3af",
    muted: "#6b7280",
  },
};

const fonts = {
  heading: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace",
};

const styles = {
  global: {
    "html, body": {
      bg: "surface.bg",
      color: "text.secondary",
      fontFamily: "body",
    },
    "&::-webkit-scrollbar": { w: "8px" },
    "&::-webkit-scrollbar-track": { bg: "surface.card" },
    "&::-webkit-scrollbar-thumb": { bg: "surface.border", borderRadius: "full" },
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "600",
      borderRadius: "lg",
    },
    variants: {
      solid: {
        bg: "brand.500",
        color: "white",
        _hover: { bg: "brand.600", _disabled: { bg: "brand.500" } },
      },
      outline: {
        borderColor: "surface.border",
        color: "text.primary",
        _hover: { bg: "surface.muted", borderColor: "surface.border" },
      },
      ghost: {
        _hover: { bg: "surface.muted" },
      },
    },
    defaultProps: {
      colorScheme: "brand",
      variant: "solid",
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: "surface.card",
          border: "1px solid",
          borderColor: "surface.border",
          _hover: { borderColor: "surface.muted" },
          _focus: { borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" },
        },
      },
    },
    defaultProps: {
      variant: "filled",
      size: "lg",
    },
  },
  Link: {
    baseStyle: {
      _hover: { textDecoration: "none", color: "brand.400" },
    },
  },
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors,
  fonts,
  styles,
  components,
  config,
  radii: { lg: "12px", xl: "16px" },
});
