import { getProviders, signIn, getCsrfToken } from "next-auth/react";

// Fetch providers and csrfToken with SSR
export async function getServerSideProps() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}

export default function SignInPage({ providers, csrfToken }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: '#aec8b0', padding: '2rem' }}>
        <img src="/bird-illustration.png" alt="Bird" style={{ width: '80%' }} />
        <p style={{ color: '#5b6e5d', marginTop: '1rem' }}>
          Maecenas mattis egestas
        </p>
      </div>
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f4f4' }}>
        <h1>Welcome to Lovebirds</h1>
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Username or Email
            <input name="username" type="text" required />
          </label>
          <label>
            Password
            <input name="password" type="password" required />
          </label>
          <button type="submit">Sign in</button>
        </form>

        <div style={{ marginTop: '1rem' }}>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>

        <p style={{ marginTop: '1rem' }}>
          New to Lovebirds? <a href="/auth/signup">Create Account</a>
        </p>
      </div>
    </div>
  );
}
