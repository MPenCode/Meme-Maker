import React, { useEffect, useContext } from "react";
import { MemeContext } from "../context/contextMeme.jsx";
import PicRadio from "./PicRadio.jsx";

const PicGallery = () => {
    const { state, dispatch } = useContext(MemeContext);

    useEffect(() => {
        const cachedMemes = localStorage.getItem("memes");
        if (cachedMemes) {
            dispatch({ type: "memes", payload: JSON.parse(cachedMemes) });
        } else {
            fetch("https://api.imgflip.com/get_memes")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("error of fetching memes");
                    }
                    return res.json();
                })
                .then((data) => {
                    localStorage.setItem("memes", JSON.stringify(data.data.memes));
                    dispatch({ type: "memes", payload: data.data.memes });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    const handleClick = (value) => {
        console.log(value);
    };
    const results = state.searchValue === "" 
        ? state.memes 
        : state.search.filter((image) => {
            return image.name.toLowerCase().includes(state.searchValue.toLowerCase());
        });

    return (
        <div className="flex flex-col items-center my-8">
            <PicRadio />
            <div className="grid grid-cols-5 gap-4 mb-4">
                {results.slice(state.range[0], state.range[1]).map((image) => {
                    return (
                        <div className="relative" key={image.id}>
                            <img
                                onClick={() => {
                                    handleClick(image);
                                }}
                                src={image.url}
                                alt={image.name}
                                className="w-[100px] h-[100px] object-cover border border-gray-400 hover:scale-110 cursor-pointer transition-transform duration-200"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PicGallery;

// {state.memes.slice(state.range[0], state.range[1]).map((image) => {
//     return (
//         <div className="relative" key={image.id}>
//             <img
//                 onClick={() => {
//                     handleClick(image);
//                 }}
//                 src={image.url}
//                 alt={image.name}
//                 className="w-[100px] h-[100px] object-cover border border-gray-400 hover:scale-110 cursor-pointer transition-transform duration-200"
//             />
//         </div>
//     );
// })}