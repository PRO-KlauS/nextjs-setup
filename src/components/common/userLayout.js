import React from "react";
import { Sidebar, Header, Footer, FullScreenLoader } from "../index";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/common/index.scss";
// import "../../styles/appStyle.scss";

const UserLayout = ({ loaderCount, component }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <main>{component}</main>
      {loaderCount > 0 && <FullScreenLoader />}
      <Footer />
    </>
  );
};
export default UserLayout;
