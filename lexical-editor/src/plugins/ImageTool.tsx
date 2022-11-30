import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor } from "lexical";
import * as React from "react";

import type { InsertImagePayload } from "./ImagePlugin";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";

export function FillURL() {
  const srcfile = prompt("Enter the URL of the image:", "") as string;
  console.log(srcfile);
  return srcfile;
}

export default function ImageTool({
  editor,
}: {
  editor: LexicalEditor;
}): JSX.Element {
  const onClick = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          altText: "",
          src: reader.result,
        });
      }
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <div>
      <button
        onClick={() =>
          onClick({
            altText: "URL image",
            src: FillURL(),
          })
        }
        className="toolbar-item spaced"
      >
        <i className="format insert-image" />
      </button>
      <input
        type={"file"}
        accept="image/png, image/jpg"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
