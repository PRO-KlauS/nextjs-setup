import React from "react";
import { Dropdown } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { constants } from "../../constants";

const HeaderDropdown = ({ profile, logout }) => {
  const { profilePlaceholder, logOutPlaceholder } = constants.header;
  const router = useRouter();
  const onLogout = () => {
    logout().then(() => {
      const cookies = new Cookies();
      cookies.remove("token");
      router.replace("/login");
    });
  };
  const navigateToProfilePage = () => router.push("/profile");
  return (
    <Dropdown>
      <Dropdown.Toggle variant="default" id="dropdown-basic">
        <i className="fas fa-user-circle" />
        <span className="user-name">
          {profile &&
            profile.first_name &&
            profile.first_name + " " + profile.last_name}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu align={"right"}>
        <Dropdown.Item onClick={navigateToProfilePage}>
          <i className="fas fa-user-cog" />
          {profilePlaceholder}
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>
          <i className="fas fa-sign-in-alt fa-rotate-180" />
          {logOutPlaceholder}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HeaderDropdown;
