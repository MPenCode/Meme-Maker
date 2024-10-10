import { useContext, useRef } from "react";
import { MemeContext } from "../context/contextMeme.jsx";

const Format = () => {
  const { state, dispatch } = useContext(MemeContext);

    const myInput1 = useRef();
    const myInput2 = useRef();


  const handleMemeText = (e) => {
    e.preventDefault();
    //find the name attribute of the target
    // console.log(`${e.target.name}:${e.target.value}`);
    //[e.target.name] => "computed property"
dispatch({ type: "text1", payload: { topText: myInput1.current.value, bottomText: myInput2.current.value } });
};

const handleUpload = (e) => {
    //e.target.value will just give us a fakepath and file name
    //https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    // console.log(e.target.files[0].name);
    //expects a file data
    //blob: file-like object of raw data
    //URL: constructor that creates the url of what we are loading
    dispatch({ type: "custom", payload: URL.createObjectURL(e.target.files[0]) });
};

const handleRandom = () => {
    // we don't need +1 (so that we also get the last index and not only 99 in our case) because we index at 0. If we say * 100 we would need to add +1
    dispatch({ type: "random", payload: Math.floor(Math.random() * state.memes.length) });
};


return (
    <div className="flex flex-col items-center space-y-4 p-4">
        <div className="flex flex-col items-center space-y-2">
            <label className="text-lg font-semibold">Top Text</label>
            <input
                onChange={handleMemeText}
                ref={myInput1}
                type="text"
                name="topText"
                id="topText"
                className="input input-bordered w-full max-w-xs"
            />
        </div>
        <div className="flex flex-col items-center space-y-2">
            <label className="text-lg font-semibold">Bottom Text</label>
            <input
                onChange={handleMemeText}
                ref={myInput2}
                type="text"
                name="bottomText"
                id="bottomText"
                className="input input-bordered w-full max-w-xs"
            />
        </div>
        <button onClick={handleRandom} className="btn btn-primary mt-4">Random</button>
        <br />
        <input type="file" id="input" multiple onChange={handleUpload} className="file-input file-input-bordered w-full max-w-xs mt-4" />
    </div>
);
};

export default Format;
