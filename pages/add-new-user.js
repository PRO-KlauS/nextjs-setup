import AddNewUser from "../src/pages/addNewUser";
import Cookies from "cookies";

export default AddNewUser;

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
