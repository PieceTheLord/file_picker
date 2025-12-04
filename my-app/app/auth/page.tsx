"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NextPage } from "next";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { signup } from "../actions/auth";
import { redirect } from "next/navigation";
interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [User, setUser] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: "",
    password: "",
    name: "",
  });

  function handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...User!, [e.target.name]: e.target.value });
  }

  const SignIn = async () => {
    const res = await signup(User!.email, User!.password);
    console.log(res);
    setUser({ email: "", password: "", name: "" });
    redirect("/home");
  };

  return (
    <form action={SignIn} className="flex flex-col gap-y-6 h-[400] justify-start">
      <h1 className="text-center text-[36px]">Auth</h1>
      <div className="w-2xs flex flex-col gap-y-4">
        <Input
          name="email"
          placeholder="Email"
          value={User!.email}
          onChange={handleUserInput}
        />
        <Input
          name="password"
          placeholder="Password"
          value={User!.password}
          onChange={handleUserInput}
        />
        <Input
          name="name"
          placeholder="Name"
          value={User!.name}
          onChange={handleUserInput}
        />
        <Button className="hover:bg-blue-500 bg-blue-700 border-solid ">
          Sign Up
        </Button>
          <Link href="/auth/login" className="underline">Log in</Link>
      </div>
    </form>
  );
};

export default Page;
