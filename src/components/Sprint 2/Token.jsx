import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Token = () => {

    const navigate = useNavigate();

    useEffect(()=>{

        const token = localStorage.getItem("loginToken")
        const commonToken = async ()=>{
            try{
                const response = await fetch("http://192.168.1.46:8000/token_expired/",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({token})
                });
               
                const data = await response.json()
                console.log(data,"<====commonAPI---Data==>");

                if(data.status !== true){
                    localStorage.clear();
                    // alert("Login Token is Expired")
                    navigate("/login")
                }

            } catch(err){

            }

        }
        
        commonToken();
    },[])

  return (
    <></>
  )
}

export default Token;