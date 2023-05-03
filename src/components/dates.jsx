import React from 'react'
import { Text, Box } from '@chakra-ui/react'
import moment from 'moment'

export function Dates({startDate, endDate, dateFilter}) {
    const startMoment = moment(startDate)
    const endMoment = moment(endDate)

    if (dateFilter !== 'all') {
        return(  
            <Box>
                <Text fontSize='26px' color='white' fontWeight={500}>
                    Past {dateFilter}
                </Text>
                <Text fontSize='15px' fontWeight={500} color='gray.300' as ='span'>
                    {startMoment.format("MMMM D, YYYY")} – {endMoment.format("MMMM D, YYYY")}
                </Text>
            </Box>
        )
    } else {
        return(
            <Box>
                <Text fontSize='26px' color='white' fontWeight={500}>
                    All time
                </Text>
                <Text fontSize='15px' fontWeight={500} color='gray.300' as ='span'>
                    May 25, 2016 – {endMoment.format("MMMM D, YYYY")}
                </Text>
            </Box>
        )
    }
}
