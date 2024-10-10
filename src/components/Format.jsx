import { useContext, useRef } from "react";
import { MemeContext } from "../context/contextMeme.jsx";

const Format = () => {
  const { state, dispatch } = useContext(MemeContext);

    const myInput1 = useRef();
    const myInput2 = useRef();

  const handleMemeText = (e) => {
    e.preventDefault();
dispatch({ type: "text1", payload: { topText: myInput1.current.value, bottomText: myInput2.current.value } });
};

const handleUpload = (e) => {
    dispatch({ type: "custom", payload: URL.createObjectURL(e.target.files[0]) });
};

const handleRandom = () => {
    dispatch({ type: "random", payload: Math.floor(Math.random() * state.memes.length) });
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
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="color"
                    onChange={(e) => {
                        dispatch({ type: "colorMeme1", payload: e.target.value })
                    }}
                    className="w-10 h-10 p-0 border-none"
                />
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
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="color"
                    onChange={(e) => dispatch({ type: "colorMeme2", payload: e.target.value })}
                    className="w-10 h-10 p-0 border-none"
                />
            </div>
        </div>
        <button onClick={handleRandom} className="btn btn-primary mt-4">Random</button>
        <br />
        <input type="file" id="input" multiple onChange={handleUpload} className="file-input file-input-bordered w-full max-w-xs mt-4" />
    </div>
);
};

export default Format;