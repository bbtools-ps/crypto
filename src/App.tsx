import { Route } from "react-router";
import { Routes } from "react-router-dom";
import EmojiCipher from "./screens/emoji-cipher/EmojiCipher";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<EmojiCipher />} />
    </Routes>
  );
};

export default App;
