'use client'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { Box } from '@chakra-ui/react'

export default function Rating({ rating, numReviews }) {
    return (
      <Box display="flex" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  className='text-yellow-500' 
                />
              )
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} className='text-yellow-500' />
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} className='text-gray-300' />
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {(numReviews>0)? `${numReviews} reviews` :"0 reviews"}
        </Box>
      </Box>
    )
  }