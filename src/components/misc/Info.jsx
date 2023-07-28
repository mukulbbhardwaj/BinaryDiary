import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const Info = () => {
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Element</Th>
              <Th>Markdown Syntax</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Heading</Td>
              <Td> # H1 ## H2 ### H3</Td>
            </Tr>
            <Tr>
              <Td>Bold</Td>
              <Td> **bold text**</Td>
            </Tr>
            <Tr>
              <Td>Italic</Td>
              <Td>*italicized text*</Td>
            </Tr>
            <Tr>
              <Td>Blockquote</Td>
              <Td> {"<"} blockquote</Td>
            </Tr>
            <Tr>
              <Td>Ordered List</Td>
              <Td>
                <ol>
                  <li>First item</li>
                  <li>Second item</li>
                  <li> Third item</li>
                </ol>
              </Td>
            </Tr>
            <Tr>
              <Td>Unordered List</Td>
              <Td>
                <ul style={{ listStyle: "none" }}>
                  <li>- First item</li>
                  <li>- Second item</li>
                  <li>- Third item</li>
                </ul>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>Code</Td>
              <Td> `code`</Td>
            </Tr>
            <Tr>
              <Td>Horizontal Rule</Td>
              <Td>---</Td>
            </Tr>
            <Tr>
              <Td>Link</Td>
              <Td>[title](https://www.example.com)</Td>
            </Tr>{" "}
            <Tr>
              <Td>Image</Td>
              <Td>![alt text](image.jpg)</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Info;
