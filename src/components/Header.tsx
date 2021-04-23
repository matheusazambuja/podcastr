import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Button } from '@chakra-ui/button';

export default function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  const { colorMode, toggleColorMode } = useColorMode()
  const iconButtonToggleColorMode = useColorModeValue(
    <FontAwesomeIcon icon='moon' />,
    <FontAwesomeIcon icon='sun' color='white' />
  )
  const backgroundHeader = useColorModeValue('white', 'gray.600')
  const colorHeader = useColorModeValue('', 'gray.100')
  const backgroundButtonToggleColorMode = useColorModeValue('gray.50', 'transparent')

  return (
    <Flex as='header'
      alignItems='center'

      background={backgroundHeader}
      color={colorHeader}
      height='6.5rem'
      
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
        background={backgroundButtonToggleColorMode}

        transition="all 200ms"
        _hover={{
          filter: "brightness(0.8)",
          cursor: "pointer"
        }}
      >
        {iconButtonToggleColorMode}
      </Button>
    </Flex>
  )
}