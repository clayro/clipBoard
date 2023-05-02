import React, {useState} from 'react'
import { createPortal } from 'react-dom'
import { Box, Text, Link, VStack, Image, Modal, ModalOverlay, ModalContent,
     ModalCloseButton, useDisclosure, AspectRatio} from '@chakra-ui/react'


export function ClipBox(clip){
    const link = clip.clip.embed_url + "&parent=localhost&autoplay=true"
    const streamLink = "https://www.twitch.tv/" + clip.clip.broadcaster_name
    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => setShowModal(!showModal)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <Box position='relative' mt='15px' maxW='450px' minH='253px' w='100%' overflow='hidden'>
            <Box width='100%' height='100%' bgGradient='radial(gray.900, black)'
                _before={{
                    content: '""',
                    bgImage:clip.clip.thumbnail_url,
                    bgSize: "cover",
                    pos: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    opacity: 0.5
                }}>
                <VStack position='absolute' align='left' ml='2' spacing='0'>
                    <Link color='white' href={clip.clip.url} isExternal fontSize='25px'  fontWeight='500'
                        textDecoration='underline'>
                        {clip.clip.title}
                    </Link>
                    <Link color='white' href={streamLink} isExternal fontSize='15px'  
                        textDecoration='underline'>
                        {clip.clip.broadcaster_name}
                    </Link>
                    <Text color='white' fontSize='12px'>
                        {clip.clip.view_count.toLocaleString()} views
                    </Text>
                </VStack>
                <Box boxSize='150px' position='absolute' mx='34%' my='14%'>
                    <Image src="playButton.png"
                        h='90%'
                        w='100%'
                        _hover={{cursor: "pointer", color:'black'}}
                        onClick={onOpen}/>
                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxWidth='960px' overflowY='hidden'>
                        <AspectRatio ratio={16/9}>
                            <iframe src={link}
                            allowFullScreen='true'
                            /> 
                    </AspectRatio>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </Box>
    )
}
