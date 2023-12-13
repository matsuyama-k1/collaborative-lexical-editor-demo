import { useState } from "react";
import CollaborativeEditor from "./components/CollaborativeEditor";

function App() {
  const [name, setName] = useState<string>("");
  const [showEditor, setShowEditor] = useState<boolean>(false);
  return (
    <>
      <div>
        Name:
        <input onChange={(event) => setName(event.target.value)} />
        {!showEditor && (
          <button onClick={() => setShowEditor((prev) => !prev)}>Enter</button>
        )}
      </div>
      {showEditor && <CollaborativeEditor name={name} />}
    </>
  );
}

export default App;
