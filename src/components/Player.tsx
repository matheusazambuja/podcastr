import React, { CSSProperties, useContext, useEffect, useRef } from "react";
import Image from 'next/image';

import { PlayerContext } from "../contexts/PlayerContext";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

import { Button } from "@chakra-ui/button";
import { Image as ImageChakra } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex];

  const styleProgressBooleanPlay = !episode ? { opacity: 0.5 } : {}
  const styleButtonBoolean = !episode ? {
    cursor: 'default',
    opacity: 0.5,
    _hover: {}
  } : {
    _hover: {
      filter: 'brightness(0.7)'
    },
  }

  const styleSlider: CSSProperties = {
    padding: 0
  }

  return (
    <Flex as='div'
      direction='column'
      alignItems='center'
      justifyContent='space-between'

      width='26.5rem'
      height='100vh'

      padding='3rem 4rem'
      background='purple.500'
      color='white'

    >
      <Flex as='header'
        alignItems='center'
      >
        <ImageChakra src='/playing.svg' alt='Tocando agora' />
        <Text as='strong'
          fontFamily='Lexend, sans-serif'
          fontWeight='600'
        >
          Tocando agora
        </Text>
      </Flex>

      { episode ? (
        <Box as='div'
          textAlign='center'
        >
          <Box as='div'
            borderRadius='1.5rem'
          >
            <Image 
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />
          </Box>
          <Text as='strong'
            display='block'
            marginTop='2rem'
            fontWeight='600'
            fontSize='1.25rem'
            fontFamily='Lexend, sans-serif'
            lineHeight='1.25rem'
          >
            {episode.title}
          </Text>
          <Text as='span'
            display='block'
            marginTop='1rem'
            opacity='0.6'
            lineHeight='1.5rem'
          >
            {episode.members}
          </Text>
        </Box>
      ) : (
        <Box as='div'>
          <Text as='strong'
            width='100%'
            height='20rem'
            border='1.5px dashed'
            borderColor='purple.300'
            borderRadius='1.5rem'
            background='linear-gradient(143.8deg, rgba(145, 100, 258, 0.8) 0%, rgba(0, 0, 0, 0) 100%)'

            padding='4rem'
            textAlign='center'

            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Selecione um podcast para ouvir
          </Text>
        </Box>
      ) }

      <Box as='footer'
        alignSelf='stretch'
      >
        <Flex as='div'
          alignItems='center'
          fontSize='0.875rem'

          {...styleProgressBooleanPlay}
        >
          <Text as='span'
            display='inline-block'
            width='4rem'
            textAlign='center'
          >00:00</Text>
          <Box as='div'
            flex='1'
            height='4px'
            width='100%'

            background='purple.300'
            borderRadius='2px'
          >
            { episode ? (
              <Slider style={styleSlider}
                trackStyle={{ backgroundColor: '#04D361' }}
                railStyle={{ backgroundColor: '#9F75FF' }}
                handleStyle={{ borderColor: '#04D361', borderWidth: 4 }}
              />
            ) : (
              <Box as='div'></Box>
            )}
          </Box>
          <Text as='span'
            display='inline-block'
            width='4rem'
            textAlign='center'
          >00:00</Text>
        </Flex>

        { episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        ) }

        <Flex as='div'
          alignItems='center'
          justifyContent='center'
          marginTop='2.5rem'
        >
          <Button type='button' disabled={!episode}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
          >
            <ImageChakra src='/shuffle.svg' alt='Embaralhar' />
          </Button>
          <Button type='button' disabled={!episode}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
          >
            <ImageChakra src='/play-previous.svg' alt='Tocar anterior' />
          </Button>
          <Button type='button' disabled={!episode} onClick={togglePlay}
            border='0'
            fontSize='0'

            height='4rem'
            width='4rem'
            borderRadius='1rem'
            background='purple.400'

            transition='filter 200ms'

            {...styleButtonBoolean}

            _hover={{
              filter: 'brightness(0.95)'
            }}
          >
            { isPlaying ? (
              <ImageChakra src='/pause.svg' alt='Tocar' />
            ) : (
              <ImageChakra src='/play.svg' alt='Tocar' />
            )}
          </Button>
          <Button type='button' disabled={!episode}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
          >
            <ImageChakra src='/play-next.svg' alt='Tocar próxima' />
          </Button>
          <Button type='button' disabled={!episode}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
          >
            <ImageChakra src='/repeat.svg' alt='Repetir' />
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}