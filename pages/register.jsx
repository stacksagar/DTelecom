import React from "react";
import Layout from "../components/Utils/Layout";
import BaseInput from "../components/Utils/BaseInput";
import BaseButton from "../components/Utils/BaseButton";
import Link from "next/link";

import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const { state, register } = useAuthContext();

  const [values, set_values] = useState({
    name: "",
    email: "",
    password: "",
  });

  function change_handler(e) {
    set_values((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function register_handler(e) {
    e?.preventDefault();

    register(values);
  }

  return (
    <Layout authPage={true}>
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right, #00000050, #00000050), url(/images/login-bg.jpg)",
          backgroundSize: "cover",
        }}
        className="w-full min-h-screen flex flex-col justify-between"
      >
        <h2 className="text-2xl text-white text-center h-24 flex items-center justify-center">
          Digital Telecom
        </h2>

        <form
          onSubmit={register_handler}
          className="w-[95%] sm:w-[90%] mx-auto p-6 sm:p-8 bg-white rounded-lg"
        >
          {" "}
          {state?.formError && (
            <p className="text-sm text-red-500 pb-2 flex items-center gap-x-1">
              <span className="text-xs">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </span>
              <span>{state?.formError}</span>
            </p>
          )}
          <div className="space-y-4">
            <BaseInput
              onChange={change_handler}
              placeholder="Your Name"
              name="name"
            />
            <BaseInput
              onChange={change_handler}
              placeholder="Email"
              type="email"
              name="email"
            />
            <BaseInput
              onChange={change_handler}
              placeholder="Password"
              type="password"
              name="password"
            />
          </div>
          <div className="my-5">
            <BaseButton loading={state?.authLoading} type="submit">
              Register
            </BaseButton>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-500">Already have an account?</p>
            <p className="font-medium text-purple-600">
              <Link href="/login">Login</Link>
            </p>
          </div>
          <div className="text-xs text-gray-500 pt-4 flex flex-wrap gap-x-1 items-center font-medium">
            <span>By signing in you accept our </span>
            <p className="text-purple-600 text-sm">
              <Link href="/login">Terms of use</Link>{" "}
            </p>
            <span>and</span>
            <p className="text-purple-600 text-sm">
              <Link href="/login">Privacy Policy</Link>
            </p>
          </div>
        </form>

        <div className="h-24"></div>
      </div>
    </Layout>
  );
};

export default Index;
