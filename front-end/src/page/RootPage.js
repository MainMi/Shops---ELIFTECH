import { Outlet } from "react-router-dom";
import NotificationStatus from '../components/Notification/Notification-status';
import Header from '../Layout/header/Header';

function RootLayout() {
    return (
        <>
            <NotificationStatus />
            <Header/>
            <Outlet/>
        </>
    )
}

export default RootLayout;