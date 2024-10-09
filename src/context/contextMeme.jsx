import { createContext, useReducer } from 'react';

// Initial state
const initialState = {
    memes: [],
    data: null,
};

// Reducer function
const memeReducer = (state, action) => {
    switch (action.type) {
        case 'meme':
            return {
                ...state,
                memes: [...state.memes, action.payload],
            };
        case 'data':
            return {
                ...state,
                selectedMeme: action.payload,
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