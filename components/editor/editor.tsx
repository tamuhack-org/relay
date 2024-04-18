/* eslint-disable no-unused-vars */

import { useRef } from "react";
import EmailEditor, { EditorRef } from "react-email-editor";

type EditorProps = {
  templateJson: string;
  saveTemplate: (template: string) => void;
  exportHtml: (html: string) => void;
};

export default function Editor(props: EditorProps) {
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    if (!emailEditorRef.current || !emailEditorRef.current.editor) {
      return;
    }
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      console.log("exportHtml", html);
      props.exportHtml(html);
    });
  };

  const saveDesign = () => {
    if (!emailEditorRef.current || !emailEditorRef.current.editor) {
      return;
    }
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log("saveDesign", design);
    });
  };

  const onReady = () => {
    // editor is ready
    if (!emailEditorRef.current || !emailEditorRef.current.editor) {
      return;
    }

    console.log("onReady");

    emailEditorRef.current.editor.loadDesign(JSON.parse(props.templateJson));
  };

  // YOU MUST USE react-email-editor@1.7.7
  // https://github.com/unlayer/react-email-editor/issues/376#issuecomment-1905329171

  return (
    <div className="">
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      <div>
        <button onClick={saveDesign}>Save</button>
      </div>

      <EmailEditor
        ref={emailEditorRef}
        // onLoad={onLoad}
        onReady={onReady}
        // minHeight={'800px'}
        style={{
          width: "100%",
          minHeight: "85vh",
          maxHeight: "85vh",
        }}
        editorId="editor"
      />
    </div>
  );
}
