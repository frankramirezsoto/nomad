"use client";

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
  DrawerFooter,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const SidebarContent = () => {
  const router = useRouter()
  const { logoutBusiness } = useAuth();
  return (
    <VStack mt={12}>
      <Button 
      w="100%"
      onClick={() => router.push("/business/portal/account")}
      >Account</Button>
      <Button
        w="100%"
        onClick={() => router.push("/business/portal/myBusinesses")}
      >
        My Businesses
      </Button>
      <Button w="100%" colorScheme="teal" onClick={() => router.push("/business/portal/myTours")}>My Tours</Button>
      <Button w="100%" colorScheme="teal" onClick={() => router.push("/business/portal/myTours")}>My Reservations</Button>
      <Button w="100%" colorScheme="red" onClick={logoutBusiness}>Logout</Button>
    </VStack>
  )
}

const Sidebar = ({ isOpen, variant, onClose }) => {
  return variant === "sidebar" ? (
    <Flex alignItems="space-between">
      <Box
      position="fixed"
      left={0}
      p={5}
      w="200px"
      top={0}
      h="100%"
      className='bg-teal-700'
    >
      <SidebarContent onClick={onClose} />
    </Box>
    </Flex>
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
  );
};

export default Sidebar;
