import React, { createContext, useEffect, useReducer } from "react";

export const FavouriteContext = createContext();

const initial = { list: [] }; // items: {id, name, image, price}

function reducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return { list: action.payload || [] };

    case "ADD": {
      const exists = state.list.find((i) => i.id === action.payload.id);
      if (exists) return state; // không add trùng
      return { list: [...state.list, action.payload] };
    }

    case "REMOVE":
      return { list: state.list.filter((i) => i.id !== action.payload) };

    case "TOGGLE": {
      const exists = state.list.find((i) => i.id === action.payload.id);
      if (exists) {
        return { list: state.list.filter((i) => i.id !== action.payload.id) };
      }
      return { list: [...state.list, action.payload] };
    }

    default:
      return state;
  }
}

export const FavouriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fav.list"));
    if (saved) dispatch({ type: "LOAD", payload: saved });
  }, []);

  useEffect(() => {
    localStorage.setItem("fav.list", JSON.stringify(state.list));
  }, [state.list]);

  const value = {
    favourites: state.list,
    addFavourite: (p) => dispatch({ type: "ADD", payload: p }),
    removeFavourite: (id) => dispatch({ type: "REMOVE", payload: id }),
    toggleFavourite: (p) => dispatch({ type: "TOGGLE", payload: p }),
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};
