'use client'

import React, { useState, useEffect } from "react";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInButton } from "../../../component/SignInButton"; // Adjust the path as needed
// import { Button } from "@repo/ui/button";
export default function SignInPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "", email: "" });
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
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
      router.push("/");
    } else {
      console.error("Sign in failed", res?.error);
    }
  };

  return (

    <div
      style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden' // Prevents any overflow
      }}
    >
      <div style={{ display: "flex", minHeight: "20vh", marginTop: 100 }}>
        <div style={{ minWidth: "30vw" }}></div>
        {/* <div style={{ flex: 1, backgroundColor: "#aec8b0", minWidth: "25vw", padding: "2rem" }}>
        <img src="/bird-illustration.png" alt="Bird" style={{ width: "80%" }} />
        <p style={{ color: "#5b6e5d", marginTop: "1rem" }}>
          Maecenas mattis egestas
        </p>
      </div> */}
        {/* <div style={{ flex: 1, padding: "2rem", minWidth: "25vw", backgroundColor: "#f4f4f4" }}> */}
        <div style={{ flex: 1, padding: "2rem", minWidth: "25vw", backgroundColor: "white" }}>
          <center>
           
            <h1>Welcome to Recipes!!</h1>

            <form onSubmit={handleSubmit}>

              Username :  <input className="flex justify-center"
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                required
                
              />
              <br />
              Password : <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <br />
              Email :    <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              <br />
              <br />

              <button type="submit" style={{ backgroundColor: "#ec7063", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px" }}>Sign In</button>
            </form>
          </center>
          <div style={{ marginTop: "1rem" }}>
  {providers &&
    Object.values(providers).map((provider) => (
      provider.id !== "credentials" ? ( // Skip the "credentials" provider
        <div key={provider.name}>
          <SignInButton
            providerId={provider.id}
            providerName={provider.name}
          />
          <br /><br />
        </div>
      ) : null // Don't render anything for "credentials"
    ))
  }
</div>


          <p style={{ marginTop: "1rem" }}>
            New to recipes? <a href="/auth/signup">Create Account</a>
          </p>
        </div>
        <div style={{ minWidth: "30vw" }}></div>
      </div>
    </div>
  );
}

