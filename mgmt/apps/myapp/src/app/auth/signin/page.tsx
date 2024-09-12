'use client'

import React, { useState, useEffect } from "react";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInButton } from "../../../component/SignInButton"; 
//import { userName } from '@repo/store/src/atom/username';
//import { useSetRecoilState } from 'recoil';

export default function SignInPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "", email: "" });
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  //const setUserName = useSetRecoilState(userName);
  const router = useRouter();
  const img = "https://www.shutterstock.com/image-photo/food-background-spices-herbs-utensil-260nw-2254302831.jpg";

  useEffect(() => {
    async function fetchProviders() {
      const fetchedProviders = await getProviders();
      setProviders(fetchedProviders);
    }
    fetchProviders();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
    });

    if (res?.ok) {
    //  setUserName(credentials.username);
      router.push("/");
    } else {
      console.error("Sign in failed", res?.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center text-black bg-no-repeat" >
      {/* style={{ backgroundImage: `url(${img})` }} */}
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to Recipes!</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          {providers &&
            Object.values(providers).map((provider) =>
              provider.id !== "credentials" ? (
                <div key={provider.name} className="mt-2">
                  <SignInButton providerId={provider.id} providerName={provider.name} />
                </div>
              ) : null
            )}
        </div>

        <p className="mt-4 text-center text-gray-600">
          New to recipes? <a href="/auth/signup" className="text-blue-500 hover:underline">Create Account</a>
        </p>
      </div>
    </div>
  );
}
