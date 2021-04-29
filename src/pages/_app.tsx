import '../styles/global.scss'
import ThemeContainer from "../contexts/theme/ThemeContainer"
import { PlayerContextProvider } from "../contexts/PlayerContext"

import Header from '../components/Header'
import Player from '../components/Player'
import { Box, Flex, Grid } from '@chakra-ui/layout'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useMediaQuery } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  library.add(
    faMoon, faSun,
  )

  const [isLargerThan1450] = useMediaQuery('(min-width: 1450px)')

  return (
    <ThemeContainer cookies={pageProps.cookies}>
      <PlayerContextProvider>
        <Grid as='div'
          templateColumns={{ base: '1fr', xl2: '1.6fr 0.4fr' }}
          templateRows={{ base: '0.2fr 0.6fr 2.2fr', xl2: '0.2fr 1.8fr' }}
          templateAreas={{ base: `
            'header'
            'player'
            'content'
          `, xl2: `
            'header player'
            'content player'
          ` }}
        >
          <Header />
          <Component {...pageProps} />
          <Player />
        </Grid>
      </PlayerContextProvider>
    </ThemeContainer>
  )
}

export default MyApp
// re-export the reusable `getServerSideProps` function
export { getServerSideProps } from "../contexts/theme/ThemeContainer"