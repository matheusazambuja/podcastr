import '../styles/global.scss'
import ThemeContainer from "../contexts/theme/ThemeContainer"
import { PlayerContextProvider } from "../contexts/PlayerContext"

import Header from '../components/Header'
import Player from '../components/Player'
import { Box, Flex } from '@chakra-ui/layout'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useMediaQuery } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  library.add(
    faMoon, faSun,
  )

  const [isLargerThan1450] = useMediaQuery('(min-width: 1450px)')

  return (
    <ThemeContainer>
      <PlayerContextProvider>
        <Flex as='div'>
          <Box as='main'
            flex='1'
          >
            <Header />
            {!isLargerThan1450 && <Player />}
            <Component {...pageProps} />
          </Box>
          {isLargerThan1450 && <Player />}
        </Flex>
      </PlayerContextProvider>
    </ThemeContainer>
  )
}

export default MyApp
