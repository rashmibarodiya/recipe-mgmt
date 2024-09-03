import { getProviders, getCsrfToken } from "next-auth/react";
import { SignInButton } from "../../../component/SignInButton";

import React from "react";

export default async function SignInPage() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

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
        <form method="post" action="/api/auth/callback/credentials">
  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
  <label>
    Username
    <input name="username" type="text" required />
  </label>
  <br />
  <label>
    Password
    <input name="password" type="password" required />
  </label>
  <br />
  <label>
    Email
    <input name="email" type="email" required />
  </label>
  <button type="submit">Sign in</button>
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
            ))}
        </div>

        <p style={{ marginTop: "1rem" }}>
          New to recipes? <a href="/auth/signup">Create Account</a>
        </p>
      </div>
      <div style={{ minWidth: "10vw" }}></div>
    </div>
  );
}
