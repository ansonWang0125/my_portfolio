import { useState } from 'react';

export default function useProfile() {
    const getProfile = () =>  {
        var userProfile = {
            result:'',
            token:''
        }
        if (localStorage.getItem('profile') !== 'undefined' && localStorage.getItem('profile') !== null ){
            const dataString = localStorage.getItem('user');
            userProfile = JSON.parse(dataString);  //字串轉換成物件
        }
        return userProfile     //?.避免undefined出現的error
    }
    const [profile, setProfile] = useState(getProfile());

    const saveProfile = userProfile => {
        localStorage.setItem('profile',JSON.stringify(userProfile));
        setProfile(userProfile);
    };

    return {
        setProfile: saveProfile,
        profile
    }
}