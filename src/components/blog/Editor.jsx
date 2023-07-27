import EditorJS from "@editorjs/editorjs";
// import { Box } from "@chakra-ui/react";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useEffect, useRef } from "react";
import React from "react";

const Editor = ({ onChangeFunction }) => {
  const ejInstance = useRef();
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorBox",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        let content = await editor.save();
        console.log(content);
      },
      tools: {
        header: Header,
        list: List,
      },
    });
  };
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <div id="editorBox"></div>;
};

export default Editor;
