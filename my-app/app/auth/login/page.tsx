"use client"; // Keep this, as you're using useState and other client-side hooks

import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  // Renamed, and removed async
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value }); //Removed not null assertion
  };

  const LogIn = async () => {
    try {
      const res = await login(user.email, user.password);
      console.log(res);
      setUser({ email: "", password: "" });
      redirect("/");
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
          // Added onSubmit handler
          e.preventDefault(); // Prevent default form submission
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
        <Button type="submit" value="Login" className="hover:bg-blue-500 bg-blue-700 border-solid ">
          Log In
        </Button>
          <Link href={"/auth"} className="underline">Auth</Link>
      </form>
    </div>
  );
}
