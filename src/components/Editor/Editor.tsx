import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const fullEditorButtonSet = [
  "undo",
  "redo",
  "|",
  "paragraph",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "fontsize",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "image",
  "video",
  "link"
];

const mobileEditorButtonSet = [
  "paragraph",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "ul",
  "ol",
  "|",
  "image",
  "video",
  "link"
];

const config = {
  buttons: fullEditorButtonSet,
  buttonsMD: fullEditorButtonSet,
  buttonsSM: mobileEditorButtonSet,
  buttonsXS: mobileEditorButtonSet,
  uploader: {
    insertImageAsBase64URI: true
  },
  height: 300,
};



interface IProps {
  value: string;
  onChange: (newContent: string) => void;
}

const RichTextEditor = ({ value, onChange }: IProps) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      // tabIndex={1}
      // onBlur={(newContent) => getValue(newContent)}
      onChange={onChange}
    />
  );
};

export default RichTextEditor;
