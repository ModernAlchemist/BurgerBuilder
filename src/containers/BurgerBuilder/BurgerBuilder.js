import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        }

        const sum = Object.keys(ingredients).map((igKey)=>ingredients[igKey]).reduce((a,b)=>a+b,0);

        this.setState({purchaseable: sum > 0});
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0){
            return;
        }
        const ingr = {...this.state.ingredients};
        ingr[type]--;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENTS_PRICES[type];

        this.setState({ingredients:ingr, totalPrice: newPrice});
        this.updatePurchaseState(ingr);
    };

    addIngredientHandler = (type) => {
        const ingr = {...this.state.ingredients};
        ingr[type]++;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICES[type];

        this.setState({ingredients:ingr, totalPrice: newPrice});
        this.updatePurchaseState(ingr);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

    }

    render () {
        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCanceledHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    ordered={this.purchaseHandler}
                    disabled={disableInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;