import React, {useState} from 'react'
import { createPortal } from 'react-dom'
import { Box, Text, Link, VStack, Image, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, AspectRatio} from '@chakra-ui/react'


export function ClipBox(clip){
    const link = clip.clip.embed_url + "&parent=localhost&autoplay=true"
    const streamLink = "https://www.twitch.tv/" + clip.clip.broadcaster_name
    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => setShowModal(!showModal)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <Box position='relative' mx='10px'my='10px'minWidth='420px' minHeight='236px' maxWidth='420px' maxHeight='236px' overflow='hidden'>
            <Box w='100%' h='100%' bgGradient='radial(gray.900, black)'
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
                <Box boxSize='150px' position='absolute' mx='135px' my='48px'>
                    <Image src="playButton.png"
                        h='90%'
                        w='100%'
                        _hover={{cursor: "pointer", color:'black'}}
                        onClick={onOpen}/>
                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent containerProps={{paddingRight:'520px' }}>
                        <iframe src={link}
                            allowfullscreen="true"
                            height="540px"
                            width="960px">
                        </iframe>
                </ModalContent>
            </Modal>
        </Box>
    )
}
