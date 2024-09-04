'use client'

import React, { useState, useEffect } from "react";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInButton } from "../../../component/SignInButton"; // Adjust the path as needed

export default function SignInPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "", email: "" });
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

    const res = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      console.error("Sign in failed", res?.error);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "10vh", marginTop: 100 }}>
      <div style={{ minWidth: "10vw" }}></div>
      <div style={{ flex: 1, backgroundColor: "#aec8b0", minWidth: "25vw", padding: "2rem" }}>
        <img src="/bird-illustration.png" alt="Bird" style={{ width: "80%" }} />
        <p style={{ color: "#5b6e5d", marginTop: "1rem" }}>
          Maecenas mattis egestas
        </p>
      </div>
      <div style={{ flex: 1, padding: "2rem", minWidth: "25vw", backgroundColor: "#f4f4f4" }}>
        <h1>Welcome to recipes</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <br/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <br/>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <br/>
          
          <button type="submit">Sign In</button>
        </form>

        <div style={{ marginTop: "1rem" }}>
          {providers && 
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <SignInButton
                  providerId={provider.id}
                  providerName={provider.name}
                />
              </div>
            ))
          }
        </div>

        <p style={{ marginTop: "1rem" }}>
          New to recipes? <a href="/auth/signup">Create Account</a>
        </p>
      </div>
      <div style={{ minWidth: "10vw" }}></div>
    </div>
  );
}
