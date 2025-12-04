"use client";

import { Button } from "@/components/ui/button";
import { account } from "@/lib/Appwrite/client/clientAppwrite";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

async function logout() {
  const res = await fetch("http://localhost:3000/api/logout", {
    method: "POST",
  });
  const res1 = await account.deleteSession("current");
  deleteCookie("appwrite-session", { path: "/" });
  console.log(res1);
  redirect("/auth");
}

export default function Page() {
  const [User, setUser] = useState<any>({});
  useEffect(() => {
    const getUser = async () => {
      setUser(await account.get());
      console.log(await account.get());
    };
    getUser();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(User)}</p>
      <Button
        onClick={(e) => {
          // e.preventDefault();
          logout();
        }}
      >
        Log out
      </Button>
    </div>
  );
}
