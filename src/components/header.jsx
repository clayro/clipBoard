import React from 'react'
import { Heading, Flex, Image, Box, Text } from '@chakra-ui/react'



export function Header() {
    return(
        <Flex mb='20px'>
            <Flex alignItems="center" >
                <Box height="80x" width="80px">
                    <Image src="logo.png"
                        onClick={() => {window.location.href="/"}}
                        _hover={{cursor: "pointer", color:'black'}}/>
                </Box>
                <Box ml="5px" mb="1"
                    onClick={() => {window.location.href="/"}}
                    _hover={{cursor: "pointer", color:'black'}}>
                    <Heading color="white" fontSize="24px">ClipBoard</Heading>
                    <Text color="gray.300">Most viewed clips on Twitch</Text>
                </Box>
            </Flex>
        </Flex>
    )
}
