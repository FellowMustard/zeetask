import React from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

interface protectProps {
  children: React.ReactNode;
}
function ProtectLayout({ children }: protectProps) {
  return (
    <main className=" min-h-screen h-full bg-red-400 flex">
      <Sidebar />
      {children}
    </main>
  );
}

export default ProtectLayout;
