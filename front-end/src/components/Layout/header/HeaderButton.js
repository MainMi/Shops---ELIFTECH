import CardIcon from '../../Card/CardIcon';
import classes from './HeaderButton.module.css';

import { uiAction } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

const HeaderButton = () => {
    let animateCard = useSelector(state => state.ui.animateCard);
    const dispath = useDispatch();
    const isVisibleCard = () => dispath(uiAction.toggle());
    console.log(animateCard);
    animateCard = animateCard ? classes.animateCard : '';
    const className = `${classes.cardBtn} ${animateCard}`;
    return <div className={className} onClick={isVisibleCard}>
        <CardIcon/>
        <h4 className={classes.title} >Your Card</h4>
    </div>
}

export default HeaderButton;