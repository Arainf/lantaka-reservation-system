"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useContext } from "react"; // Import useContext
import './loginform.css';
import { FaUser, FaLock } from "react-icons/fa"; // Import icons
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { UserContext } from '@/context/contexts'; // Import UserContext

// Define the validation schema using Zod for login
const loginSchema = z.object({
  username: z.string().nonempty({
    message: "Username is required",
  }),
  password: z.string().nonempty({
    message: "Password is required.", 
  }),
});

export function LoginForm() {
  // State for backend error message
  const [backendError, setBackendError] = useState(null);
  const { setUserRole } = useContext(UserContext); // Get setUserRole from context
  const navigate = useNavigate(); // Initialize useNavigate

  // Set up the form with react-hook-form and zodResolver for validation
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Define the onSubmit handler
  const onSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: values.username,
        password: values.password,
      });

      // Check for successful login
      if (response.status === 200) {

        console.log(response.data + "success");
        const { account_id, role } = response.data; // Get both account_id and role from backend
        localStorage.setItem('account_id', account_id); // Store account_id in localStorage
        localStorage.setItem('userRole', role); // Store role in localStorage
        console.log(account_id, role);
        
        setUserRole(role); // Update UserContext with the role

        navigate('/dashboard'); // Navigate to the dashboard after login
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Set backend error message from the response
        setBackendError(error.response.data.message || 'Invalid credentials');
      } else {
        setBackendError('Something went wrong. Please try again.');
      }
      console.error('Login failed', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Username Input with User Icon */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-8">
              <FormControl>
                <div className="relative form-field">
                  <span className="focus-input"></span>
                  {/* Icon */}
                  <FaUser className="absolute left-5 top-3 z-10 icon" />
                  {/* Input Field */}
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

        {/* Password Input with Lock Icon */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative form-field">
                  <span className="focus-input"></span>
                  {/* Icon */}
                  <FaLock className="absolute left-5 top-3 z-10 icon" />
                  {/* Password Input */}
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

        {/* Display backend error below form */}
        {backendError && <p className="text-red-600">{backendError}</p>}

        <Button className="LoginForm_button" type="submit">
          <span>Login</span>
        </Button>
      </form>
    </Form>
  );
}
