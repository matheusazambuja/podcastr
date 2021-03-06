import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Link from 'next/link';
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image as ImageChakra } from '@chakra-ui/image';
import { useColorModeValue } from "@chakra-ui/color-mode";

import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { usePlayer } from "../../contexts/PlayerContext";

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
  const {
    play
  } = usePlayer();

  const backgroundEpisodeColorMode = useColorModeValue('', 'gray.830')
  const colorTitleEpisodeColorMode = useColorModeValue('gray.700', 'whiteAlpha.900')
  const colorInfosEpisodeColorMode = useColorModeValue('gray.200', 'gray.200')

  return (
    <Flex as='div'
      flexDirection='column'
      alignItems='center'
      height='calc(100vh - 6.5rem)'
      width='100%'
      padding='4rem 19rem'
      background={backgroundEpisodeColorMode}
    >
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
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

        <Button type='button' onClick={() => play(episode)}
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
          <ImageChakra src='/play.svg' alt='Tocar epis??dio'
            maxWidth='2.4rem'
            borderRadius='1rem'
          />
        </Button>
      </Box>

      <Box as='header'
        paddingBottom='1rem'
        borderBottom='1px solid'
        borderBottomColor='gray.100'

        color={colorInfosEpisodeColorMode}
      >
        <Box as='h1'
          marginTop='2rem'
          marginBottom='1.5rem'

          color={colorTitleEpisodeColorMode}
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
        color={colorInfosEpisodeColorMode}
      />

    </Flex>
  )
}

// Verifica se a p??gina est?? em carregamento
// const router = useRouter()

// // Se a p??gina estiver em carregamento
// if (router.isFallback) {
//   return <p>Carregando...</p>
// }

// Necess??rio para p??ginas est??ticas din??micas, ou seja,
// p??ginas com getStaticProps: que recarregando seus dados somente
// algumas vezes ao dia e que possui par??metros din??micos (possui 
// conchetes no nome)

// Passando 'paths' vazio, nenhuma p??gina est??tica dos epis??dios
// ser?? gerada.

// Caso algum funcionamento n??o executar como deveria, talvez a p??gina esteja 
// em cache dentro do next por j?? termos acessado antes. ?? preciso apagar esse
// cache para ver seu funcionamento corretamente.
// (N??o fa??o ideia de aonde fica isso para excluir :p)

// Agora, se tivermos 'fallback': false, quando um usu??rio entrar 
// em uma p??gina que n??o foi gerada estaticamento no momento da build,
// (n??o foi passado dentro dos paths) retornar?? '404', ou seja, n??o encontrado
//                      Client (browser)
// Se 'fallback': true, os dados da p??gina ser??o carregados somente quando o 
// usu??rio acessar elas.
//                      Next.JS (NodeJS)
// Se 'fallback': 'blocking', os dados ser??o buscados na camada intermedi??ria,
// no NodeJS, para melhorar desempenho e indexa????o da p??gina. Podemos gerar 
// algumas p??ginas est??ticas, como as mais acessadas, por exemplo, e as outras 
// buscando seus dados quando acessadas. Entretanto, uma fez carregada seus dados 
// uma p??gina est??tica ?? gerada para os pr??ximos acessos.

// Passando o 'slug', par??metro din??mico da p??gina.
// Gerando estaticamento uma p??gina din??mica.
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(episode => {
    return {
      params: {
        slug: episode.id
      }
    }
  })

  return {
    paths,
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