import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />;
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        if (this.props.ingredients) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
                </div>
            );
        };

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.brb.ingredients,
        purchased: state.ord.purchased
    };
};

export default connect(mapStateToProps)(Checkout);