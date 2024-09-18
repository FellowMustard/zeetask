import React from "react";
interface homeProps {
  children: React.ReactNode;
}
function HomeLayout({ children }: homeProps) {
  return (
    <main className="min-h-screen h-full bg-zee-background">{children}</main>
  );
}

export default HomeLayout;
