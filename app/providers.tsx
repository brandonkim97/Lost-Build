'use client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import theme from './theme';

export function ThemeProvider({ 
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider  {...props}>
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'bottom'} }}>
        {children}
      </ChakraProvider>
    </NextThemesProvider>
  )
}