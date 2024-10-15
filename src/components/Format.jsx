import { useContext, useRef, useState } from "react";
import { MemeContext } from "../context/contextMeme.jsx";
import domtoimage from "dom-to-image";
import { AiOutlineMenu } from "react-icons/ai";
import { PositionBottom, PositionTop } from "./PositionText.jsx";
import { useNavigate } from "react-router-dom";

const Format = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(MemeContext);

  const myInput1 = useRef();
  const myInput2 = useRef();
  const myMemeName = useRef();
  const myColor1 = useRef();
  const myColor2 = useRef();
  const [rangeValue1, setRangeValue1] = useState(30);
  const [rangeValue2, setRangeValue2] = useState(30);

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
    dispatch({ type: "search", payload: [] });
    dispatch({ type: "searchValue", payload: "" });
    dispatch({ type: "range", payload: [0, 25] });
    dispatch({ type: "textRange", payload: { rangeTop: 30, rangeBottom: 30 } });
    dispatch({
      type: "colorText",
      payload: { colorTop: "#ffffff", colorBottom: "#ffffff" },
    });
    myInput1.current.value = "";
    myInput2.current.value = "";
    myColor1.current.value = "#ffffff";
    myColor2.current.value = "#ffffff";
    myMemeName.current.value = "";
    setRangeValue1(30);
    setRangeValue2(30);
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
          color: state.colorText,
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
        navigate("/gallery");
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
            defaultValue="#ffffff"
            onChange={(e) =>
              dispatch({
                type: "colorText",
                payload: {
                  colorTop: e.target.value,
                  colorBottom: myColor2.current.value,
                },
              })
            }
            className="w-10 h-10 p-0 border-none rounded"
          />
          <button
            className="btn btn-neutral"
            onClick={() =>
              dispatch({
                type: "topBoxBulean",
                payload: !state.topBoxBulean,
              })
            }
          >
            <AiOutlineMenu />
          </button>
        </div>
        {state.topBoxBulean && <div className="flex">
          <div>
            <input
              type="range"
              min={10}
              max={50}
              value={rangeValue1}
              className="range"
              step={10}
              onChange={(e) => {
                setRangeValue1(Number(e.target.value));
                dispatch({
                  type: "textRange",
                  payload: {
                    rangeTop: Number(e.target.value),
                    rangeBottom: rangeValue2,
                  },
                });
              }}
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <button className="btn btn-xs" onClick={() => setRangeValue1(10)}>
                1
              </button>
              <button className="btn btn-xs" onClick={() => setRangeValue1(20)}>
                2
              </button>
              <button className="btn btn-xs" onClick={() => setRangeValue1(30)}>
                3
              </button>
              <button className="btn btn-xs" onClick={() => setRangeValue1(40)}>
                4
              </button>
              <button className="btn btn-xs" onClick={() => setRangeValue1(50)}>
                5
              </button>
            </div>
          </div>
          <PositionTop />
        </div>}
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
            defaultValue="#ffffff"
            onChange={(e) =>
              dispatch({
                type: "colorText",
                payload: {
                  colorTop: myColor1.current.value,
                  colorBottom: e.target.value,
                },
              })
            }
            className="w-10 h-10 p-0 border-none rounded"
          />
          <button
            className="btn btn-neutral"
            onClick={() =>
              dispatch({
                type: "bottomBoxBulean",
                payload: !state.bottomBoxBulean,
              })
            }
          >
            <AiOutlineMenu />
          </button>
        </div>
        {state.bottomBoxBulean && <div className="flex">
          <div>
            <input
              type="range"
              min={10}
              max={50}
              value={rangeValue2}
              className="range"
              step={10}
              onChange={(e) => {
                setRangeValue2(Number(e.target.value));
                dispatch({
                  type: "textRange",
                  payload: {
                    rangeTop: rangeValue1,
                    rangeBottom: Number(e.target.value),
                  },
                });
              }}
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <button className="btn btn-xs" onClick={() => setRangeValue2(10)}>
                1
              </button>
              <button className="btn btn-xs" onClick={() => setRangeValue2(20)}>
                2
              </button>
              <button className="btn btn-xs" onClick={() => setRangeValue2(30)}>
                3
              </button>
              <button className="btn btn-xs" onClick={() => setRangeValue2(40)}>
                4
              </button>
              <button className="btn btn-xs" onClick={() => setRangeValue2(50)}>
                5
              </button>
            </div>
          </div>
          <PositionBottom />
        </div>}
      </div>
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
      <button onClick={handleRandom} className="btn btn-accent mt-4">
        Random Image
      </button>
    </div>
  );
};

export default Format;
