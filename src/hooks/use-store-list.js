import {useEffect, useState} from 'react';
import {storeListApi} from '../api';
import useAuth from './use-auth';
import useDownloadData from './use-download-data';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {storeNameFunc} from '../redux/slice/auth';
import {English} from '../utils/en';
import useSound from './use-sound';

const useStoreList = () => {
  const {errorSound, successSound} = useSound();
  const {merchantHeader} = useAuth();
  const dispatch = useDispatch();
  const {getallDataApi, downloadLoad} = useDownloadData();
  const storeId = useSelector(state => state.auth.store_details);

  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(storeId?._id);

  useEffect(() => {
    if (merchantHeader) {
      storeListApi(merchantHeader)
        .then(res => {
          setStoreList(res?.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          errorSound();
          Toast.show(
            `${err?.response?.data?.message || err?.message}`,
            Toast.SHORT,
          );
        });
    }
  }, [merchantHeader]);

  const handleDownload = async (storeName, storeId) => {
    if (!storeId) {
      errorSound();
      return Toast.show(English.store_list.toast_select_store, Toast.SHORT);
    }
    const data = JSON.stringify(storeName);
    await AsyncStorage.setItem('storeID', storeId);
    await AsyncStorage.setItem('storeName', data);
    dispatch(storeNameFunc(null));

    return getallDataApi(storeId);
  };

  return {
    storeList,
    loading,
    setSelectedId,
    selectedId,
    handleDownload,
    downloadLoad,
  };
};

export default useStoreList;
