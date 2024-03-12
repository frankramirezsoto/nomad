'use client'

import { Button, useDisclosure, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./Register";

function AccessBtn(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (props.children == "Sign In") {
    return(
        <>
            <button
                className="py-2 px-6 bg-teal-700 hover:bg-teal-800 rounded-full me-3"
                onClick={onOpen}
            >{props.children}</button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                {/* Renders the Login Page */}
                <Login></Login>
                </ModalContent>
            </Modal>
        </>
    )
  } else if(props.children == "Register"){
    return(
        <>
            <button
                className="py-2 px-6 bg-green-700 hover:bg-green-800 rounded-full"
                onClick={onOpen}
            >{props.children}</button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                {/* Renders the Login Page */}
                    <Register></Register>
                </ModalContent>
            </Modal>
        </>
    )
  }
}

export default AccessBtn;
