import React, { useState, useEffect } from 'react'
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
    const [endDate, setEndDate] = useState(moment().format())
    const [startDate, setStartDate] = useState(moment(endDate).subtract(1,dateFilter).format())
    const [clips, setClips] = useState([])
    const [cursor, setCursor] = useState('')
    const [loadMore, setLoadMore] = useState(false)
    const loadToggle = () => setLoadMore(!loadMore)
    const token = import.meta.env.VITE_TOKEN

    useEffect(() => {
        setStartDate(moment(endDate).subtract(1,dateFilter).format())

        const getClips = async() => {
            const response = await axios.get('https://api.twitch.tv/helix/clips?' +
                'game_id=' + id +
                '&started_at=' + moment(endDate).subtract(1,dateFilter).format() +
                '&ended_at=' + endDate +
                '&first=30', {
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
        const getClips = async() => {
            const nextPage = await axios.get('https://api.twitch.tv/helix/clips?' +
                'game_id=' + id +
                '&started_at=' + moment(endDate).subtract(1,dateFilter).format() +
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
        getClips()
    }, [loadMore])
    return (
        <Box maxWidth="1350px" mx="auto">
            <Header />
            <Box maxWidth='900px' mx='auto'>
                <HStack justifyContent='space-between'>
                    <Dates startDate={startDate} endDate={endDate} dateFilter={dateFilter}/>
                    <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter}/>
                </HStack>
            </Box>
            <Flex mt='20px' justifyContent='center'>
                <SearchBar id={id} setId={setId} />
            </Flex>
            <Flex pt='15px' d='row' wrap='wrap' justifyContent='center' overflowX='hidden'>
                {clips.map((clip) => (
                    <ClipBox clip={clip} />
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
