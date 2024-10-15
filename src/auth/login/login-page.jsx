"use client";

import { LoginForm } from "@/components/common/login-form/LoginForm";
import LogoLRRS from "@/assets/images/logo.png";
import '../../components/common/login-form/LoginForm';
import LantakaBg from "../../assets/images/LantakaBG.jpg";

const LoginPage = () => {
  return (
    <div
      className="relative container-xl bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${LantakaBg})`, width: '100vw' }}
    >
      <div
        className="absolute inset-0 z-auto"
        style={{ backgroundColor: '#00205B', opacity: '70%' }}></div>
      <img
        src={LogoLRRS}
        alt="Logo"
        className="absolute top-5 left-2 z-10"
        style={{ width: '350px' }} />

      <div
        className="flex justify-center items-center min-h-screen ">
        <div
          className="w-96 p-6 z-10 form-title">
          <h1
            className="text-5xl text-white text-center mb-1 "
            style={{ fontFamily: 'Oswald', fontWeight: '800' }}>Magis Morning</h1>
          <h6
            className="text-white text-center italic m-0"
            style={{ fontFamily: 'Montserrat', fontWeight: '200' }}>"We're glad to see you again"</h6>
          <LoginForm />
          <h5
            className="italic text-center mt-5 text-slate-300"
            style={{ fontFamily: 'Montserrat', fontWeight: '500' }}
          >Forgot Password?
          </h5>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
