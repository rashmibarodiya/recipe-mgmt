'use client';

import React, { useState, useEffect } from 'react';
import { signIn, getProviders, ClientSafeProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignInButton } from '../../../component/SignInButton';

export default function SignInPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const router = useRouter();

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

    const res = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
    });

    if (res?.ok) {
      router.push('/');
    } else {
      console.error('Sign in failed', res?.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat text-black">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to RecipeWorld!</h1>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              className="w-full px-4 py-2 bg-opacity-80 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
              className="w-full px-4 py-2 bg-opacity-80 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
              className="w-full px-4 py-2 bg-opacity-80 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        {/* Sign in with Providers */}
        <div className="flex items-center justify-center mt-2">
          {providers &&
            Object.values(providers).map((provider) =>
              provider.id !== 'credentials' ? (
                <div key={provider.name} className="mt-2">
                  <SignInButton providerId={provider.id} providerName={provider.name} />
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
}
