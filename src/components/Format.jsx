import { useContext, useRef } from "react";
import { MemeContext } from "../context/contextMeme.jsx";

const Format = () => {
  const { state, dispatch } = useContext(MemeContext);
  
    const myInput1 = useRef();
    const myInput2 = useRef();


  const handleMemeText = (e) => {
    e.preventDefault();
    //find the name attribute of the target
    console.log(`${e.target.name}:${e.target.value}`);
    //[e.target.name] => "computed property"
dispatch({ type: "text1", payload: {[e.target.name]: e.target.value} });
};

const handleUpload = (e) => {
    //e.target.value will just give us a fakepath and file name
    //https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    console.log(e.target.files[0].name);
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
    <div>
        <input
            onChange={handleMemeText}
            ref={myInput1}
            type="text"
            name="topText"
        />
        <input
            onChange={handleMemeText}
            ref={myInput2}
            type="text"
            name="bottomText"
        />
        <button onClick={handleRandom}>random</button>
        <br />
        <input type="file" id="input" multiple onChange={handleUpload} />
    </div>
);
};

export default Format;
