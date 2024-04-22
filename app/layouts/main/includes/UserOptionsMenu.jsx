"use client";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from '@chakra-ui/react'
import { useAuth } from "@/app/context/AuthContext";
import { FaChevronDown } from 'react-icons/fa';

export default function UserOptionsMenu() {
  const { user, logout } = useAuth();

  return (
    <Menu> 
      <MenuButton as={Button} rightIcon={<FaChevronDown />}>
        <span className='text-bold'>Hi, {user.first_name}</span>
      </MenuButton>
      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuItem>My Tours</MenuItem>
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
