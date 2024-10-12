import { useContext } from "react";
import { MemeContext } from "../context/contextMeme.jsx";

export default function MemeGallery() {
  const { state, dispatch } = useContext(MemeContext);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
      {state.storedMemes.map((meme, index) => (
        <div key={index} className="meme-container relative border p-4">
          <p className="text-lg font-bold text-center mt-2 mb-4">{meme.name}</p>
          <img
            src={meme.dataUrl}
            alt={meme.name}
            className="w-full object-contain mx-auto"
            style={{ transform: "scale(0.8)" }}
          />
        </div>
      ))}
    </div>
  );
}
