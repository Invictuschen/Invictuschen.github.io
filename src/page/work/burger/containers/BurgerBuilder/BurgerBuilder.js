import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import {Route, Switch, Redirect} from 'react-router-dom'
const INGREDIENT_PRICE = {
  salad: 0.7,
  meat: 1.3,
  cheese: 0.8,
  bacon: 1.0
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    price: 5,
    purchasable: false,
    purchasing: false
  };
  purchasableState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    console.log(sum);
    this.setState({ purchasable: sum > 0 });
  };
  addIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updateIngredients = { ...this.state.ingredients }; //if used array, will cause the wrong input and result an exception
    updateIngredients[type] = newCount;
    const oldPrice = this.state.price;
    const newPrice = oldPrice + INGREDIENT_PRICE[type];
    this.setState({
      ingredients: updateIngredients,
      price: newPrice
    });
    this.purchasableState(updateIngredients);
  };
  removeIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount - 1;
    const updateIngredients = { ...this.state.ingredients }; //if used array, will cause the wrong input and result an exception
    updateIngredients[type] = newCount;
    const oldPrice = this.state.price;
    const newPrice = oldPrice - INGREDIENT_PRICE[type];
    this.setState({
      ingredients: updateIngredients,
      price: newPrice
    });
    this.purchasableState(updateIngredients);
  };
  purchasingHandler = () => {
    this.setState({
      purchasing: true
    });
  };
  cancelpurchasingHandler = () => {
    this.setState({
      purchasing: false
    });
  };
  continuepurchasingHandler = () => {
      alert("You continue!");
      const w=window.open('about:blank');
      w.location.href='/';
  };
  render() {
    const disableInfo = { ...this.state.ingredients };
    console.log(disableInfo);
    for (let i in disableInfo) {
      disableInfo[i] = disableInfo[i] <= 0;
    }
    // const disableInfo = Object.values(this.state.ingredients);
    // console.log(disableInfo);
    // disableInfo.forEach(element => {
    //   element = element <= 0;
    // });
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          cancelShow={this.cancelpurchasingHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchasecancel={this.cancelpurchasingHandler}
            purchasecontinue={this.continuepurchasingHandler}
            price={this.state.price}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          addIngredient={this.addIngredientsHandler}
          removeIngredient={this.removeIngredientsHandler}
          disableInfo={disableInfo}
          price={this.state.price}
          purchasable={this.state.purchasable}
          ordered={this.purchasingHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
