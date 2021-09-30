import classes from './MainNavigation.module.css';

function MainNavigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Logbook</div>
        </header>
    );
}

export default MainNavigation;
