import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";
const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{
          props.ingredients[igKey]
        }
      </li>
    );
  });
  console.log(ingredientsSummary);
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>
          Total Price: <span>{props.price.toFixed(2)}</span>
        </strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchasecancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchasecontinue} >
        Continue
      </Button>
    </Aux>
  );
};

export default OrderSummary;
