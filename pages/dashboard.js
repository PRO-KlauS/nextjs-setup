import React from "react";
import Dashboard from "../src/pages/dashboard";
// import { getDashBoardDetails } from "../src/apis/dashboard";
import Cookies from "cookies";

const DashboardContainer = (props) => {
  return <Dashboard {...props} />;
};

export default DashboardContainer;

export const getServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");
  if (token) {
    let dashboardDetails = {
      entities: 0,
      urls: 0,
      datapoints: 0,
      newEntities: 0,
    };
    // let res = await getDashBoardDetails("", {
    //   Authorization: "Bearer " + token,
    // });
    // if (res.data.status) {
    //   dashboardDetails = {
    //     entities: res.data.data ? res.data.data.entities : 0,
    //     urls: res.data.data ? res.data.data.urls : 0,
    //     datapoints: res.data.data ? res.data.data.datapoints : 0,
    //     newEntities: res.data.data ? res.data.data.new_entities : 0,
    //   };
    // }
    return { props: { dashboardDetails } };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
};
