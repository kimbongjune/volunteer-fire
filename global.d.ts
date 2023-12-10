interface Window {
    fireAgency?: {
      postMessage?: (message: any) => void;
      saveUserData?: (id:string, password:string, autoLogin:boolean, jwtToken:string) => void;
      logout?: () => void;
      getVideoPath?: (path:string) => string;
      requestUpdateFcmToken?: () => void;
      requestGetToken?: () => void;
      openThirdPartyMapApplication?: (mapType:string, coordinateX:string, coordinateY:string, address:string) => void;
      startLocationService?: () => void;
      copyClipboard?: (copyText:string) => void;
      stopLocationService?: () => void
      saveDisasterNumber?:(disasterNumber:string) => void
      deleteDisasterNumber?:() => void
      getUserData?: () => string
      runCamera?: () => void;
      runVideoCamera?: () => void;
      runGallery?: () => void;
      getLastLocation?: () => string;
      saveJwtToken?: (id:String, token:string) => string;
    };
    updateToken?:(token:string) => void;
    getSavedUserToken?:(userdata:userData) => void;
    saveUserDate?:() => void;
    updateLocation?:(latitude:number, longitude:number) => void;
    setGpsStatus?:(satelliteCount:number, dbHzAverage:number) => void;
    handleFileData?:(mimeType:string, base64EncoedFile:string) => void;
  }

interface userData{
    jwtToken:string;
    autoLoginFlag:boolean;
    id:string;
    password:string;
}
