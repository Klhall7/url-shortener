import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Outlet id='outlet' />
        </>
    );
}

export default Layout