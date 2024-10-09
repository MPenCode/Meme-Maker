import { useContext, useRef } from "react";
import { MemeContext } from "../context/contextMeme.jsx";
import domtoimage from "dom-to-image";
import PicPreview from "./PicPreview.jsx";

const Meme = () => {
  const { state, dispatch } = useContext(MemeContext);

  const myImage = useRef(null);
  const myInput1 = useRef(null);
  const myInput2 = useRef(null);

  const handleReset = () => {
    dispatch({ type: "images", payload: "" });
    dispatch({ type: "text", payload: "" });
    dispatch({ type: "random", payload: 0 });
    console.log("here", myInput2);
    myInput1.current.value = "";
    myInput2.current.value = "";
  };
  const downloadMeme = () => {
    domtoimage
      //replace document.getElementById
      .toJpeg(myImage.current, { quality: 0.95 })
      .then(function (dataUrl) {
        // console.log(dataUrl);

        // Set a timeout to delete the meme after 7 days
        // setTimeout(() => {
        //     const updatedMemes = JSON.parse(localStorage.getItem('myMemes')) || [];
        //     const filteredMemes = updatedMemes.filter(meme => meme.id !== newMeme.id);
        //     localStorage.setItem('myMemes', JSON.stringify(filteredMemes));
        // }, 7 * 24 * 60 * 60 * 1000);
        // 7 days in milliseconds
        const myMemes = JSON.parse(localStorage.getItem("myMemes")) || [];
        const newMeme = {
          dataUrl,
          time: new Date().toISOString(),
          id: Date.now(),
          name: (state.memeName + ".jpeg"),
        };
        myMemes.push(newMeme);
        localStorage.setItem("myMemes", JSON.stringify(myMemes));
        //will create a link and fire the click on it
        var link = document.createElement("a");
        link.download = (state.memeName + ".jpeg");
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div>
      <div className="meme-container" ref={myImage}>
        {state.memes.length && (
          <img
            //we grab the index of images array, which is initially 0 because of our randomImage state. Later we manipulate that state to get a random image
            src={state.custom ? state.custom : state.memes[state.random].url}
            //shorter version: we check if the left side of the operator returns undefined or null and then chose the one on the right
            // src={customImage ?? images[randomImage].url}
            alt={state.memes[state.random].name}
            className="first-image"
          />
        )}
        <p className="top">{state.text1?.topText}</p>{" "}
        <p className="bottom">{state.text1?.bottomText}</p>
      </div>
      <button onClick={downloadMeme}>save</button>
      <button onClick={handleReset}>reset</button>

      {state.memes.length && <PicPreview />}
    </div>
  );
};

export default Meme;
