import React from 'react'
import { Feed } from './feed'
import { Box } from '@chakra-ui/react'


export function App() {
  return (
    <Box maxWidth="100vw" minHeight="100vh" bg="gray.900" pt='10px' pb='30px'>
      <Feed />
    </Box>
  )
}
