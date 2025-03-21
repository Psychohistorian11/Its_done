
import React from 'react'
import { Button } from '../ui/button'
import { handleGithubSignIn } from "@/components/services/route";

interface ChildProps {
    login: boolean;
  }

const GithubService: React.FC<ChildProps> = ({login}) => {

  function handleSignIn() {
    handleGithubSignIn()
      .then(() => {
        // Handle successful sign-in
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };

  return (
    <div>
      <Button
        onClick={handleSignIn}
        variant="outline"
        className="w-full hover:bg-black hover:text-white border-zinc-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-github "
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>

        {login ? <span>Login with GitHub</span> : ""}
      </Button>
    </div>
  );
}

export default GithubService