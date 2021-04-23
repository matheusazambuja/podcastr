import '../styles/global.scss'
import ThemeContainer from "../contexts/theme/ThemeContainer"

import Header from '../components/Header'
import Player from '../components/Player'
import { Box, Flex } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <ThemeContainer>
      <PlayerContext.Provider value={{
        episodeList,
        currentEpisodeIndex,
        play,
        togglePlay,
        setPlayingState,
        isPlaying
      }}>
        <Flex as='div'>
          <Box as='main'
            flex='1'
          >
            <Header />
            <Component {...pageProps} />
          </Box>
          <Player />
        </Flex>
      </PlayerContext.Provider>
    </ThemeContainer>
  )
}

export default MyApp
