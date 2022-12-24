import { createContext, useReducer, useContext, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import set_formError from "../utils/set_formError";
import set_user from "../utils/set_user";
import { ref, set } from "firebase/database";

const AuthState = {
  user: null,
  formError: "",
  authLoading: false,
};

const reducer = (state = AuthState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "set_user":
      return { ...state, user: payload };

    case "set_formError":
      return { ...state, formError: payload };

    case "clear_formError":
      return { ...state, formError: "" };

    case "set_authLoading":
      return { ...state, authLoading: true };
    case "clear_authLoading":
      return { ...state, authLoading: false };

    case "logout":
      return { ...state, user: null };

    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, AuthState);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      set_user(dispatch, user);
    });
  }, []);

  function register(values) {
    dispatch({ type: "set_authLoading" });
    return createUserWithEmailAndPassword(auth, values?.email, values?.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          photoURL: "https://i.ibb.co/kq3v481/user-318-875902.png",
          displayName: values?.name,
        });
      })
      .catch((error) => {
        set_formError(dispatch, error?.message?.split("Error")[1]);
      })
      .finally(() => {
        dispatch({ type: "clear_authLoading" });

        auth.onAuthStateChanged((user) => {
          if (user?.uid) {
            set(ref(db, `/users/${user?.uid}`), {
              ...values,
              balance: 0,
              notifications: null,
            });
          }
        });
      });
  }

  function logout() {
    dispatch({ type: "logout" });
    return signOut(auth);
  }

  function login(values) {
    dispatch({ type: "set_authLoading" });
    return signInWithEmailAndPassword(auth, values?.email, values?.password)
      .catch((error) => {
        set_formError(dispatch, error?.message?.split("Error")[1]);
      })
      .finally(() => {
        dispatch({ type: "clear_authLoading" });
      });
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
