import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    updatePurchaseState = () => {
        let ingredients = this.props.ingredients;
        let sum = Object.keys(ingredients).map(i => ingredients[i]).reduce((sum,el) => sum+el, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
        };
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        this.props.onIngredientsInit();
    }

    render() {
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            );
            
            orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.price} purchaseCanceled={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} />;
        };

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.brb.ingredients,
        price: state.brb.price,
        error: state.brb.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onIngredientsInit: (ingredientName) => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));