import { useContext } from "react";
import { MemeContext } from "../context/contextMeme";

export const PositionBottom = () => {
  const { state, dispatch } = useContext(MemeContext);
return (
    <div className="flex flex-col items-center">
        <label className="mb-1 text-xs">
            Position Box
        </label>
        <select
            id="meme-select-bottom"
            value={state.positionBottom}
            className="ml-2 p-1 h-7 border rounded input input-bordered max-w-xs text-xs"
            onChange={(e) => {
                dispatch({ type: "positionBottom", payload: e.target.value });
            }}
        >
            <option value="bottom-[5%] left-1/2">Bottom Center</option>
            <option value="bottom-[5%] left-1/4">Bottom Left</option>
            <option value="bottom-[5%] left-3/4">Bottom Right</option>
            <option value="bottom-1/4 left-1/2">Middle Center</option>
            <option value="bottom-1/4 left-1/4">Middle Left</option>
            <option value="bottom-1/4 left-3/4">Middle Right</option>
            <option value="bottom-[40%] left-1/2">Top Center</option>
            <option value="bottom-[40%] left-1/4">Top Left</option>
            <option value="bottom-[40%] left-3/4">Top Right</option>
        </select>
    </div>
);
};

export const PositionTop = () => {
  const { state, dispatch } = useContext(MemeContext);
  return (
    <div className="flex flex-col items-center">
      <label className="mb-1 text-xs"> Position Box</label>
        <select
          id="meme-select-top"
          value={state.positionTop}
          className="ml-2 p-1 h-7 border rounded input input-bordered max-w-xs text-xs"
          onChange={(e) => {
            dispatch({ type: "positionTop", payload: e.target.value });
          }}
        >
          <option value="top-[5%] left-1/4">Top Left</option>
          <option value="top-[5%] left-1/2">Center</option>
          <option value="top-[5%] left-3/4">Top Right</option>
          <option value="top-1/4 left-1/2">Middle Center</option>
          <option value="top-1/4 left-1/4">Middle Left</option>
          <option value="top-1/4 left-3/4">Middle Right</option>
          <option value="top-[40%] left-1/2">Top Center</option>
          <option value="top-[40%] left-1/4">Top Left</option>
          <option value="top-[40%] left-3/4">Top Right</option>
        </select>
    </div>
  );
};
