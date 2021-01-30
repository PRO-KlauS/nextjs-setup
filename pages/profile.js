import Profile from "../src/pages/profile";
import Cookies from "cookies";

export default Profile;

export const getServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");
  if (token) {
    return { props: {} };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
};
