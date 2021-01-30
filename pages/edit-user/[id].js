import EditUser from "../../src/pages/editUser";
import Cookies from "cookies";

export default EditUser;

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
