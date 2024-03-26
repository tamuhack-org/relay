import { signIn } from "next-auth/react";

export default function Home() {

  return (
    <div>
      <p>Hello World!</p>

      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign in
      </button>

      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign out
      </button>
    </div>
  );
}
