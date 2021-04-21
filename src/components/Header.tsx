import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";

export default function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return (
    <Flex as='header'
      alignItems='center'

      background='white'
      height='6.5rem'
      
      padding='2rem 4rem'
      border-bottom='1px solid gray.100'
    >
      <Image src='/logo.svg' alt='Podcastr' />
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
    </Flex>
  )
}