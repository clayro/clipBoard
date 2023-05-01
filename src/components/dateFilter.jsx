import React, { useState, useEffect } from 'react'
import { Select, Box } from '@chakra-ui/react'
import moment from 'moment'


export function DateFilter({dateFilter, setDateFilter}) {

    return(
        <Box>
            <Select
                pt='4px'
                color='white'
                focusBorderColor='#6441a5'
                value={dateFilter}
                onChange={(e) => {setDateFilter(e.target.value)}}> 
                <option style={{ color: 'black' }} value='day'>Day</option>
                <option style={{ color: 'black' }} value='week'>Week</option>
                <option style={{ color: 'black' }} value='month'>Month</option>
                <option style={{ color: 'black' }} value='year'>Year</option>
            </Select>
        </Box>
    )
}
