// src/features/slice/myInfoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirevolunDto, HsaverDto } from '../types/types';

// Define a type for the slice state
interface MyInfoState {
  tag: string;
  name: string;
  group: string;
  phone: string;
  address: string;
  workAddress: string;
  token: string;
  mobilizationTotalCount: number;
  mobilizationAcceptCount: number;
  mobilizationDenyCount: number;
  userLocationX:number;
  userLocationY:number;
  gpsStatusSatelliteCount:number;
  gpsStatusDbHzAverage:number;
  volunteerUserData:FirevolunDto
  hSaverUserData:HsaverDto
  logedIn:boolean;
  userType:string
}

const volunteerUserInfo: FirevolunDto = {
  appUserId: '',
  volunName: '',
  jurisWardId: '',
  teamId: '',
  volunPosition: '',
  volunBunjiAdress: '',
  volunDoroAdress: '',
  volunTel: '',
  fcmToken: '',
  reqTsTime: 0,
  accTsTime: 0,
  dnyTsTime: 0,
  userType: '',
};

const hSaverUserInfo: HsaverDto = {
  appUserId: "",
  nmPerson: "",
  jurisWardId: "",
  nmPlace: "",
  liveBunjiAdress: "",
  liveDoroAdress: "",
  workBunjiAdress: "",
  workDoroAdress: "",
  tel: "",
  fcmToken: "",
  reqTsTime: 0,
  accTsTime: 0,
  dnyTsTime: 0,
  userType: ""
};

// Define the initial state using that type
const initialState: MyInfoState = {
  tag: '부대장',
  name: '홍길동',
  group: '장유 남성의용소방대',
  phone: '010-1234-5678',
  address: '장유시 율하 도로명 123-456',
  workAddress: '장유시 율하 도로명 123-456',
  token: 'zxciv-30948-kjdjv-jfnbc',
  mobilizationTotalCount: 0,
  mobilizationAcceptCount: 0,
  mobilizationDenyCount: 0,
  userLocationX:0.0,
  userLocationY:0.0,
  gpsStatusSatelliteCount:0,
  gpsStatusDbHzAverage:0.0,
  volunteerUserData :volunteerUserInfo,
  hSaverUserData:hSaverUserInfo,
  logedIn:false,
  userType:''
};

export const myInfoSlice = createSlice({
  name: 'myInfo',
  initialState,
  reducers: {
    saveTag: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
    },
    saveName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    saveGroup: (state, action: PayloadAction<string>) => {
      state.group = action.payload;
    },
    savePhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    saveAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    saveWorkAddress: (state, action: PayloadAction<string>) => {
      state.workAddress = action.payload;
    },
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    saveMobilizationTotalCount: (state, action: PayloadAction<number>) => {
      state.mobilizationTotalCount = action.payload;
    },
    saveMobilizationAcceptCount: (state, action: PayloadAction<number>) => {
      state.mobilizationAcceptCount = action.payload;
    },
    saveMobilizationDenyCount: (state, action: PayloadAction<number>) => {
      state.mobilizationDenyCount = action.payload;
    },
    saveUserLocationX: (state, action: PayloadAction<number>) => {
      state.userLocationX = action.payload;
    },
    saveUserLocationY: (state, action: PayloadAction<number>) => {
      state.userLocationY = action.payload;
    },
    saveGpsStatusSatelliteCount: (state, action: PayloadAction<number>) => {
      state.gpsStatusSatelliteCount = action.payload;
    },
    saveGpsStatusDbHzAverage: (state, action: PayloadAction<number>) => {
      state.gpsStatusDbHzAverage = action.payload;
    },
    saveVolunteerFireUserInfo: (state, action: PayloadAction<FirevolunDto>) => {
      state.volunteerUserData = action.payload;
    },
    saveHSaverUserInfo: (state, action: PayloadAction<HsaverDto>) => {
      state.hSaverUserData = action.payload;
    },
    saveLogedInStatus: (state, action: PayloadAction<boolean>) => {
      state.logedIn = action.payload;
    },
    saveUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const { 
  saveTag,
  saveName,
  saveGroup,
  savePhone, 
  saveAddress, 
  saveWorkAddress, 
  saveToken, 
  saveMobilizationTotalCount, 
  saveMobilizationAcceptCount, 
  saveMobilizationDenyCount,
  saveUserLocationX,
  saveUserLocationY,
  saveGpsStatusSatelliteCount,
  saveGpsStatusDbHzAverage,
  saveVolunteerFireUserInfo,
  saveHSaverUserInfo,
  saveLogedInStatus,
  saveUserType
} = myInfoSlice.actions;

export default myInfoSlice.reducer;