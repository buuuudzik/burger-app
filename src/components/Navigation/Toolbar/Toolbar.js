import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import SideDrawer from '../SideDrawer/SideDrawer';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <SideDrawer />
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;