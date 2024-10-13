import { useContext, useRef } from "react";
import { MemeContext } from "../context/contextMeme.jsx";
import domtoimage from "dom-to-image";
import { AiOutlineMenu } from "react-icons/ai";

const Format = () => {
  const { state, dispatch } = useContext(MemeContext);

  const myInput1 = useRef();
  const myInput2 = useRef();
  const myMemeName = useRef();
  const myColor1 = useRef();
  const myColor2 = useRef();

  const handleMemeText = (e) => {
    e.preventDefault();
    dispatch({
      type: "text1",
      payload: {
        topText: myInput1.current.value,
        bottomText: myInput2.current.value,
      },
    });
  };

  const handleUpload = (e) => {
    dispatch({
      type: "custom",
      payload: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleRandom = () => {
    dispatch({
      type: "random",
      payload: Math.floor(Math.random() * state.memes.length),
    });
    dispatch({ type: "custom", payload: "" });
  };

  const handleReset = () => {
    dispatch({ type: "images", payload: [] });
    dispatch({
      type: "text1",
      payload: {
        topText: "",
        bottomText: "",
      },
    });
    dispatch({ type: "random", payload: 0 });
    dispatch({ type: "custom", payload: [] });
    dispatch({ type: "memeName", payload: "" });
    dispatch({ type: "colorMeme1", payload: "#000000" });
    dispatch({ type: "colorMeme2", payload: "#000000" });
    dispatch({ type: "search", payload: [] });
    dispatch({ type: "searchValue", payload: "" });
    dispatch({ type: "range", payload: [0, 25] });
    myInput1.current.value = "";
    myInput2.current.value = "";
    myColor1.current.value = "#000000";
    myColor2.current.value = "#000000";
    myMemeName.current.value = "";
    dispatch({ type: "resultImage", payload: null });
  };

  const downloadMeme = () => {
    domtoimage
      .toJpeg(state.resultImage, { quality: 0.95 })
      .then(function (dataUrl) {
        const myMemes = JSON.parse(localStorage.getItem("myMemes")) || [];
        const newMeme = {
          dataUrl,
          time: new Date().toISOString(),
          id: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
          name: state.memeName,
          color: [state.colorMeme1, state.colorMeme2],
          text: [state.text1.topText, state.text1.bottomText],
        };
        myMemes.push(newMeme);
        dispatch({ type: "storedMemes", payload: myMemes });
        localStorage.setItem("myMemes", JSON.stringify(myMemes));
        //will create a link and fire the click on it
        var link = document.createElement("a");
        link.download = state.memeName + ".jpeg";
        link.href = dataUrl;
        link.click();
        handleReset();
        // Navigate to /gallery after saving the meme
        window.location.href = "/gallery";
      });
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex flex-col items-center space-y-2">
        <label className="text-lg font-semibold">Top Text</label>
        <div className="flex items-center space-x-2">
          <input
            onChange={handleMemeText}
            ref={myInput1}
            type="text"
            name="topText"
            id="topText"
            className="input input-bordered w-full max-w-[10rem] sm:max-w-xs"
          />
          <input
            type="color"
            ref={myColor1}
            onChange={(e) => {
              dispatch({ type: "colorMeme1", payload: e.target.value });
            }}
            className="w-10 h-10 p-0 border-none rounded"
          />
          <div className="collapse bg-base-200 max-w-14">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              <AiOutlineMenu />
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <label className="text-lg font-semibold">Bottom Text</label>
        <div className="flex items-center space-x-2">
          <input
            onChange={handleMemeText}
            ref={myInput2}
            type="text"
            name="bottomText"
            id="bottomText"
            className="input input-bordered w-full max-w-[10rem] sm:max-w-xs"
          />
          <input
            type="color"
            ref={myColor2}
            onChange={(e) =>
              dispatch({ type: "colorMeme2", payload: e.target.value })
            }
            className="w-10 h-10 p-0 border-none rounded"
          />
          <div className="collapse bg-base-200 max-w-14">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              <AiOutlineMenu />
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleRandom} className="btn btn-primary mt-4">
        Random
      </button>
      <br />
      <input
        type="file"
        id="input"
        multiple
        onChange={handleUpload}
        className="file-input file-input-bordered w-full max-w-xs mt-4"
      />
      <div className="mt-4 flex">
        <input
          onChange={(e) => {
            dispatch({ type: "memeName", payload: e.target.value });
          }}
          ref={myMemeName}
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

export default Format;
