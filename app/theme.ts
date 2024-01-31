// theme.js
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#161615'
      }
    }
  },
  colors: {
    light: {
      // Define light mode colors here
      background: '#ffffff',
      text: '#000000',
    },
    dark: {
      // Define dark mode colors here
      background: '#09090B',
      text: '#ffffff',
    },
  },
});

export default theme;
