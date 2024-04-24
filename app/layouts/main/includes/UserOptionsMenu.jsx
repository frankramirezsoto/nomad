"use client";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useAuth } from "@/app/context/AuthContext";
import { FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function UserOptionsMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Menu> 
      <MenuButton as={Button} rightIcon={<FaChevronDown />}>
        <span className='text-bold'>Hi, {user.first_name}</span>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={()=>router.push("/account/")}>Account</MenuItem>
        <MenuItem onClick={()=>router.push("/account/myReservations")}>My Tours</MenuItem>
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
