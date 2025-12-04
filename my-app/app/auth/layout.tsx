import { ChildProcess } from "child_process";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex w-full h-svh items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
