import React from 'react';
import axios from 'axios';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import url from '../axios/url';

const LoginPage=(props)=>{

//State Variables    
const [consumer,setConsumer]=useState("")
const [password,setPassword]=useState("")
const [loading, setLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [resData, setData] = useState("");
const navigate=useNavigate();


//Handling Post Request
const handleSubmit = () => {
  setLoading(true);
  setIsError(false);
  const data = {
    consumerNumber: consumer,
    password:password
  }
  axios.post(url+"/user/login", data).then(res => {
    setData(res.data);
    setConsumer('');
    setPassword('');
    setLoading(false);
    localStorage.setItem("dataToken",res.data.token);
    localStorage.setItem("dataUser",res.data.user.name);
    navigate(props.page);
  }).catch(err => {
    setLoading(false);
    setIsError(true);
    console.log(err);
  });
}

//JSX Code
    return(
    <section class="text-gray-600 body-font bg-gray-100">
   <div class="container mx-auto flex px-5 py-0 md:flex-row flex-col items-center">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
         <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Kerala Water Authority Welcomes You..
         </h1>
         <p>
            Kerala Water Authority is an autonomous authority established
            for the development and regulation of water supply 
            and waste water collection and disposal in the state of Kerala, India.
         </p>
         <div class="flex justify-center py-10">
            <button class="inline-flex text-white bg-gray-900 border-0 py-2 px-10 focus:outline-none hover:bg-red-600 rounded-full text-lg">Contact Us</button>
         </div>
      </div>

      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
         <div class="flex items-center justify-center min-h-screen">
            <div class="px-8 py-20 mt-4 text-left bg-white shadow-lg">
               <h3 class="text-2xl font-bold text-center">{props.logText}</h3>
               <form action="">
                  <div class="mt-4">
                     <div>
                        <label class="block" for="email">Consumer Number</label>
                        <input type="text" placeholder="Consumer Number" value={consumer}
                           class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                           required name="consumer"
              onChange={(event)=>{
                setConsumer(event.target.value);
              }}/>
                     </div>
                     <div class="mt-4">
                        <label class="block">Password</label>
                        <input type="password" placeholder="Password" value={password}
                           class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                           required name="password"
              onChange={(event)=>{
                setPassword(event.target.value);
              }}/>
                     </div>
                     <div class="flex items-baseline justify-between">
                        <button class="px-8 py-2 mt-4 text-white bg-gray-900 rounded-full hover:bg-gray-200" type='button'  onClick={handleSubmit}
          disabled={loading}>{loading ? "Loading...": "Login"}</button>
                        <a href="#" class="text-sm text-gray-600 hover:underline">Forgot password?</a>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
      
   </div>
</section>

)};
export default LoginPage;