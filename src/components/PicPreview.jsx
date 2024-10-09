import { useContext } from "react";
import { MemeContext } from "../context/contextMeme.jsx";

export default function PicPreview() {
  const { state, dispatch } = useContext(MemeContext);
  const handleClick = (value) => {
    //first try:
    // console.log(images.indexOf(value));
    dispatch({ type: "random", payload: state.memes.indexOf(value) });
  };
  return (
    <details className="collapse bg-base-200">
  <summary className="collapse-title text-xl font-medium">Click to open/close</summary>
  <div className="collapse-content">
  <div className="images-container">
      {state.memes.map((image) => {
        return (
          <div key={image.id} className="image-wrapper">
            <img
              onClick={() => {
                handleClick(image);
              }}
              src={image.url}
              alt={image.name}
            />
          </div>
        );
      })}
    </div>
  </div>
</details>
  );
}
