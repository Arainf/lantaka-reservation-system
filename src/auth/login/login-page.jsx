"use client"

import LoginForm from "../../components/common/login-form/LoginForm";
import LogoLRRS from "@/assets/images/LRSlogo.png";
import '../../components/common/login-form/LoginForm';
import LantakaBg from "../../assets/images/DJI_0198.webp";

const LoginPage = () => {
  return (
    <div
      className="relative container-xl bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${LantakaBg})`, width: '100vw' }}
    >
      <div
        className="absolute inset-0 z-auto"
        style={{ backgroundColor: '#00205B', opacity: '70%' }}/>
      <div
        className="flex justify-center items-center min-h-screen ">
        <div
          className="w-96 p-6 z-10 form-title">
          <img src={LogoLRRS} className="mb-[-8%]"/>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
