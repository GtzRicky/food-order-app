import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = props => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>MealsOrder</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="Our meals" />
            </div>
        </React.Fragment>
    );
};

export default Header;
