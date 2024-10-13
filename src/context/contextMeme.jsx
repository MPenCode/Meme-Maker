import { createContext, useReducer } from "react";

// Initial state
const initialState = {
  images: [],
  memes: JSON.parse(localStorage.getItem("memes")) || [],
  range: [0, 25],
  random: 0,
  text1: {
    topText: "",
    bottomText: "",
  },
  custom: [],
  search: [],
  searchValue: "",
  memeName: "my-meme",
  colorMeme1: "#000000",
  colorMeme2: "#000000",
  resultImage: null,
  storedMemes: JSON.parse(localStorage.getItem("myMemes")) || [],
};

// Reducer function
const memeReducer = (state, action) => {
  switch (action.type) {
    case "memes":
      return {
        ...state,
        memes: action.payload,
      };
    case "images":
      return {
        ...state,
        images: action.payload,
      };
    case "range":
      return {
        ...state,
        range: action.payload,
      };
    case "random":
      return {
        ...state,
        random: action.payload,
      };
    case "text1":
      return {
        ...state,
        text1: action.payload,
      };
    case "custom":
      return {
        ...state,
        custom: action.payload,
      };
    case "search":
      return {
        ...state,
        search: action.payload,
      };
    case "searchValue":
      return {
        ...state,
        searchValue: action.payload,
      };
    case "memeName":
      return {
        ...state,
        memeName: action.payload,
      };
    case "colorMeme1":
      return {
        ...state,
        colorMeme1: action.payload,
      };
    case "colorMeme2":
      return {
        ...state,
        colorMeme2: action.payload,
      };
    case "resultImage":
      return {
        ...state,
        resultImage: action.payload,
      };
    case "storedMemes":
      return {
        ...state,
        storedMemes: action.payload,
      };

    default:
      return state;
  }
};

// useEffect(() => {
//   dispatch({ type: "storedMemes", payload: JSON.parse(localStorage.getItem("myMemes")) });
// }, []);

// Create context
export const MemeContext = createContext();

// Context provider component
export const MemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memeReducer, initialState);

  return (
    <MemeContext.Provider value={{ state, dispatch }}>
      {children}
    </MemeContext.Provider>
  );
};
