import { useContext, useState, useEffect } from "react";
import { MemeContext } from "../context/contextMeme.jsx";
import { AiOutlineDownload, AiFillDelete, AiOutlineExpand  } from "react-icons/ai";

export default function MemeGallery() {
  const { state, dispatch } = useContext(MemeContext);
  const [clickedImage, setClickedImage] = useState(null);

  const handleImageClick = (meme) => {
    setClickedImage(meme);
  };

  // Filter on the basis of current date on first Load
  useEffect(() => {
    const currentDate = new Date();
    const filteredMemes = state.storedMemes.filter(meme => meme.id > currentDate);
    localStorage.setItem("myMemes", JSON.stringify(filteredMemes));
    dispatch({ type: "storedMemes", payload: filteredMemes });
  }, []);

  const handleDelete = (data) => {
    const updatedMemes = state.storedMemes.filter((meme) => meme !== data);
    localStorage.setItem("myMemes", JSON.stringify(updatedMemes));
    dispatch({ type: "storedMemes", payload: updatedMemes });
  };

  const handleDownload = (meme) => {  
        var link = document.createElement("a");
        link.download = meme.name + ".jpeg";
        link.href = meme.dataUrl;
        link.click();
      };

  return (
    <div className="px-20">
      {clickedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-base-100 p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setClickedImage(null)}
            >
              &times;
            </button>
            <p className="text-lg font-bold text-center mt-2 mb-4">
              {clickedImage.name}
            </p>
            <img
              src={clickedImage.dataUrl}
              alt={clickedImage.name}
              className="max-w-[80vw] max-h-[80vh] object-contain"
              onClick={() => setClickedImage(null)}
            />
          </div>
        </div>
      )}
      {state.storedMemes.length === 0 ? (
        <div className="text-center text-lg font-bold mt-10 border rounded p-5 mb-4">
          Make a Meme, it will be shown here
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center ">
          {state.storedMemes.map((meme, index) => (
            <div
              key={index}
              className="meme-container relative border p-4 flex flex-col items-center rounded-lg"
            >
              <p className="text-lg font-bold text-center mt-2 mb-4">
                {meme.name}
              </p>
              <img
                src={meme.dataUrl}
                alt={meme.name}
                className="w-[100px] h-[100px] object-cover border border-gray-400 hover:scale-110 cursor-pointer transition-transform duration-200 mb-4"
                onClick={() => handleImageClick(meme)}
              />
              <div className="flex justify-around items-center space-x-2">
                <button className="btn btn-xs btn-outline btn-primary hover:btn-primary"
                onClick={() => handleImageClick(meme)}
                >
                  <AiOutlineExpand />
                </button>
                <button className="btn btn-xs btn-outline btn-success hover:btn-success"
                onClick={() => handleDownload(meme)}
                >
                  <AiOutlineDownload />
                </button>
                <button
                  className="btn btn-xs btn-outline btn-error hover:btn-error"
                  onClick={() => handleDelete(meme)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
