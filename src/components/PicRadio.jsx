import { useContext } from "react";
import { MemeContext } from "../context/contextMeme.jsx";

const PicRadio = () => {
  const { state, dispatch } = useContext(MemeContext);
  const handleRangeChange = (range) => {
    dispatch({ type: "range", payload: range });
  };

  const handleSearch = (e) => {
    dispatch({ type: "searchValue", payload: e.target.value });
    dispatch({
      type: "search",
      payload: state.memes.filter((meme) => {
        return meme.name.toLowerCase().includes(state.searchValue.toLowerCase());
      }),
    });
  };
  return (
    <div className="flex">
      <div className="form-control mr-2 mb-3">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search"
          className="input input-bordered w-full max-w-xs mr-2"
        />
      </div>
      <div className="join mb-3">
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="1"
          defaultChecked
          onClick={() => handleRangeChange([0, 25])}
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="2"
          onClick={() => handleRangeChange([25, 50])}
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="3"
          onClick={() => handleRangeChange([50, 75])}
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="4"
          onClick={() => handleRangeChange([75, 100])}
        />
      </div>
    </div>
  );
};

export default PicRadio;
