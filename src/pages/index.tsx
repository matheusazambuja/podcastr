import { useContext } from "react";
import { GetStaticProps } from "next"
import Image from 'next/image';
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { api } from "../services/api"
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import { PlayerContext } from "../contexts/PlayerContext";

import { Button } from "@chakra-ui/button"
import { Image as ImageChakra } from "@chakra-ui/image"
import { Box, Link as LinkChakra,ListItem, Text, UnorderedList } from "@chakra-ui/layout"
import { Table, TableCellProps, TableColumnHeaderProps, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

// Pode ser feito com type ou interface
type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

const styleTh: TableColumnHeaderProps = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid',
  borderColor: 'gray.100',
  color: 'gray.200',
  textTransform: 'uppercase',
  fontWeight: '500',
  fontSize: '0.75rem',
  fontFamily: 'Lexend, sans-serif',
  textAlign: 'left'
}

const styleTd: TableCellProps = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid',
  borderColor: 'gray.100',
  fontSize: '0.875rem'
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { play } = useContext(PlayerContext)

  return (
    <Box id='homepage' as='div'
      height='calc(100vh - 6.5rem)'
      padding='0 4rem'
      overflowY='scroll'
    >
      <Box id='latestEpisodes' as='section'>
        <Box as='h2'
          marginTop='3rem'
          marginBottom='1.5rem'
        >
          Últimos lançamentos
        </Box>

        <UnorderedList
          display='grid'
          gridTemplateColumns='repeat(2, 1fr)'
          gridGap='1.5rem'
          listStyle='none'
          >
          {latestEpisodes.map(episode => {
            return (
              <ListItem key={episode.id}
                position='relative'
                display='flex'
                alignItems='center'
                padding='1.25rem'

                background='white'
                border='1px solid'
                borderColor='gray.100'
                borderRadius='1.5rem'
              >
                <Box as='div'
                  width='6rem'
                  height='6rem'
                  borderRadius='1rem'
                >
                  <Image src={episode.thumbnail} alt={episode.title}
                    width={192}
                    height={192}
                    objectFit='cover'
                  />
                </Box>

                <Box id='episodeDetails' as='div'
                  flex='1'
                  marginLeft='1rem'
                >
                  <Link href={`/episodes/${episode.id}`}>
                    <LinkChakra as='div'
                      display='block'

                      color='gray.800'
                      fontFamily='Lexend, sans-serif'
                      fontWeight='600'
                      lineHeight='1.4rem'
                      textDecoration='none'
  
                      _hover={{
                        textDecoration: 'underline'
                      }}
                    >
                      {episode.title}
                    </LinkChakra>
                  </Link>
                  <Text as='p'
                    maxWidth='70%'
                    marginTop='0.5rem'

                    fontSize='0.875rem'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                  >
                    {episode.members}
                  </Text>
                  <Text as='span'
                    display='inline-block'
                    marginTop='0.5rem'
                    fontSize='0.875rem'
                  >
                    {episode.publishedAt}
                  </Text>
                  <Text as='span'
                    display='inline-block'
                    position='relative'
                    marginTop='0.5rem'
                    marginLeft='0.5rem'
                    paddingLeft='0.5rem'

                    fontSize='0.875rem'

                    _before={{
                      content: '""',
                      width: '4px',
                      height: '4px',
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      background: '#DDDDDD',
                      borderRadius: '2px',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {episode.durationAsString}
                  </Text>
                </Box>
                <Button type='button' onClick={() => play(episode)}
                  position='absolute'
                  right='2rem'
                  bottom='2rem'

                  
                  width='2.5rem'
                  height='2.5rem'

                  padding='0'

                  background='white'
                  border='1px solid'
                  borderColor='gray.100'
                  borderRadius='0.675rem'
                  fontSize='0'

                  transition='filter 200ms'

                  _hover={{
                    filter: 'brightness(0.95)'
                  }}
                >
                  <ImageChakra src='/play-green.svg' alt='Tocar episódio' 
                    width='1.5rem'
                    height='1.5rem'
                    borderRadius='1.5rem'
                  />
                </Button>
              </ListItem>
            )
          })}
        </UnorderedList>
      </Box>
      <Box id='allEpisodes' as='section'
        paddingBottom='2rem'
      >
        <Box as='h2'
          margin='1.7rem 0 2.1rem 0'
        >
          Todos episódios
        </Box>
        <Table cellSpacing={0}
          width='100%'
        >
          <Thead>
            <Tr>
              <Th {...styleTh}>
              </Th>
              <Th {...styleTh}>
                Podcast
              </Th>
              <Th {...styleTh}>
                Integrantes
              </Th>
              <Th {...styleTh}>
                Data
              </Th>
              <Th {...styleTh}>
                Duração
              </Th>
              <Th {...styleTh}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {allEpisodes.map(episode => {
              return (
                <Tr key={episode.id}>
                  <Td {...styleTd} width='72px'>
                    <Box as='div'
                      width='2.5rem'
                      height='2.5rem'
                      borderRadius='0.5rem'
                    >
                      <Image src={episode.thumbnail} alt={episode.title}
                        width={120}
                        height={120}
                        objectFit='cover'
                      />
                    </Box>
                  </Td>
                  <Td {...styleTd}>
                    <Link href={`/episodes/${episode.id}`}>
                      <LinkChakra
                        color='gray.800'
                        fontFamily='Lexend, sans-serif'
                        fontSize='1rem'
                        fontWeight='600'
                        lineHeight='1.4rem'
                        textDecoration='none'
  
                        _hover={{
                          textDecoration: 'underline',
                        }}
                      >
                        {episode.title}
                      </LinkChakra>
                    </Link>
                  </Td>
                  <Td {...styleTd}>
                    {episode.members}
                  </Td>
                  <Td {...styleTd} width='100px'>
                    {episode.publishedAt}
                  </Td>
                  <Td {...styleTd}>
                    {episode.durationAsString}
                  </Td>
                  <Td {...styleTd}>
                    <Button type='button'
                      width='2rem'
                      height='2rem'

                      padding='0'
                      
                      background='white'
                      border='1px solid'
                      borderColor='gray.100'
                      borderRadius='0.5rem'
                      fontSize='0'
                      
                      transition='filter 200ms'

                      _hover={{
                        filter: 'brightness(0.95)'
                      }}
                    >
                      <ImageChakra src='/play-green.svg' alt='Tocar episódio' 
                        width='1.25rem'
                        height='1.25rem'
                      />
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

// Tipar de função por completo:
// Tipagem dos Parâmetros e retorno da função ao mesmo tempo
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(
        parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }
      ),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}