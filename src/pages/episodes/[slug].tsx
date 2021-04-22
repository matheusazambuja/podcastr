import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image as ImageChakra } from '@chakra-ui/image';

import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import Link from 'next/link';
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

// Pode ser feito com type ou interface
type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type EpisodesProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodesProps) {
  return (
    <Box as='div'
      maxWidth='45rem'
      padding='3rem 2rem'
      margin='0 auto'
    >
      <Box as='div'
        position='relative'
      >
        <Link href='/'>
          <Button type='button'
            width='3rem'
            height='3rem'
            borderRadius='0.75rem'
            border='0'
            position='absolute'
            zIndex='5'
            fontSize='0'

            left='0'
            top='50%'
            background='purple.500'

            transform='translate(-50%, -50%)'
            transition='filter 200ms'

            _hover={{
              filter: 'brightness(0.9)'
            }}
          >
            <ImageChakra src='/arrow-left.svg' alt='Voltar'
              borderRadius='1rem'
            />
          </Button>
        </Link>

        <Box as='div'
          borderRadius='1rem'
        >
          <Image src={episode.thumbnail} alt={episode.title}
            width={700}
            height={160}
            objectFit='cover'
          />
        </Box>

        <Button type='button'
          width='3rem'
          height='3rem'
          borderRadius='0.75rem'
          border='0'
          position='absolute'
          zIndex='5'
          fontSize='0'

          right='0'
          top='50%'
          background='green.500'

          transform='translate(50%, -50%)'
          transition='filter 200ms'

          _hover={{
            filter: 'brightness(0.9)'
          }}
        >
          <ImageChakra src='/play.svg' alt='Tocar episódio'
            maxWidth='2.4rem'
            borderRadius='1rem'
          />
        </Button>
      </Box>

      <Box as='header'
        paddingBottom='1rem'
        borderBottom='1px solid'
        borderBottomColor='gray.100'
      >
        <Box as='h1'
          marginTop='2rem'
          marginBottom='1.5rem'
        >
          {episode.title}
        </Box>
        <Box as='span'>
          {episode.members}
        </Box>
        <Box as='span'
          marginLeft='1rem'
          paddingLeft='1rem'
          position='relative'

          _before={{
            content: '""',
            width: '4px',
            height: '4px',
            borderRadius: '2px',
            background: '#DDDDDD',
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {episode.publishedAt}
        </Box>
        <Box as='span'
          marginLeft='1rem'
          paddingLeft='1rem'
          position='relative'

          _before={{
            content: '""',
            width: '4px',
            height: '4px',
            borderRadius: '2px',
            background: '#DDDDDD',
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {episode.durationAsString}
        </Box>
      </Box>

      <Box as='div'
        dangerouslySetInnerHTML={{ __html: episode.description}}
        marginTop='2rem'
        lineHeight='1.675rem'
        color='gray.800'
      />

    </Box>
  )
}

// Necessário para páginas estáticas dinâmicas, ou seja,
// páginas com getStaticProps: que recarregando seus dados somente
// algumas vezes por dia e dinâmicas: que possui o conchetes em seu nome.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(
      parseISO(data.published_at), 'd MMM yy', { locale: ptBR }
    ),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(
      Number(data.file.duration)
    ),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}