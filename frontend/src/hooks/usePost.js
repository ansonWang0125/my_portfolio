import { useState } from "react";
import { apiUserLoginWithGoogle } from "../axios/api";
import { apiUserSignUpWithGoogle } from "../axios/api";

const useFetch = (mode) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    if (mode === 'login') {
        console.log('login',response)
        apiUserLoginWithGoogle({credential:response.credential})
        .then((res) => {
          setLoading(false);
  
          return res.data;
        })
        .then((data) => {
          if (data?.user) {
            localStorage.setItem("user", JSON.stringify(data?.user));
            window.location.reload();
          }
  
          throw new Error(data?.message || data);
        })
        .catch((error) => {
          setError(error?.message);
        });
    } else if (mode === 'signup') {
        console.log('signup',response)
        apiUserSignUpWithGoogle({credential:response.credential})
        .then((res) => {
          setLoading(false);
  
          return res.data;
        })
        .then((data) => {
          if (data?.user) {
            localStorage.setItem("user", JSON.stringify(data?.user));
            window.location.reload();
          }
  
          throw new Error(data?.message || data);
        })
        .catch((error) => {
          setError(error?.message);
        });
    }
    console.log(response)
  };
  return { loading, error, handleGoogle };
};

export default useFetch;