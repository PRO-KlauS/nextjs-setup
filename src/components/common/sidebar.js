import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar";
import {
  setSidebarCollapse,
  setSidebarVisibility,
} from "../../actions/sidebar";
import { getSidebarMenuClasses } from "../../utility/common";
import { constants } from "../../constants";
import "react-pro-sidebar/dist/css/styles.css";
// import "../../styles/sidebar.scss";

const Sidebar = ({ isCollapsed, profile, isVisible, setSidebarVisibility }) => {
  const router = useRouter();
  let sidebarMenuClasses = getSidebarMenuClasses(router.pathname);
  const closeSidebar = () => setSidebarVisibility(false);
  const { manageUsersPlaceholder, dashboardPlaceholder } = constants.sidebar;
  return (
    <ProSidebar
      collapsed={isCollapsed}
      breakPoint="lg"
      toggled={isVisible}
      onToggle={setSidebarVisibility}
    >
      <SidebarHeader>
        {isCollapsed ? (
          <img alt="Icon logo" src="/images/icon-logo.png" />
        ) : (
          <img alt="Logo" src="/images/white-logo.png" />
        )}
        <i className="fas fa-times close-sidebar" onClick={closeSidebar} />
      </SidebarHeader>
      <Menu iconShape="round">
        <MenuItem
          className={sidebarMenuClasses.dashboard}
          icon={<i className="fa fa-tachometer-alt" />}
        >
          <Link
            href={{
              pathname: "/dashboard",
            }}
          >
            <a onClick={closeSidebar}>{dashboardPlaceholder}</a>
          </Link>
        </MenuItem>
        {profile.is_admin ? (
          <MenuItem
            className={sidebarMenuClasses.manageUsers}
            icon={<i className="fa fa-user-plus" />}
          >
            <Link
              href={{
                pathname: "/manage-users",
              }}
            >
              <a onClick={closeSidebar}>{manageUsersPlaceholder}</a>
            </Link>
          </MenuItem>
        ) : (
          <></>
        )}
      </Menu>
    </ProSidebar>
  );
};

const mapStateToProps = (state) => ({
  isCollapsed: state.sidebar.isCollapsed,
  isVisible: state.sidebar.isVisible,
  profile: state.profile,
});

const mapDispatchToProps = { setSidebarCollapse, setSidebarVisibility };

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
