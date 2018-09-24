import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/work" active>
        CSS Burger Builder
      </NavigationItem>
      <NavigationItem link="/home">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
