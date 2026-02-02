import { Box, Text, Link, Image } from "@chakra-ui/react";
import twitter from "../../asset/twitter.png";

export default function Footer() {
  return (
    <Box
      as="footer"
      mt="auto"
      pt={10}
      pb={12}
      w="100%"
      borderTop="1px solid"
      borderColor="surface.border"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      color="text.muted"
      fontSize="sm"
    >
      <Text fontWeight="600" color="text.secondary" letterSpacing="-0.01em">
        Binary Diary
      </Text>
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" justifyContent="center">
        <Text>Made with ♡ by</Text>
        <Link
          href="https://github.com/mukulbbhardwaj"
          target="_blank"
          rel="noopener noreferrer"
          color="brand.400"
          fontWeight="500"
          _hover={{ textDecoration: "underline" }}
        >
          mukul
        </Link>
      </Box>
      <Link
        href="https://twitter.com/mukulbbhardwaj"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        mt={1}
        opacity={0.85}
        _hover={{ opacity: 1 }}
      >
        <Image src={twitter} alt="" w={6} h={6} />
      </Link>
    </Box>
  );
}
