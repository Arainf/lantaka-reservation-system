"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react"; // Import useState for managing error state
import './loginform.css';
import { FaUser, FaLock } from "react-icons/fa"; // Import icons

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the validation schema using Zod for login
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().nonempty({
    message: "Password is required.",
  }),
});

export function LoginForm() {
  // State for backend error message
  const [backendError, setBackendError] = useState(null);

  // Set up the form with react-hook-form and zodResolver for validation
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define the onSubmit handler
  const onSubmit = async (values) => {
    try {
      // Send login data to your Flask backend
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      // If login fails, set error message
      if (!response.ok) {
        setBackendError(data.message || 'Invalid credentials');
      } else {
        // Handle successful login
        console.log('Login successful!', data);
      }
    } catch (error) {
      setBackendError('Something went wrong. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email Input with User Icon */}
        <FormField
          control={form.control}
          name="email"
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
                      id="email"
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

        <Button className="LoginForm_button" type="submit"><span>Login</span></Button>
      </form>
    </Form>
  );
}
