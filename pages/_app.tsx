import "../styles/globals.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Router from "next/router";
import ContextProvider from "context";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

(() => {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
})();

function MyApp({ Component, pageProps }) {

  return (
    <ContextProvider>
      <main>
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </ContextProvider>
  );
}

export default MyApp;
