import React, { useState, useEffect } from "react";
import navClasses from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import Person from "@material-ui/icons/Person";
import NavigationPath from "./Navigations";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import navImage from "assets/img/logo.png";
const useStyles = makeStyles(styles);
const MainNavigation = () => {
  const classes = useStyles();
  const { innerWidth: width, innerHeight: height } = window;
  const [hideNav, setHideNav] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const History = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //console.log(width);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openUserProfileHandler = () => {
    History.push("/admin/user");
  };

  const openSideMenuHandler = () => {
    setOpenSideMenu(true);
  };

  const closeSideMenuHandler = () => {
    setOpenSideMenu(false);
  };

  // useEffect(() => {
  //   function handleResize() {
  //     if (window.innerWidth <= 768) {
  //       setHideNav(true);
  //     } else {
  //       setHideNav(false);
  //       setOpenSideMenu(false);
  //     }
  //   }
  //   window.addEventListener("resize", handleResize);
  // }, [window.innerWidth, handleResize]);

  return (
    <header className={navClasses.header}>
      <div className={navClasses.logo}>
        <img src={navImage} />
      </div>
      {openSideMenu && (
        <div
          className={navClasses.backdrop}
          onClick={closeSideMenuHandler}
        ></div>
      )}
      {openSideMenu && (
        <div className={navClasses["mobile-nav"]}>
          {NavigationPath.map((path, index) => {
            return (
              <List key={index}>
                <ListItem button>
                  <ListItemIcon></ListItemIcon>
                  <NavLink
                    to={path.path}
                    className={classes.item}
                    activeClassName="active"
                  >
                    <ListItemText primary={path.name} />
                  </NavLink>
                </ListItem>
              </List>
            );
          })}
        </div>
      )}
      {hideNav && (
        <button
          className={navClasses["toggle-button"]}
          onClick={openSideMenuHandler}
        >
          <span className={navClasses["toggle-button__bar"]}></span>
          <span className={navClasses["toggle-button__bar"]}></span>
          <span className={navClasses["toggle-button__bar"]}></span>
        </button>
      )}

      {!hideNav && (
        <nav>
          <ul>
            {NavigationPath.map((path, index) => {
              return (
                <li key={index}>
                  <NavLink to={path.path} activeClassName={navClasses.active}>
                    {path.name}
                  </NavLink>
                </li>
              );
            })}

            <li>
              <div className={classes.manager}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.buttonLink}
                  // color={window.innerWidth > 959 ? "transparent" : "white"}
                  // justIcon={window.innerWidth > 959}
                >
                  <Person className={classes.icons} />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={openUserProfileHandler}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
export default MainNavigation;
