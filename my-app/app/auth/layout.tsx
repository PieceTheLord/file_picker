'use client'
import { account } from "@/lib/Appwrite/client/clientAppwrite";
import { NextPage } from "next";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  useEffect(() => {
    const getUser = async () => {
      await account.deleteSession("current")
    };
    getUser();
  }, [])
  return (
    <div className="flex w-full h-svh items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
