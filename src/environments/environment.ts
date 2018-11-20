
export const environment = {
  production: false,
   //apiBaseUrl: window.location.protocol+"//"+window.location.hostname+"/data",
  //apiBaseUrl: 'https://myreports.dev.phototype.com/data',
  //apiBaseUrl: 'http://10.10.22.161:9400',
  apiBaseUrl: 'http://localhost:9400',
  version: '1.0.0',
};

export const checkMode = {
  mode: (environment.apiBaseUrl.indexOf("dev") > 0) ? "dev" :
    (environment.apiBaseUrl.indexOf("uat") > 0) ? "uat" : "prod",
  sso: (environment.apiBaseUrl.indexOf("dev") > 0) ? "https://myreports.dev.phototype.com" :
      (environment.apiBaseUrl.indexOf("uat") > 0) ? "https://myreports.uat.phototype.com" :
        (environment.apiBaseUrl.indexOf("local") > 0) ? "http://10.10.22.161:4400" :
          "https://myreports.phototype.com"
}



