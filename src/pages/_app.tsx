import '../styles/global.scss'
import ThemeContainer from "../contexts/theme/ThemeContainer"

import Header from '../components/Header'
import Player from '../components/Player'
import { Box, Flex } from '@chakra-ui/layout'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <Flex as='div'

      >
        <Box as='main'
          flex='1'
        >
          <Header />
          <Component {...pageProps} />
        </Box>

        <Player />
      </Flex>
    </ThemeContainer>
  )
}

export default MyApp
