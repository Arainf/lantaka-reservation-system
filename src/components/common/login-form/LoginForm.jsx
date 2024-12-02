import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '@/context/contexts';
import CustomToast from './CustomToast';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import './loginform.css';
import { Loader2 } from "lucide-react"

const loginSchema = z.object({
  username: z.string().nonempty({
    message: "Username is required",
  }),
  password: z.string().nonempty({
    message: "Password is required.", 
  }),
});

const LoginForm = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('error');
  const { setUserRole, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        const { account_id, role, imageUrl, ...userData } = response.data;
        
        localStorage.setItem('account_id', account_id);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setUserRole(role);
        setUserData(userData);
        
        setToastType('success');
        setToastMessage('Login successful!');

        setTimeout(() => {
          if (role === 'Administrator') {
            navigate('/dashboard');
          } else if (role === 'Employee') {
            navigate('/home');
          } else {
            navigate('/unauthorized');
          }
        }, 1000);
      }
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || 'Invalid credentials';
      }
      setToastType('error');
      setToastMessage(errorMessage);
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
      
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative form-field">
                    <span className="focus-input"></span>
                    <FaUser className="absolute left-5 top-3 z-10 icon" />
                    <div className="input-container">
                      <Input
                        id="username"
                        className="input-field bg-white"
                        placeholder="Username"
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative form-field">
                    <span className="focus-input"></span>
                    <FaLock className="absolute left-5 top-3 z-10 icon" />
                    <div className="input-container">
                      <Input
                        id="password"
                        type="password"
                        className="input-field bg-white"
                        placeholder="Password"
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button className="LoginForm_button  " type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      Checking
                    </>
                  ) : (
                    <span className='poppins-regular text-sm'>
                    Login
                    </span>
                  )}
            </Button>
          </div>
        </form>
      </Form>
      {toastMessage && (
        <CustomToast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
};

export default LoginForm;

