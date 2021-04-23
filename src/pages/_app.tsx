import '../styles/global.scss'
import ThemeContainer from "../contexts/theme/ThemeContainer"
import { PlayerContextProvider } from "../contexts/PlayerContext"

import Header from '../components/Header'
import Player from '../components/Player'
import { Box, Flex } from '@chakra-ui/layout'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <PlayerContextProvider>
        <Flex as='div'>
          <Box as='main'
            flex='1'
          >
            <Header />
            <Component {...pageProps} />
          </Box>
          <Player />
        </Flex>
      </PlayerContextProvider>
    </ThemeContainer>
  )
}

export default MyApp
