import classes from './ManagePage.module.css';

import AddStoreModal from '../components/Modal/AddStoreModal';
import ManageNotFound from '../components/Manage/ManageNotFound';
import { useSelector } from 'react-redux';
import ManageItems from '../components/Manage/ManageItems';

const ManagePage = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const { addStoreIsVisible } = useSelector((state) => state.ui);
    if (!userInfo || !userInfo.shops) {
        return;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return <div className={classes.background}>
        {!userInfo.shops.length ? <ManageNotFound/> : <ManageItems shops={userInfo.shops} maxShops={userInfo.maxShops}/>}
        {addStoreIsVisible && <AddStoreModal/>}
    </div>
}

export default ManagePage;

