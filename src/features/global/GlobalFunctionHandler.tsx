import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveUserLocationX, saveUserLocationY, saveGpsStatusSatelliteCount, saveGpsStatusDbHzAverage } from '../../features/slice/UserinfoSlice';

const GlobalFunctionHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.setGpsStatus = (satelliteCount: number, dbHzAverage: number) => {
        //console.log(`satelliteCount is ${satelliteCount} dbHzAverage is ${dbHzAverage}`)
        dispatch(saveGpsStatusSatelliteCount(satelliteCount));
        dispatch(saveGpsStatusDbHzAverage(dbHzAverage));
    };

    window.updateLocation = (latitude: number, longitude: number) => {
        console.log(`location latitude=${latitude} longitude=${longitude}`)
        dispatch(saveUserLocationX(latitude));
        dispatch(saveUserLocationY(longitude));
    };

    window.saveUserDate = () => {
      console.log(`유저정보 저장`)
  };
  }, [dispatch]);

  return null;
};

export default GlobalFunctionHandler;