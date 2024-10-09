import {useContext} from 'react';
import {MemeContext} from '../context/contextMeme.jsx';

const PicRadio = () => {
    const { dispatch } = useContext(MemeContext);
    const handleRangeChange = (range) => {
        dispatch({ type: "range", payload: range });
    };
  return (
    <div className="join">
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
  )
}

export default PicRadio