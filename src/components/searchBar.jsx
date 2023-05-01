import React, { useState, useEffect } from 'react'
import games from '../data/games'
import Select from 'react-select'
import { Input, Stack, Box } from '@chakra-ui/react'

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#171923",
    minWidth: 250,
    minHeight: 40,
    borderWidth: state.isFocused ? '1px' : '1px',
    borderRadius: state.isFocused ? "5px 5px 5px 5px" : 5,
    borderColor: state.isFocused ? "#6441a5" : "white",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: state.isFocused ? "#6441a5" : "white"
    }
  }),
  menu: base => ({
    ...base,
    borderRadius: 0,
    marginTop: 1
  }),
  menuList: base => ({
    ...base,
    padding: 0
  })
}
export function SearchBar(props) {
  const {id,setId} = props
  
  const handleChange = (e) => {
    setId(e.value)
    }

  return (
    <Box>
      <Select placeholder='Select Game'
        styles={customStyles}
        options={games}
        onChange={handleChange}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral80: 'white',
            neutral50: 'white'
          }})
        }
      />
    </Box>
  )
}
