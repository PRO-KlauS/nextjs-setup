import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "../src/redux/store";
import Router from "../src/routes/router";
import NextRouter from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "pretty-checkbox/src/pretty-checkbox.scss";
import "../src/styles/index.scss";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

NextRouter.events.on("routeChangeStart", () => NProgress.start());
NextRouter.events.on("routeChangeComplete", () => NProgress.done());
NextRouter.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Component {...pageProps} />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
