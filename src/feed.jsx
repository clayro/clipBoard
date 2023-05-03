import React, { useState, useEffect, useRef } from 'react'
import { Header } from './components/header'
import { Dates } from './components/dates'
import { DateFilter } from './components/dateFilter'
import { SearchBar } from './components/searchBar'
import { ClipBox } from './components/clipBox'
import { Box, Flex, Button, HStack } from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'

export function Feed() {
    const [id, setId] = useState('509658')
    const [dateFilter, setDateFilter] = useState('week')
    const [clips, setClips] = useState([])
    const [cursor, setCursor] = useState('')
    const [loadMore, setLoadMore] = useState(false)
    const loadToggle = () => setLoadMore(!loadMore)
    const token = import.meta.env.VITE_TOKEN
    const endDate = moment().format()
    const startDate = moment(endDate).subtract(1,dateFilter).format()
    const firstRender = useRef(true) 

    useEffect(() => {
        const getClips = async() => {
            const response = await axios.get('https://api.twitch.tv/helix/clips?' +
                'game_id=' + id +
                (dateFilter !== 'all' ? '&started_at=' + startDate : '') +
                '&ended_at=' + endDate +
                '&first=30' 
                , {
                    headers: {
                        'Authorization': token,
                        'Client-Id': 'zbvv1etesxxc15xrmyazu82ejeya16'
                    }
                }
            )
            setClips(response.data.data)
            setCursor(response.data.pagination.cursor)
        }
        getClips()
    }, [dateFilter, id])

    useEffect(() => {
        const getNextPage = async() => {
            const nextPage = await axios.get('https://api.twitch.tv/helix/clips?' +
                'game_id=' + id +
                (dateFilter !== 'all' ? '&started_at=' + startDate : '') +
                '&ended_at=' + endDate +
                '&first=30' +
                '&after=' + cursor, {
                    headers: {
                        'Authorization': token,
                        'Client-Id': 'zbvv1etesxxc15xrmyazu82ejeya16'
                    }
                }
            )
            setClips(clips.concat(nextPage.data.data))
            setCursor(nextPage.data.pagination.cursor)
        }
        getNextPage()
    }, [loadMore])

    return (
        <Box maxWidth='1400px' mx='auto'>
            <Header />
            <Box maxWidth='800px' mt='5px' mx='auto' px='3%'>
                <HStack justifyContent='space-between'>
                    <Dates startDate={startDate} endDate={endDate} dateFilter={dateFilter}/>
                    <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter}/>
                </HStack>
            </Box>
            <Flex mt='20px' justifyContent='center'>
                <SearchBar id={id} setId={setId} />
            </Flex>
            <Flex pt='10px' columnGap='15px' wrap='wrap' justifyContent='center' overflowX='hidden'>
                {clips.map((clip) => (
                    <ClipBox clip={clip} key={clip.id} />
                ))}
            </Flex>
            <Flex justifyContent='center' mt='15px'>
                <Button
                    onClick={loadToggle}
                    backgroundColor='gray.900'
                    color='white'
                    border='1px'>Load More</Button>
            </Flex>
        </Box>
    )
}
