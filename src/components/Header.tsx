import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import { Button } from '@chakra-ui/button';
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  const { colorMode, toggleColorMode } = useColorMode()
  
  const colorModeObject = {
    iconButtonToggle: useColorModeValue(
      <FontAwesomeIcon icon='moon' />,
      <FontAwesomeIcon icon='sun' color='white' />
    ),
    backgroundButtonToggle: useColorModeValue('gray.50', 'transparent'),
    backgroundHeader:useColorModeValue('white', 'gray.800'),
    colorHeader: useColorModeValue('', 'gray.100')
  }

  return (
    <Flex as='header' gridArea='header'
      alignItems='center'

      background={colorModeObject.backgroundHeader}
      color={colorModeObject.colorHeader}
      height={{ base: '100%', xl2: '6.5rem' }}
      width={{ base: 'calc(100vw - 1.35rem)', xl2: '100%' }}
      
      padding='2rem 4rem'
      border-bottom='1px solid gray.100'

      transition='all 200ms'
    >
      <Image src={ colorMode === 'light' ? '/logo-light.svg' : '/logo-dark.svg' } alt='Podcastr' />
      <Text as='p'
        marginLeft='2rem'
        padding='0.25rem 0 0.25rem 2rem'
        borderLeft='1px solid'
        borderColor=' gray.100'
      >
        O melhor para você ouvir sempre!
      </Text>
      <Text as='span'
        marginLeft='auto'
        textTransform='capitalize'
      >
        {currentDate}
      </Text>
      <Button onClick={toggleColorMode}
        marginLeft="1.2rem"
        background={colorModeObject.backgroundButtonToggle}

        transition="all 200ms"
        _hover={{
          filter: "brightness(0.8)",
          cursor: "pointer"
        }}
      >
        {colorModeObject.iconButtonToggle}
      </Button>
    </Flex>
  )
}