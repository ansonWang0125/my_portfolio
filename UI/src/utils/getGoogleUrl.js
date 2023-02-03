import { REACT_APP_GOOGLE_OAUTH_CLIENT_ID} from 'etc/secrets/.env'

export const getGoogleUrl = (from, redirect_uri) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  
    const options = {
      redirect_uri: redirect_uri,
      client_id: REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: from,
    };
  
    const qs = new URLSearchParams(options);
  
    return `${rootUrl}?${qs.toString()}`;
  };
  
  