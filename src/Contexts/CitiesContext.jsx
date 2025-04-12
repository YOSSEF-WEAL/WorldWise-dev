import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const initState = {
  cities: [],
  isLoding: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoding: true };

    case "cities/loaded":
      return { ...state, isLoding: false, cities: action.payload };

    case "city/loaded":
      return {
        ...state,
        isLoding: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoding: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoding: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoding: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknwn action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoding, currentCity, error }, dispatch] = useReducer(
    reducer,
    initState
  );
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Ther Was An Error Loading Data...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Ther Was An Error Loading Citys...",
      });
    }
  }

  async function CreateCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application.json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Ther Was An Error Createing City.",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Ther Was An Error deleting city.",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoding,
        currentCity,
        error,
        getCity,
        CreateCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
