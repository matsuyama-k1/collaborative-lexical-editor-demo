import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
} from "lexical";
// @ts-ignore
import { WebsocketProvider } from "y-websocket";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";

function initialEditorState(editor: LexicalEditor): void {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  const text = $createTextNode("Welcome to collab!");
  paragraph.append(text);
  root.append(paragraph);
}

type CollaborativeEditorProps = {
  name: string;
};

function CollaborativeEditor(props: CollaborativeEditorProps) {
  const myName = props.name || "default";
  const initialConfig = {
    // NOTE: This is critical for collaboration plugin to set editor state to null. It
    // would indicate that the editor should not try to set any default state
    // (not even empty one), and let collaboration plugin do it instead
    editorState: null,
    namespace: "Demo",
    nodes: [],
    onError: (error: Error) => {
      throw error;
    },
    theme: {},
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CollaborationPlugin
        id="yjs-plugin"
        // @ts-ignore
        providerFactory={(id, yjsDocMap) => {
          const doc = new Y.Doc();
          // @ts-ignore
          yjsDocMap.set(id, doc);

          const provider = new WebsocketProvider(
            "ws://localhost:1234",
            id,
            // @ts-ignore
            doc
          );
          new IndexeddbPersistence(
            id,
            // @ts-ignore
            doc
          );

          return provider;
        }}
        // Optional initial editor state in case collaborative Y.Doc won't
        // have any existing data on server. Then it'll user this value to populate editor.
        // It accepts same type of values as LexicalComposer editorState
        // prop (json string, state object, or a function)
        initialEditorState={initialEditorState}
        shouldBootstrap={true}
        username={myName}

      />
    </LexicalComposer>
  );
}

export default CollaborativeEditor;
