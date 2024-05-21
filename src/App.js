import './App.css';
import { Routes, Route, useNavigate  } from 'react-router-dom';
import AdminLayout from 'layouts/admin';
import routes from 'routes';
import { Fragment, useEffect } from 'react';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { publicRoutes } from 'routes';

function App() {  
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/dashboard')
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
    </div>
  );
}

export default App;
