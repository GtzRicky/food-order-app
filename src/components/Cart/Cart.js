import { useContext, useState, Fragment } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import classes from './Cart.module.css';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const [orderMade, setOrderMade] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const itemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const itemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const orderHandler = () => {
        setOrderMade(true);
    };

    const submitOrderHandler = async (userData) => {
        await fetch('https://react-udemy-http-b9e21-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                items: cartCtx.items
            })
        });
        setTimeout(() => {
            setSubmitted(true);
        }, 1500);
        setSubmitted(false);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={itemRemoveHandler.bind(null, item.id)}
                    onAdd={itemAddHandler.bind(null, item)}
                />
            )}
        </ul>
    );

    
    const showOrder = 
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {orderMade && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler}/>}
            {!orderMade && 
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
                </div>
            }
        </Fragment>

    return (
        <Modal onClose={props.onHideCart}>
            {!submitted && showOrder}
            {submitted &&
                <Fragment>
                    <p>Your order was received and it's on its way!</p>
                    <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                </div>
                </Fragment>
            }
        </Modal>
    );
};

export default Cart;