import React, { CSSProperties, useContext, useEffect, useState } from "react";
import Image from 'next/image';

import { PlayerContext } from "../contexts/PlayerContext";

import Cookies from 'js-cookie';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

import { Button } from "@chakra-ui/button";
import { Image as ImageChakra } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { ButtonProps, useMediaQuery } from "@chakra-ui/react";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import ReactAudioPlayer from "react-audio-player";

export default function Player() {
  const [progress, setProgress] = useState(0.0);
  const [player, setPlayer] = useState(null);

  const [isLargerThan1450] = useMediaQuery('(min-width: 1450px)');

  const {
    episodeList,
    currentEpisodeIndex,
    toggleLoop,
    togglePlay,
    toggleShuffle,
    isLooping,
    isPlaying,
    isShuffling,
    playNext,
    playPrevious,
    setPlayingState,
    hasNext,
    hasPrevious,
    clearPlayerState
  } = useContext(PlayerContext);


  useEffect(() => {
    if (!player) {
      return;
    }

    if (isPlaying) {
      player.audioEl.current.play();
    } else {
      player.audioEl.current.pause();
    }
  }, [isPlaying])

  function setupProgressListener() {
    const { currentTimeEpisode } = Cookies.getJSON('dataEpisodeCurrent')

    setProgress(currentTimeEpisode)
    player.audioEl.current.currentTime = currentTimeEpisode

    player.audioEl.current.addEventListener('timeupdate', () => {
      if (!player.audioEl.current) {
        return;
      }

      setProgress(player.audioEl.current.currentTime);
      Cookies.set('dataEpisodeCurrent', JSON.stringify({
        currentTimeEpisode: player.audioEl.current.currentTime
      }))
    })
  }

  function handleSeek(amount: number) {
    player.audioEl.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  const episode = episodeList[currentEpisodeIndex];

  const styleProgressBooleanPlay = !episode ? { opacity: 0.5 } : {}
  const styleButtonBoolean: ButtonProps = {
    _disabled: {
      opacity: 0.5,
      _hover: {
        cursor: 'default'
      },
      _active: {}
    },
    _hover: {},
  }

  const stylePlayingNow = episode ? {} : {
    opacity: 0.5,
    marginBottom: '3.5rem'
  }

  const styleButtonRepeatActive: ButtonProps = isLooping ? {
    filter: 'invert(0.35) sepia(1) saturate(3) hue-rotate(100deg)',
    _hover: {
      filter: 'brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(100deg)'
    }
  } : {}

  const styleButtonShuffleActive: ButtonProps = isShuffling ? {
    filter: 'invert(0.35) sepia(1) saturate(3) hue-rotate(100deg)',
    _hover: {
      filter: 'brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(100deg)'
    }
  } : {}

  const styleSlider: CSSProperties = {
    padding: '0'
  }

  const playerWhenLargerThan1450 = (
    <Flex as='div' id='player'
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
        {...stylePlayingNow}
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

            marginRight='0.5rem'
            textAlign='center'
          >
            {convertDurationToTimeString(Math.floor(progress))}
          </Text>
          <Box as='div'
            flex='1'
            height='4px'
            width='100%'

            background='purple.300'
            borderRadius='2px'
          >
            { episode ? (
              <Slider style={styleSlider}
                max={episode.duration}
                value={Math.floor(progress)}
                onChange={handleSeek}
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

            marginLeft='0.5rem'
            textAlign='center'
          >
            {convertDurationToTimeString(episode?.duration ?? 0)}
          </Text>
        </Flex>

        { episode && (
          <ReactAudioPlayer
            ref={c => (setPlayer(c))}
            src={episode.url}
            loop={isLooping}
            autoPlay={isPlaying}
            onEnded={handleEpisodeEnded}
            onPlay={() => {setPlayingState(true)}}
            onPause={() => {setPlayingState(false)}}
            onLoadedMetadata={setupProgressListener}
          />
        ) }

        <Flex as='div'
          alignItems='center'
          justifyContent='center'
          marginTop='2.5rem'
          fontSize={{ base: '70%', md: '40%' }}
        >
          <Button type='button' onClick={toggleShuffle}
            disabled={!episode || episodeList.length === 1}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
            {...styleButtonShuffleActive}
          >
            <ImageChakra src='/shuffle.svg' alt='Embaralhar' />
          </Button>
          <Button type='button' onClick={playPrevious}
            disabled={!episode || !hasPrevious}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
          >
            <ImageChakra src='/play-previous.svg' alt='Tocar anterior' />
          </Button>
          <Button type='button' onClick={togglePlay}
            disabled={!episode}
            border='0'
            fontSize='0'

            height='4rem'
            width='4rem'
            borderRadius='1rem'
            background='purple.400'

            transition='filter 200ms'

            _hover={{
              filter: 'brightness(0.95)'
            }}

            {...styleButtonBoolean}
          >
            { isPlaying ? (
              <ImageChakra src='/pause.svg' alt='Tocar' />
            ) : (
              <ImageChakra src='/play.svg' alt='Tocar' />
            )}
          </Button>
          <Button type='button' onClick={playNext}
            disabled={!episode || !hasNext}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
          >
            <ImageChakra src='/play-next.svg' alt='Tocar próxima' />
          </Button>
          <Button type='button' onClick={toggleLoop}
            disabled={!episode}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
            {...styleButtonRepeatActive}
          >
            <ImageChakra src='/repeat.svg' alt='Repetir' />
          </Button>
        </Flex>
      </Box>
    </Flex>
  )

  const playerWhenSmallerThan1450 = (
    <Flex as='div' id='player'
      alignItems='center'
      justifyContent='flex-start'

      width='calc(100vw - 1.35rem)'
      height='20rem'

      padding='3rem 2rem'
      background='purple.500'
      color='white'
    >
      <Flex as='header'
        direction='column'
        justifyContent='flex-start'
      >
        { episode ? (
          <Flex
            alignItems='center'
            width='13rem'
            height='15rem'
            margin='0 1.8rem'
          >
            <Image 
              width={256}
              height={272}
              src={episode.thumbnail}
              objectFit="cover"
            />
          </Flex>
        ) : (
          <Box as='div'>
            <Text as='strong'
              width='15rem'
              height= '16rem'
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
      </Flex>

      <Box as='footer'
        textAlign='center'
        margin='3rem auto'
        width='60%'
      >
        <Flex as='header'
          alignItems='center'
          justifyContent='center'
          marginRight='2rem'

          {...stylePlayingNow}
        >
          <ImageChakra src='/playing.svg' alt='Tocando agora' />
          <Text as='strong'
            fontFamily='Lexend, sans-serif'
            fontWeight='600'
          >
            Tocando agora
          </Text>
        </Flex>
        {episode && (
          <>
            <Text as='strong'
              display='block'
              marginTop='2.5rem'
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
          </>
        )}
        <Flex as='div'
          alignItems='center'
          fontSize='0.875rem'
          paddingTop='1.5rem'

          {...styleProgressBooleanPlay}
        >
          <Text as='span'
            display='inline-block'
            width='4rem'

            marginRight='0.5rem'
            textAlign='center'
          >
            {convertDurationToTimeString(Math.floor(progress))}
          </Text>
          <Box as='div'
            flex='1'
            height='4px'
            width='100%'
            background='purple.300'
            borderRadius='2px'
          >
            { episode ? (
              <Slider style={styleSlider}
                max={episode.duration}
                value={Math.floor(progress)}
                onChange={handleSeek}
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

            marginLeft='0.5rem'
            textAlign='center'
          >
            {convertDurationToTimeString(episode?.duration ?? 0)}
          </Text>
        </Flex>

        { episode && (
          <ReactAudioPlayer
            ref={c => (setPlayer(c))}
            src={episode.url}
            loop={isLooping}
            autoPlay={isPlaying}
            onEnded={handleEpisodeEnded}
            onPlay={() => {setPlayingState(true)}}
            onPause={() => {setPlayingState(false)}}
            onLoadedMetadata={setupProgressListener}
          />
        ) }

        <Flex as='div'
          alignItems='center'
          justifyContent='center'
          marginTop='1rem'
        >
          <Button type='button' onClick={toggleShuffle}
            disabled={!episode || episodeList.length === 1}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
            {...styleButtonShuffleActive}
          >
            <ImageChakra src='/shuffle.svg' alt='Embaralhar' />
          </Button>
          <Button type='button' onClick={playPrevious}
            disabled={!episode || !hasPrevious}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
          >
            <ImageChakra src='/play-previous.svg' alt='Tocar anterior' />
          </Button>
          <Button type='button' onClick={togglePlay}
            disabled={!episode}
            border='0'
            fontSize='0'

            height='4rem'
            width='4rem'
            borderRadius='1rem'
            background='purple.400'

            transition='filter 200ms'

            _hover={{
              filter: 'brightness(0.95)'
            }}

            {...styleButtonBoolean}
          >
            { isPlaying ? (
              <ImageChakra src='/pause.svg' alt='Tocar' />
            ) : (
              <ImageChakra src='/play.svg' alt='Tocar' />
            )}
          </Button>
          <Button type='button' onClick={playNext}
            disabled={!episode || !hasNext}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
          >
            <ImageChakra src='/play-next.svg' alt='Tocar próxima' />
          </Button>
          <Button type='button' onClick={toggleLoop}
            disabled={!episode}
            background='transparent'
            border='0'
            fontSize='0'

            transition='filter 200ms'

            {...styleButtonBoolean}
            {...styleButtonRepeatActive}
          >
            <ImageChakra src='/repeat.svg' alt='Repetir' />
          </Button>
        </Flex>
      </Box>
    </Flex>
  )

  return (
    isLargerThan1450 ? 
      playerWhenLargerThan1450 : playerWhenSmallerThan1450
  )
}