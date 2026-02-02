import { Button, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { LinkIcon } from "@chakra-ui/icons";

export default function SharLinks() {
  const toast = useToast();
  const location = useLocation();
  const postLink = `${typeof window !== "undefined" ? window.location.origin : ""}${location.pathname}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postLink);
    toast({ title: "Link copied", status: "success", duration: 2000, position: "top", isClosable: true });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      borderColor="surface.border"
      color="text.secondary"
      _hover={{ bg: "surface.muted", color: "text.primary" }}
      leftIcon={<LinkIcon />}
      onClick={handleCopyLink}
    >
      Copy link
    </Button>
  );
}
