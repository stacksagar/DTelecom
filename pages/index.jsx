import React, { useEffect } from "react";
import Landing from "../components/Home/Landing";
import Layout from "../components/Utils/Layout";

const Index = () => {
  function add_p(product) {
    const array = JSON.parse(localStorage.getItem("cart")) || [];
    array.push(product);
    localStorage.setItem("cart", JSON.stringify(array));
  }

  return (
    <Layout>
      <Landing />
    </Layout>
  );
};

export default Index;
