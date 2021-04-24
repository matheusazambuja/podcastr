import '../styles/global.scss'
import ThemeContainer from "../contexts/theme/ThemeContainer"
import { PlayerContextProvider } from "../contexts/PlayerContext"

import Header from '../components/Header'
import Player from '../components/Player'
import { Box, Flex } from '@chakra-ui/layout'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useColorModeValue } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  library.add(
    faMoon, faSun,
  )

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
