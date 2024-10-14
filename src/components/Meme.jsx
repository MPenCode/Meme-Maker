import { useContext, useRef, useEffect} from "react";
import { MemeContext } from "../context/contextMeme.jsx";


const Meme = () => {
  const { state, dispatch } = useContext(MemeContext);

  const myImage = useRef(null);

  useEffect(() => {
  dispatch({ type: "resultImage", payload: myImage.current });
  
  }, [myImage.current]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <div className="meme-container relative border" ref={myImage}>
        {state.memes.length && (
          <img
            src={
              state.custom.length > 0
                ? state.custom
                : state.memes[state.random].url
            }
            alt={state.memes[state.random].name}
            className="w-[30rem] object-contain mx-auto"
          />
        )}
        <p
          className={`top absolute transform -translate-x-1/2 text-xl font-bold ${state.positionTop}`}
          style={{ color: state.colorText.colorTop, WebkitTextStroke: "1px black", fontSize: state.textRange.rangeTop + "px" }}
        >
          {state.text1?.topText}
        </p>
        <p
          className={`bottom absolute transform -translate-x-1/2 text-xl font-bold ${state.positionBottom}`}
          style={{ color: state.colorText.colorBottom, WebkitTextStroke: "1px black", fontSize: state.textRange.rangeBottom + "px" }}
        >
          {state.text1?.bottomText}
        </p>
      </div>
    </div>
  );
};

export default Meme;
