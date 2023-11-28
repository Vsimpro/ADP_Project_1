import { useState, useEffect } from 'react';
import axios from 'axios';

const useProfileData = (userId, HOST, PORT) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    axios.get(`http://${HOST}:${PORT}/user/get-user/${JSON.parse(userId)}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
    .then((response) => {
      setProfileData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [userId, HOST, PORT]);

  return profileData;
};

export default useProfileData;