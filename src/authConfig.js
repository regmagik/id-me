export const msalConfig = {
  auth: {
    clientId: "869b9682-1062-498c-a2eb-4c9b7071a25b",
    authority: "https://login.microsoftonline.com/6a28f84e-4329-4fbd-a662-05d96a09ce01/",
    redirectUri: window.location.href,
  },
  cache: {
    cacheLocation: "sessionStorage", 
    storeAuthStateInCookie: false, 
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};