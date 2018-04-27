import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const usedIngredients = [];
    for (let ingName in props.ingredients) {
        let amount = props.ingredients[ingName];
        if (amount > 0) usedIngredients.push({name: ingName, amount: props.ingredients[ingName]});
    };
    const ingredientsOutput = usedIngredients.map(ing => {
        return <span key={ing.name} style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}>{`${ing.name} (${ing.amount})`}</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;