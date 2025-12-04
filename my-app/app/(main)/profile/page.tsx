"use client";

import { Button } from "@/components/ui/button";
import { account } from "@/lib/Appwrite/client/clientAppwrite";
import { deleteCookie } from "cookies-next";
import { NextPage } from "next";
import { redirect } from "next/navigation";


const Page: NextPage = () => {
  return (
    <div className="">
      Profile
    </div>
  );
};

export default Page;
