import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const useAuth = () => {
  const authData = useSelector(state => state.auth);
  const [merchantHeader, setMerchantHeader] = useState(null);
 
  useEffect(() => {
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTI0NzgzMzQzMGUwMzYwZTg1YjZiNSIsInVzZXIiOiJtZXJjaGFudCIsIm1hY19hZGRyZXNzIjoicXdlcnR5dWlvcDEiLCJ0eXBlIjoiUE9TIiwiaWF0IjoxNzI5NjY3NTIzLCJleHAiOjE3MzAyNzIzMjN9.ooHnYA_HCTBESwtcj-DOybEpVpumerb5e16YvnK9sDk"
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    };

    setMerchantHeader(header);
  }, []);

  return {merchantHeader};
};

export default useAuth;
