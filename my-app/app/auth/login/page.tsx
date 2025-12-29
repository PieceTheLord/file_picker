"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { account } from "@/lib/Appwrite/client/clientAppwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [Res, setRes] = useState<any | null>(null);
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [Loading, setLoading] = useState<boolean>(false)

  const router = useRouter();

  const LogIn = async () => {
    try {
      setLoading(true)
      // Create session on the client
      const clientSession = await account.createEmailPasswordSession({
        email: user.email,
        password: user.password,
      });
      // Create session on the server
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email, // Pass email and password in the request body
          password: user.password, // Pass email and password in the request body
        }),
      });

      setRes(res);
      setUser({ email: "", password: "" });
      console.log(res, clientSession);
      router.push('/home')
    } catch (error: any) {
      setRes(error.message);
      console.error("Login error:", error);
      // Handle the error (e.g., display an error message to the user)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col gap-y-6 h-100 justify-start items-center">
      <h1 className="text-center text-[36px]">Log In</h1>
      {Res && <p className=" text-red-500">{Res}</p>}
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
          {Loading ? "Loginning..." : "Log In"}
        </Button>
        <Link href={"/auth"} className="underline">
          Auth
        </Link>
      </form>
    </div>
  );
}
