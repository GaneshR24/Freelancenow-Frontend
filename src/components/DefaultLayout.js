import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/layout.css";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const freelancerMenu = [
    {
      name: "Home",
      icon: "ri-home-line",
      path: "/",
    },
    {
      name: "Applied",
      icon: "ri-file-list-line",
      path: "/applying",
    },
    {
      name: "Logout",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];
  const clientMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Projects",
      path: "/client/projects",
      icon: "ri-briefcase-fill",
    },
    {
      name: "Users",
      path: "/client/users",
      icon: "ri-user-line",
    },
    {
      name: "Applied",
      path: "/client/applying",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];

  const menuToBeRendered = user?.isClient ? clientMenu : freelancerMenu;
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("apply-now")) {
    activeRoute = "/";
  }

  return (
    <>
      <div className="layout-parent">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">
              <h1 className="logo">FN</h1>
            </div>
            <h1 className="role">
              {user?.fullName} <br />
              Role : {user?.isClient ? "Client" : "Freelancer"}
            </h1>
          </div>
          <div className="d-flex flex-column gap-3 justify-content-start menu">
            {menuToBeRendered.map((item, index) => {
              return (
                <div
                  className={`${
                    activeRoute === item.path && "active-menu-item"
                  } menu-item`}
                >
                  <i className={item.icon}></i>
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="header">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-content-center header-title">
                <h3 className="text-white">FreelanceNow</h3>
              </div>
              <div className="header-user">
                <div>{user?.fullName}</div>
                <i
                  className="ri-logout-box-r-line header-logout"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                ></i>
              </div>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
