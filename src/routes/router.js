import React, { lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import SessionHelper from "../helpers/SessionHelper";
import Loading from "../components/Loading";

// lazy loading components for better performance
const Login = lazy(() => import("../pages/LoginPage"));

const Navbar = lazy(() => import("../components/Navbar"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Companies = lazy(() => import("../pages/Companies"));

const NotFound = lazy(() => import("../components/NotFound"));

const auth = [
  {
    path: "/login",
    component: Login,
    exact: false,
  },
];

const privateRoutes = [
  
  {
    path: "/companies",
    component: Companies,
    exact: true,
  },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

export default function AppRoutes() {
  const user = SessionHelper.getUser();
  const [update, setUpdate] = React.useState(false);

  const ProtectedRoutes = () => (
    <Switch>
      {privateRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ))}
      <Route path="*" component={NotFound} />
    </Switch>
  );

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          {auth.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.component update={update} setUpdate={setUpdate} />
            </Route>
          ))}
          <PrivateRoute>
            <Navbar />
            <ProtectedRoutes />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}
