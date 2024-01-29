// theme.js
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    light: {
      // Define light mode colors here
      background: '#ffffff',
      text: '#000000',
    },
    dark: {
      // Define dark mode colors here
      background: '#1a1a1a',
      text: '#ffffff',
    },
  },
});

export default theme;
