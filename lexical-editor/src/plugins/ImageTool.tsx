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
  console.log("editor", editor);
  const onClick = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  return (
    <div className="toolbar">
      <button
        onClick={() =>
          onClick({
            altText: "URL image",
            src: FillURL(),
          })
        }
        className={"toolbar-item spaced "}
      >
        <span className="text">Insert from URL</span>
      </button>
    </div>
  );
}
