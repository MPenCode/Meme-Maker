import { useContext, useRef } from "react";
import { MemeContext } from "../context/contextMeme.jsx";
import domtoimage from "dom-to-image";

const Meme = () => {
  const { state, dispatch } = useContext(MemeContext);

  const myImage = useRef(null);
  const handleReset = () => {
    dispatch({ type: "images", payload: [] });
    dispatch({ type: "text", payload: "" });
    dispatch({ type: "random", payload: 0 });
  };

  const downloadMeme = () => {
    domtoimage
      .toJpeg(myImage.current, { quality: 0.95 })
      .then(function (dataUrl) {

        const myMemes = JSON.parse(localStorage.getItem("myMemes")) || [];
        const newMeme = {
          dataUrl,
          time: new Date().toISOString(),
          id: Date.now(),
          name: state.memeName + ".jpeg",
        };
        myMemes.push(newMeme);
        localStorage.setItem("myMemes", JSON.stringify(myMemes));
        //will create a link and fire the click on it
        var link = document.createElement("a");
        link.download = state.memeName + ".jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <div
        className="meme-container relative w-2/3"
        ref={myImage}
      >
        {state.memes.length && (
          <img
            src={state.custom.length > 0 ? state.custom : state.memes[state.random].url}
            alt={state.memes[state.random].name}
            className="w-96 object-contain mx-auto"
          />
        )}
        <p
          className="top absolute top-0 left-1/2 transform -translate-x-1/2 text-xl font-bold"
          style={{ color: state.colorMeme1 }}
        >
          {state.text1?.topText}
        </p>
        <p
          className="bottom absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xl font-bold"
          style={{ color: state.colorMeme2 }}
        >
          {state.text1?.bottomText}
        </p>
      </div>
      <div className="mt-4 flex">
        <input
          onChange={(e) => {
            dispatch({ type: "memeName", payload: e.target.value });
          }}
          type="text"
          name="memeName"
          id="memeName"
          className="input input-bordered w-full max-w-xs mr-2"
          placeholder="MemeName"
        />
        <button className="btn btn-primary mr-2" onClick={downloadMeme}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Meme;
