import { type } from "os";

export interface UserData {
  response: string
  responseCode: number
  responseMsg: string
  totalCount: number
  userType:string
  dtoMap: UserDataDta
}

export interface UserDataDta {
  hsaverDto: HsaverDto
  firevolunDto: FirevolunDto
}

export interface HsaverDto {
  appUserId: string
  nmPerson: string
  jurisWardId: string
  nmPlace: string
  liveBunjiAdress: string
  liveDoroAdress: string
  workBunjiAdress: string
  workDoroAdress: string
  tel: string
  fcmToken: string
  reqTsTime: number
  accTsTime: number
  dnyTsTime: number
  userType: string
}

export interface FirevolunDto {
  appUserId: string
  volunName: string
  jurisWardId: string
  teamId: string
  volunPosition: string
  volunBunjiAdress: string
  volunDoroAdress: string
  volunTel: string
  fcmToken: string
  reqTsTime: number
  accTsTime: number
  dnyTsTime: number
  userType: string
}
