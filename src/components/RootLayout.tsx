import { Outlet } from 'react-router-dom';

const RootLayout = () => (
  <div className='min-h-screen'>
    <Outlet />
  </div>
);

export default RootLayout;
