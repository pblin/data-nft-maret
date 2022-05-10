import autobind from 'autobind-decorator';
import history from '../utils/history';
import { AUTH_CONFIG } from './configuration';
import { Auth0Authentication } from './Auth0Authentication';
import { Auth0DecodedHash, WebAuth } from 'auth0-js';
import 'graphql-request';
import { AppStore } from '../store/AppStore';
import { ProfileService } from '../services/ProfileService';
import { PROFILE_ACTIONS } from '../store/profile/profileActions';
import { AppEventEmitter } from '../utils/AppEventEmitter';

/**
 * Web based Auth0 authentication
 *
 * @export
 * @class WebAuthentication
 * @implements {Auth0Authentication}
 */
export class WebAuthentication implements Auth0Authentication {
  /**
   * @property
   * @private
   * @type {WebAuth}
   * @memberof WebAuthenticationManager
   */
  auth0: WebAuth = new WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid openid profile email'
  });

  get isUserVerified(): boolean {
    const profile = JSON.parse(localStorage.getItem('profile'));

    if(!profile) {
      return false;
    }

    // tslint:disable-next-line:no-string-literal
    if(profile['primary_email_verified'] === true) {
      return true;
    }

    return false;
  }

  get authenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
  }

  @autobind
  login(): void {
    this.auth0.authorize();
  }

  @autobind
  handleAuthentication(): void {
    this.auth0.parseHash({},( e: any, result: any) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
        AppEventEmitter.getInstance().emit('authenticated');
      } else if (e) {
        history.push('/');
        // TODO: CREATE LOGGER FOR THE APPLICATION
        console.error(e);
      }
    });
  }
 @autobind
  async findUser (userEmail: string) { 

    const profileService = new ProfileService();
    const profile = await profileService.getProfile(userEmail);

    localStorage.setItem ('profile', JSON.stringify(profile));
    AppStore.getInstance().store.dispatch({type: PROFILE_ACTIONS.GET_PROFILE});
  }

  @autobind
  setSession(authResult: Auth0DecodedHash): void {
    const { accessToken, expiresIn, idToken, idTokenPayload } = authResult;
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', accessToken!);
    localStorage.setItem('id_token', idToken!);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('email', idTokenPayload.email);
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('idTokenPayload', JSON.stringify(idTokenPayload));
    localStorage.setItem('pendingProfileQuery', 'n');
    this.findUser(idTokenPayload.email);

    // navigate to the home route
    history.push('/');
  }

  @autobind
  logout(): void {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('profile');
    localStorage.removeItem('pendingProfileQuery');
    // navigate to the home route
    history.push('/home');

    let ssoLogOutUrl;
    const baseUrl = location.protocol+'//'+location.hostname + ':3000';
    if(process.env.NODE_ENV === 'development'){
      ssoLogOutUrl = `https://godscoin.us.auth0.com/v2/logout?returnTo=${baseUrl}&client_id=${AUTH_CONFIG.clientId}`;
    } else {
      ssoLogOutUrl = `https:/godscoin.us.auth0.com/v2/logout?returnTo=${baseUrl}`;
    }

    window.location.replace(ssoLogOutUrl);
  }
}
