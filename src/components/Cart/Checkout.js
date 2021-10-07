import { useRef, useState }from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const fiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const nameInputValue = useRef();
    const addressInputValue = useRef();
    const postalInputValu = useRef();
    const cityInputValue = useRef();

    const [formValidity, setFormValidity] = useState({
        name: true,
        address: true,
        zipCode: true,
        city: true
    });

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputValue.current.value;
        const enteredAddress = addressInputValue.current.value;
        const enteredZipCode = postalInputValu.current.value;
        const enteredCity = cityInputValue.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredZipCodeIsValid = fiveChars(enteredZipCode);

        setFormValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            zipCode: enteredZipCodeIsValid,
            city: enteredCityIsValid
        });

        const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredCityIsValid && enteredZipCodeIsValid;

        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            city: enteredCity,
            zipCode: enteredZipCode
        });
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your name</label>
                <input type="text" id="name" ref={nameInputValue}/>
                {!formValidity.name && <p>Please enter a valid name!</p> }
            </div>
            <div className={`${classes.control} ${formValidity.address ? '' : classes.invalid}`}>
                <label htmlFor='address'>Your address</label>
                <input type="text" id="address" ref={addressInputValue}/>
                {!formValidity.address && <p>Please enter a valid address!</p> }
            </div>
            <div className={`${classes.control} ${formValidity.zipCode ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Zip Code</label>
                <input type="text" id="postal" ref={postalInputValu}/>
                {!formValidity.zipCode && <p>Please enter a valid zip code!</p> }
            </div>
            <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type="text" id="city" ref={cityInputValue}/>
                {!formValidity.city && <p>Please enter a valid city!</p> }
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
