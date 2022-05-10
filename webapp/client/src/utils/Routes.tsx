import React, { SFC } from 'react';
import { Callback, DashboardPage, Customer } from '../components';
import Home from '../pages/Home';
import DataExplorerPage from "../components/DataExplorer/DataExplorerPage";
import { Route, RouteComponentProps, Redirect } from 'react-router';
import { Router } from 'react-router-dom';
import { WebAuthentication } from '../auth/WebAuthentication';
import history from './history';
import DatasetManager from "../components/DatasetManager/DatasetManager";
import App from '../components/App/App';
import DatasetInfo from "../components/DatasetInfo/DatasetInfo";
import OrderHistoryPage from "../components/OrderHistory/OrderHistoryPage";
import MarketplacePage from '../components/Marketplace/MarketplacePage';
import EmailVerificationPage from "../components/EmailVerification/EmailVerificationPage";
import EmailVerificationRequired from "../components/EmailVerification/EmailVerificationRequiredContainer";
//import AppSideDrawer from "../components/App/AppDrawer/AppSideDrawer";

const auth = new WebAuthentication();

const handleAuthentication = (props: RouteComponentProps<{}>) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} auth={rest.auth}/>
        : <Redirect to={{pathname: '/home', state: {from: props.location}}} />}
    />
  )
};

const PrivateVerifiedRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if(authenticated === false) {
          return (<Redirect to={{pathname: '/home', state: {from: props.location}}} />)
        }
        if(!auth.isUserVerified) {
          return <EmailVerificationRequired/>
        }
        return (<Component {...props} auth={rest.auth}/>);
      }}
    />
  )
};

const Routes: SFC<{}> = () => {
  return (
    <div>
      <Router history={history}>
        <div style={{display: "flex"}}>
          <App auth={auth}/>
          <main role="main" style={{width: "100%", marginTop: 64}}>
            <Route path="/" exact={true} render={props => <Home auth={auth} {...props} />} />
            <Route
              path="/home"
              render={(props) => <Home auth={auth} {...props} />}
            />
            <PrivateRoute
              path="/dashboard"
              component={DashboardPage}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateVerifiedRoute
              path="/dataexplorer"
              component={DataExplorerPage}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateVerifiedRoute
              path="/profile"
              component={Customer}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateVerifiedRoute
              path="/dataset-manager"
              component={DatasetManager}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateVerifiedRoute
              path="/marketplace"
              component={MarketplacePage}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateVerifiedRoute
              path="/dataset/:id"
              component={DatasetInfo}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateVerifiedRoute
              path="/order/history"
              component={OrderHistoryPage}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <Route
              path="/VerificationPage"
              component={EmailVerificationPage}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <Route
              path="/callback"
              render={ (props) => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
          </main>
        </div>
      </Router>
    </div>
  );
};
export default Routes;
