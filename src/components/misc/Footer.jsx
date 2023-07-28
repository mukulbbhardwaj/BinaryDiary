import { Text,Box } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
    return (
        <>
            <Box position={'fixed'} bottom={'0'} >

            <Text borderTop={'1px solid gray'} textAlign={'center'} width={'60%'} margin={'75px'} >
                made by mukul
            </Text>
            </Box>
        </>
    )
}
export default Footer;