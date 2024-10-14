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
  colorText: {
    colorTop: "#ffffff",
    colorBottom: "#ffffff",
  },
  resultImage: null,
  storedMemes: JSON.parse(localStorage.getItem("myMemes")) || [],
  textRange: {
    rangeTop: 30,
    rangeBottom: 30,
  },
  positionTop: "top-4 left-1/2",
  positionBottom: "bottom-4 left-1/2",
  topBoxBulean: false,
  bottomBoxBulean: false,
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
    case "textRange":
      return {
        ...state,
        textRange: action.payload,
      };
    case "positionTop":
      return {
        ...state,
        positionTop: action.payload,
      };
    case "positionBottom":
      return {
        ...state,
        positionBottom: action.payload,
      };
    case "colorText":
      return {
        ...state,
        colorText: action.payload,
      };
    case "topBoxBulean":
      return {
        ...state,
        topBoxBulean: action.payload,
      };
    case "bottomBoxBulean":
      return {
        ...state,
        bottomBoxBulean: action.payload,
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
