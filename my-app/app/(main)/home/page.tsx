"use client";

import { FileUploadFormDemo } from "@/app/ui/fileUploadComponent";
import { Button } from "@/components/ui/button";
import { account } from "@/lib/Appwrite/client/clientAppwrite";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect } from "react";

async function logout() {
  const res = await fetch("http://localhost:8080/api/logout", {
    method: "POST",
  });
  const res1 = await account.deleteSession({ sessionId: "current" });
  deleteCookie("appwrite-session", { path: "/" });
  console.log(res1);
  redirect("/auth");
}

export default function Page() {

  useEffect(() => {
    const logUser = async () => {
      console.log((await account.get()).email);
    }
    logUser()
  }, [])
  return (
    <div className="bg-gray-100 py-8 px-6 rounded-xl max-w-3xl flex flex-col justify-center items-center">
      <h1 className="text-[36px]">Home</h1>
      <Button
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        Log out
      </Button>
      <FileUploadFormDemo />
    </div>
  );
}
