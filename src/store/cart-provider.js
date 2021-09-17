import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const addedCart = state.items.concat(action.item);
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items : addedCart,
            totalAmount: updateTotalAmount
        }
    }
    return defaultCartState
};

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = item => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    };

    const removeItemHandler = id => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;