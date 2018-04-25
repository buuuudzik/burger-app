import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Sławek Budzyński',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Poland'
                },
                email: 'example.gmail.com'
            }
        }
        console.log(order)
        axios.post('/orders.json', order).then(response => {
            console.log('Przesłano zamówienie', response);
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            console.log('Nie przesłano zamówienia', error);
            this.setState({loading: false});
        });
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" name="name" placeholder="Your Name" />
                <Input inputtype="input" name="email" placeholder="Your Email" />
                <Input inputtype="input" name="street" placeholder="Street" />
                <Input inputtype="input" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={(e) => this.orderHandler(e)}>ORDER</Button>
            </form>
        );
        if (this.state.loading) form = <Spinner />;

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;