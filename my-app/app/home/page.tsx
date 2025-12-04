"use client";

import { account } from "@/lib/Appwrite/client/clientAppwrite";
import { useEffect, useState } from "react";

export default function Page() {
  const [User, setUser] = useState<any>({});
  useEffect(() => {
    const getUser = async () => {
      setUser(await account.get());
    };
    getUser();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p></p>
    </div>
  );
}
