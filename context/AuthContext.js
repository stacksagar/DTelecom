import { createContext, useReducer, useContext, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthState = {
  user: {},
};

const reducer = (state = AuthState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "set_user":
      return { ...state, user: { ...payload } };

    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, AuthState);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {});
  }, []);

  function register(form) {
    dispatch({ type: "set_loading" });
    return createUserWithEmailAndPassword(auth, form?.email, form?.new_password)
      .then(() => {
        updateProfile(auth.currentUser, {
          photoURL: "default link",
        });
      })
      .catch((error) => {})
      .finally(() => {});
  }

  function logout() {
    return signOut(auth);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {});
      })
      .catch((error) => {})
      .finally(() => {});
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
