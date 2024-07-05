import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation  } from 'react-router-dom';
import AdminLayout from 'layouts/admin';
import routes from 'routes';

import { ProtectedRoute } from 'components/ProtectedRoute';
import { publicRoutes } from 'routes';
import { endOfDate } from 'utils/helper';
import ModalAddServicePackage from 'components/modal/ModalAddServicePackage';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {  
  const { user, show } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleRefreshLogin = async() => {
        const storage = await localStorage.getItem("user");
        const currentDate = new Date();
        if (storage) {
            if (currentDate.getTime() > (endOfDate(storage.expireAt))?.getTime()) {
                await localStorage.removeItem('user');
                navigate('/auth/log-in');
            } else {
                navigate('/admin/dashboard');
            }
        } else navigate('/auth/log-in');

    }
    handleRefreshLogin();
  }, [])

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
        case '/admin/dashboard':
            document.title = 'SBH - Dashboard';
            break;
        case '/admin/account-management':
            document.title = 'SBH - Account Management';
            break;
        case '/admin/stores-management':
            document.title = 'SBH - Stores Management';
            break;
        case '/admin/transactions-management':
            document.title = 'SBH - Transactions Management';
            break;
        case '/admin/package-management':
            document.title = 'SBH - Package Management';
            break;
        case '/admin/profile':
            document.title = 'SBH - Profile Management';
            break;
        case '/auth/log-in':
            document.title = 'SBH - LogIn';
            break;
        case '/auth/forgot-password':
            document.title = 'SBH - Recovery Password';
            break;
        default:
            document.title = 'SBH - Dashboard';
        }
    }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        {routes.map((route, index) => {
              let Layout = AdminLayout;

              if (route.layout) {
                  Layout = route.layout;
              } else if (route.layout === null) {
                  Layout = Fragment;
              }

              const Page = route.component;
              return (
                  <Route
                      key={index}
                      path={route.path}
                      element={
                          <ProtectedRoute user={user} children={<Page />}>
                              <Layout>
                                  <Page />
                              </Layout>
                          </ProtectedRoute>
                      }
                  />
              );
          })}
          {publicRoutes.map((route, index) => {
              let Layout = AdminLayout;

              if (route.layout) {
                  Layout = route.layout;
              } else if (route.layout === null) {
                  Layout = Fragment;
              }

              const Page = route.component;
              return (
                  <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                            <Page />
                        </Layout>
                      }
                  />
              );
          })}
      </Routes>
      {show && <ModalAddServicePackage />}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
