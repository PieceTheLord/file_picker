"use client";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { account } from "@/lib/Appwrite/client/clientAppwrite";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const LogIn = async () => {
    try {
      // Create session on the client
      const clientSession = await account.createEmailPasswordSession(
        user.email,
        user.password
      );
      // Create session on the server
      const res = await login(user.email, user.password);
      setUser({ email: "", password: "" });
      console.log(res, clientSession);
    } catch (error) {
      console.error("Login error:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="flex flex-col gap-y-6 h-[400px] justify-start">
      <h1 className="text-center text-[36px]">Log In</h1>

      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          LogIn();
        }}
        className="flex flex-col gap-y-4  w-2xs"
      >
        <div>
          <Input
            type="text"
            name="email"
            placeholder="Enter your email..."
            onChange={handleUserInput}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleUserInput}
            required
          />
        </div>
        <Button
          type="submit"
          value="Login"
          className="hover:bg-blue-500 bg-blue-700 border-solid "
        >
          Log In
        </Button>
        <Link href={"/auth"} className="underline">
          Auth
        </Link>
      </form>
    </div>
  );
}
