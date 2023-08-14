import { Button, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { LinkIcon } from "@chakra-ui/icons";


const SharLinks = () => {
  const toast = useToast();
  const location = useLocation();
  const postLink = `https://binarydiary.vercel.app${location.pathname}`;
  const handleShareClick = () => {
    navigator.clipboard.writeText(postLink);
    toast({
      title: "Link Copied",
      duration: 1000,
      position: "top",
      status: "success",
      size: "sm",
      variant: "subtle",
    });
  };
  return (
    <div>
      <Button
        variant="outline"
        _hover={{ bgColor: "#2b2c33" }}
        size={"sm"}
        onClick={handleShareClick}
      >
        <LinkIcon color={"white"} />
      </Button>
    </div>
  );
};

export default SharLinks;
