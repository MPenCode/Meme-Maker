import { createContext, useReducer } from "react";

// Initial state
const initialState = {
  images: [],
  memes: [],
  range: [0, 25],
  random: 0,
  text1: "",
  custom: [],
  search: "",
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

    default:
      return state;
  }
};

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
