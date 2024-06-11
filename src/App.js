import './App.css';
import { Routes, Route, useNavigate  } from 'react-router-dom';
import AdminLayout from 'layouts/admin';
import routes from 'routes';
import { Fragment, useEffect } from 'react';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { publicRoutes } from 'routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { endOfDate } from 'utils/helper';
import ModalAddServicePackage from 'components/modal/ModalAddServicePackage';

function App() {  
  const { user, show } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
