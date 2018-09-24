import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
const componentName = () => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DestopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default componentName;
