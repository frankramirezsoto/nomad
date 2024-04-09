'use client'

import {
    Box,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    VStack,
  } from '@chakra-ui/react'
  
  const SidebarContent = () => (
    <VStack mt={12}>
      <Button w="100%">
        Account
      </Button>
      <Button w="100%">
        My Business
      </Button>
      <Button w="100%">
        My Tours
      </Button>
    </VStack>
  )
  
  const Sidebar = ({ isOpen, variant, onClose }) => {
    return variant === 'sidebar' ? (
      <Box
        position="fixed"
        left={0}
        p={5}
        w="200px"
        top={0}
        h="100%"
        bg="#171923"
      >
        <SidebarContent onClick={onClose} />
      </Box>
    ) : (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              <SidebarContent onClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  
  export default Sidebar