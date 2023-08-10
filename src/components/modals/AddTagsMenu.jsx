import React from "react";
import {
  Text,
  Box,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import {
  PlusSquareIcon,
  SmallAddIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import TagsItem from "../misc/TagsItem";

const AddTagsMenu = () => {
  const tagList = [
    "web",
    "dsa",
    "open-source",
    "web3",
    "app-dev",
    "cyber-sec",
    "life",
    "travel",
  ];

  const addToTags = ({ tag }) => {
    console.log(tag);
  };
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          fontSize={"24px"}
          background={"none"}
          color={"white"}
          _focus={{ bgColor: "none" }}
          _hover={{ color: "red" }}
          icon={<SmallAddIcon />}
        />
        <MenuList bgColor={"#2e2e2d"} color={"white"} border={"none"}>
          {tagList.map((t, idx) => (
            <MenuItem bgColor={"#2e2e2d"} color={"white"}>
              <TagsItem tag={t} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default AddTagsMenu;
