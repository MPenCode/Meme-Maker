import { createContext, useReducer } from 'react';

// Initial state
const initialState = {
    images: [],
    memes: [],
    data: null,
    range: [0, 25],
};

// Reducer function
const memeReducer = (state, action) => {
    switch (action.type) {
        case 'memes':
            return {
                ...state,
                memes:  action.payload,
            };
        case 'images':
            return {
                ...state,
                images: action.payload,
            };
        case 'data':
            return {
                ...state,
                data: action.payload,
            };
        case 'range':
            return {
                ...state,
                range: action.payload,
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