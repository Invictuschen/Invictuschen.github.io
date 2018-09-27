import React from "react";
import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
const Burger = props => {
  let transformedIng = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((__, i) => {
        return <BurgerIngredients type={igKey} key={igKey + i} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIng.length === 0) {
    transformedIng = <p>Please select the ingredients on the panel!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIng}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
