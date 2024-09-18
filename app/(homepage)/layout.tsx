import React from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

interface homeProps {
  children: React.ReactNode;
}
function HomeLayout({ children }: homeProps) {
  return (
    <main className="min-h-screen h-full bg-zee-background">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

export default HomeLayout;
