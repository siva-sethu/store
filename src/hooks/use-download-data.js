import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import realm from '../db/schema';
import {funofflineData, getCategoryFunc} from '../redux/slice/items';
import {getDownloadData} from '../api';
import useAuth from './use-auth';
import {English} from '../utils/en';
import Toast from 'react-native-simple-toast';
import useSound from './use-sound';
import { downloadDataExample } from '../component/settings/dummy';

const useDownloadData = () => {
  const {errorSound, successSound} = useSound();
  const dispatch = useDispatch();
  const {merchantHeader} = useAuth();
  const [downloadLoad, setDownloadLoad] = useState(false);
  const {merchant_data} = useSelector(state => state.auth);
  const message = English.settings_screen.download_Success_Message;

  const removeOldData = () => {
    try {
      realm.write(() => {
        realm.deleteAll();
      });
    } catch (err) {
      // console.log('REALMERRORDATA', err);
    }
  };

  const getallDataApi = id => {
    const data=downloadDataExample
    setDownloadLoad(true);
    const payload = {
      store_id: "66e250c2e1ccb066d526a8bd",
      merchant_id:"66e247833430e0360e85b6b5",
    };
    // getDownloadData(payload, merchantHeader)
      // .then(res => {
        const totalItems = data?.all_items
          ?.map(e => e?.items_data.map(e => e?.name))
          .flat();
        successSound();
        Toast.show(
          `${message.download} ${data?.all_categories?.length} ${message.itme1} ${totalItems?.length} ${message.itme2}`,
          Toast.LONG,
        );
        try {
          realm.write(() => {
            realm.deleteAll();
          });
        } catch (err) {
          // console.log('err', err);
        }
        data?.all_items.map((_item, index) => {
          let payload = {
            store_id: _item?.store_id ?? English.test_data.store_id,
            category_id: _item?.category_id,
            category: _item?.category,
          };
          let itemsData = [];
          _item?.items_data.map((item, index) => {
            let innrPayload = {
              store_id: _item?.store_id ?? English.test_data.store_id,
              category_id: _item?.category_id,
              category: _item?.category,
              item_id: item?.item_id,
              name: item?.name,
              description: item?.description,
              price: item?.price,
              image: item?.image,
              status: item?.status,
              notes: null,
            };
            let subItem = [];
            item?.sub_item?.map((item, imdex) => {
              let _nestInnrPayload = {
                id: item?._id,
                name: item?.name,
                extra: item?.extra,
                no: item?.no,
              };
              subItem.push(_nestInnrPayload);
            });

            innrPayload = {...innrPayload, subItem};
            itemsData.push(innrPayload);
          });
          payload = {...payload, itemsData};

          try {
            realm.write(() => {
              realm.create('MenuItem', payload);
            });
          } catch (error) {
            console.error('Failed to create menu item:', error.message);
          }
        });
        data?.all_categories.map((item, index) => {
          const writeData = categoryData => {
            try {
              realm.write(() => {
                realm.create('CategoryItem', categoryData);
              });
            } catch (error) {
              // console.log('error', error);
            }
          };
          if (index === 0) {
            const categoryData = {
              name: 'All',
              id: JSON.stringify(Math.floor(Math.random() * 100000)),
            };
            writeData(categoryData);
          }

          const categoryData = {
            name: item?.name,
            id: item?.id,
          };
          writeData(categoryData);
        });
        const menuItem = realm.objects('MenuItem');

        dispatch(funofflineData(menuItem));
        const categoryItem = realm.objects('CategoryItem');
        dispatch(getCategoryFunc(categoryItem));

        setDownloadLoad(false);
      // })
      // .catch(err => {
      //   setDownloadLoad(false);
      //   errorSound();
      //   if ((err?.response?.status == 400, err?.response?.status == 404)) {
      //     if (
      //       err?.response?.data?.message?.store_id &&
      //       err?.response?.data?.message?.merchant_id
      //     ) {
      //       Toast.show(
      //         `${err?.response?.data?.message?.store_id} , ${err?.response?.data?.message?.merchant_id}`,
      //         Toast.SHORT,
      //       );
      //     } else {
      //       if (err?.response?.data?.message?.store_id) {
      //         Toast.show(
      //           `${err?.response?.data?.message?.store_id}`,
      //           Toast.SHORT,
      //         );
      //       } else if (err?.response?.data?.message?.merchant_id) {
      //         Toast.show(
      //           `${err?.response?.data?.message?.merchant_id}`,
      //           Toast.SHORT,
      //         );
      //       } else {
      //         Toast.show(`${err?.response?.data?.message}`, Toast.SHORT);
      //       }
      //     }
      //   } else {
      //     Toast.show(`${err?.message}`, Toast.SHORT);
      //   }
      // });
  };
  return {getallDataApi, downloadLoad, removeOldData};
};

export default useDownloadData;
