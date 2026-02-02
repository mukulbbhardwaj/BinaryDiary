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

const fontSizes = {
  "2xs": "0.6875rem",
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
};

const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "card": "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
  "card-hover": "0 4px 12px -2px rgb(0 0 0 / 0.12), 0 2px 6px -2px rgb(0 0 0 / 0.08)",
};

const styles = {
  global: {
    "html, body": {
      bg: "surface.bg",
      color: "text.secondary",
      fontFamily: "body",
      lineHeight: "1.6",
    },
    "&::-webkit-scrollbar": { w: "10px" },
    "&::-webkit-scrollbar-track": { bg: "surface.card" },
    "&::-webkit-scrollbar-thumb": { bg: "surface.border", borderRadius: "full" },
    "&::-webkit-scrollbar-thumb:hover": { bg: "surface.muted" },
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "600",
      borderRadius: "lg",
      _focusVisible: { boxShadow: "0 0 0 2px var(--chakra-colors-brand-500)" },
    },
    sizes: {
      md: { h: "10", px: "4", fontSize: "sm" },
      lg: { h: "12", px: "6", fontSize: "md" },
    },
    variants: {
      solid: {
        bg: "brand.500",
        color: "white",
        _hover: { bg: "brand.600", _disabled: { bg: "brand.500", opacity: 0.6 } },
        _active: { bg: "brand.700" },
      },
      outline: {
        borderWidth: "1px",
        borderColor: "surface.border",
        color: "text.primary",
        _hover: { bg: "surface.muted", borderColor: "surface.border" },
        _active: { bg: "surface.border" },
      },
      ghost: {
        _hover: { bg: "surface.muted" },
        _active: { bg: "surface.border" },
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
          borderRadius: "lg",
          _hover: { borderColor: "surface.muted" },
          _focus: {
            borderColor: "brand.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
            bg: "surface.card",
          },
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
      _focusVisible: { boxShadow: "0 0 0 2px var(--chakra-colors-brand-500)", borderRadius: "4px" },
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        borderRadius: "xl",
        boxShadow: "xl",
        border: "1px solid",
        borderColor: "surface.border",
      },
      header: {
        fontWeight: "600",
        fontSize: "lg",
      },
      body: {
        py: 6,
      },
      footer: {
        borderTop: "1px solid",
        borderColor: "surface.border",
        pt: 4,
        gap: 3,
      },
    },
  },
  Alert: {
    variants: {
      subtle: (props) => ({
        container: {
          borderRadius: "lg",
          border: "1px solid",
          borderColor: props.status === "error" ? "red.500" : "surface.border",
        },
      }),
    },
  },
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const semanticTokens = {
  colors: {
    "surface.bg": {
      default: "#0f1012",
      _light: "#f8f9fb",
    },
    "surface.card": {
      default: "#16171b",
      _light: "#ffffff",
    },
    "surface.border": {
      default: "#25262c",
      _light: "#e5e7eb",
    },
    "surface.muted": {
      default: "#2b2c33",
      _light: "#f3f4f6",
    },
    "text.primary": {
      default: "#f0f1f3",
      _light: "#111827",
    },
    "text.secondary": {
      default: "#9ca3af",
      _light: "#4b5563",
    },
    "text.muted": {
      default: "#6b7280",
      _light: "#6b7280",
    },
  },
};

export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  styles,
  components,
  config,
  semanticTokens,
  shadows,
  radii: {
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
  },
  space: {
    18: "4.5rem",
    22: "5.5rem",
    30: "7.5rem",
  },
});
