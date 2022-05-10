import {AppStore} from './store/AppStore';
import React from 'react';
import ReactDOM from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import Routes from './utils/Routes';
import {Provider} from "react-redux";
import './index.css';
import 'typeface-roboto';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {SnackbarProvider} from "notistack";
import {AppEventEmitter} from "./utils/AppEventEmitter";
import registerServiceWorker, {unregister} from "./registerServiceWorker";
import AppVars from "./styles/appVars";

const theme = createMuiTheme({
  typography: {
    fontFamily: AppVars.mainFont,
  },
  overrides: {
    MuiStepIcon: {
      active: {
        color: `${AppVars.secondaryMain} !important'`
      }
    }
  },
  palette: {
    primary: {
      main: AppVars.primaryMain,
      light: AppVars.primaryLight,
      dark: AppVars.primaryDark,
      contrastText: AppVars.primaryText
    },
    secondary: {
      main: AppVars.secondaryMain,
      light: AppVars.secondaryLight,
      dark: AppVars.secondaryDark,
      contrastText: AppVars.secondaryText
    }
  }
});

//Initialize the store
const app = AppStore.getInstance();
app.initialize();

class AppBootstrap extends React.Component {
  constructor(props) {
    super(props);
    AppEventEmitter.getInstance().on('authenticated', () => {
      //Need to force re-render on authentication, or routes wont work correctly
      this.forceUpdate();
    });
  }

  render() {
    return (
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Provider store={app.store}>
          <MuiThemeProvider theme={theme}>
              <Routes />
          </MuiThemeProvider>
        </Provider>
      </SnackbarProvider>
    )
  }
}

ReactDOM.render(
  <AppBootstrap />
  ,
  document.getElementById('root') as HTMLElement);

if(process.env.NODE_ENV == 'production') {
  registerServiceWorker();
} else {
  unregister();
}
