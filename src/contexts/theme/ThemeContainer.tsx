import React, { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager
} from '@chakra-ui/react'

import theme from '../../styles/theme'

interface ThemeContainerProps {
  children: ReactNode,
  cookies: string
}

export default function ThemeContainer({ children, cookies }: ThemeContainerProps) {
  const colorModeManager = 
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      cookies: ctx.req.headers.cookie ?? '',
    }
  }
}