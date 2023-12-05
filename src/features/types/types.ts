import { type } from "os";

export interface UserResponseDto {
  response: string
  responseCode: number
  responseMsg: string
  dto: UserDto
}

export interface UserDto {
  sub: string
  appUserId: string
  userName: string
  jurisWardId: string
  jurisWardName : string
  nmPlace:string
  appUserPw:string
  teamId: string
  volunPosition: string
  liveBunjiAdress: string
  liveDoroAdress: string
  workBunjiAdress:string,
  workDoroAdress: string,
  userTel: string
  fcmToken: string
  reqTsTime: number
  accTsTime: number
  dnyTsTime: number
  type: string
  iat: number
}


export interface MobilizationResponseDto {
  response: string
  responseCode: number
  responseMsg: string
  result: MobilizationDto
}

export interface MobilizationDto {
  dsrSeq: string
  dsrKndCd: string
  dsrClsCd: string
  regDtime: string
  lawAddr: string
  roadAddr: string
  dsrGisX: number
  dsrGisY: number
  statEndDtime: string
  colChkYn: string
  accTimeCount: string
  dnyTimeCount: string
  arrTimeCount: string
  whdTimeCount: string
}

export interface apiPostResponse {
  response:string
  responseCode:number
  responseMsg:string
  result:null
}

export interface KakaoRestApiResponse {
  documents: Document[]
  meta: Meta
}

export interface Document {
  address: Address
  address_name: string
  address_type: string
  road_address: RoadAddress
  x: string
  y: string
}

export interface Address {
  address_name: string
  b_code: string
  h_code: string
  main_address_no: string
  mountain_yn: string
  region_1depth_name: string
  region_2depth_name: string
  region_3depth_h_name: string
  region_3depth_name: string
  sub_address_no: string
  x: string
  y: string
}

export interface RoadAddress {
  address_name: string
  building_name: string
  main_building_no: string
  region_1depth_name: string
  region_2depth_name: string
  region_3depth_name: string
  road_name: string
  sub_building_no: string
  underground_yn: string
  x: string
  y: string
  zone_no: string
}

export interface Meta {
  is_end: boolean
  pageable_count: number
  total_count: number
}

export interface CarApiResponse {
  response: string
  responseCode: number
  responseMsg: string
  result: CarApiResponseResult[]
}

export interface CarApiResponseResult {
  dspDsrSeq: string
  carId: string
  radioCallsing: string
  carStatCd: string
  trCarGisX: string
  trCarGisY: string
}

export interface WarterApiResponse {
  response: string
  responseCode: number
  responseMsg: string
  result: WarterApiResponseResult
}

export interface WarterApiResponseResult {
  dataList: WarterApiResponseResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

export interface WarterApiResponseResultList {
  hyd_id: string
  form_cd_nm: string
  adj_bldg: string
  gis_x_5181: number
  gis_y_5181: number
  dist: number
  pipe: number
  use_yn: string
}
