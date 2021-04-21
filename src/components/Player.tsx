import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";

export default function Player() {
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
        <Image src='/playing.svg' alt='Tocando agora' />
        <Text as='strong'
          fontFamily='Lexend, sans-serif'
          fontWeight='600'
        >
          Tocando agora
        </Text>
      </Flex>

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

      <Box as='footer'
        alignSelf='stretch'
      >
        <Flex as='div'
          alignItems='center'
          fontSize='0.875rem'

          _empty={{
            opacity: 0.5
          }}
        >
          <Text as='span'
            display='inline-block'
            width='4rem'
            textAlign='center'
          >00:00</Text>
          <Box as='div'
            flex='1'
          >
            <Box as='div' 
              height='4px'
              width='100%'

              background='purple.300'
              borderRadius='2px'
            />
          </Box>
          <Text as='span'
            display='inline-block'
            width='4rem'
            textAlign='center'
          >00:00</Text>
        </Flex>

        <Flex as='div'
          alignItems='center'
          justifyContent='center'
          marginTop='2.5rem'
        >
          <Button type='button'
            background='transparent'
            border='0'
            fontSize='0'
          >
            <Image src='/shuffle.svg' alt='Embaralhar' />
          </Button>
          <Button type='button'
            background='transparent'
            border='0'
            fontSize='0'
          >
            <Image src='/play-previous.svg' alt='Tocar anterior' />
          </Button>
          <Button type='button'
            border='0'
            fontSize='0'

            height='4rem'
            width='4rem'
            borderRadius='1rem'
            background='purple.400'
          >
            <Image src='/play.svg' alt='Tocar' />
          </Button>
          <Button type='button'
            background='transparent'
            border='0'
            fontSize='0'
          >
            <Image src='/play-next.svg' alt='Tocar próxima' />
          </Button>
          <Button type='button'
            background='transparent'
            border='0'
            fontSize='0'
          >
            <Image src='/repeat.svg' alt='Repetir' />
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}