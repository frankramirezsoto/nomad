'use client'

import { Box, Center, IconButton, Text, Flex } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Logo from "@/app/components/Logo";

const Header = ({ showSidebarButton = true, onShowSidebar }) => {
  return (
    <Flex className='bg-teal-700' p={4} color="white" justifyContent="end">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="white"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Logo />
    </Flex>
  )
}

export default Header