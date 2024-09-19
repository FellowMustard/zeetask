import React, { Suspense } from "react";
interface homeProps {
  children: React.ReactNode;
}
function HomeLayout({ children }: homeProps) {
  return (
    <main className="min-h-screen h-full bg-zee-background">
      <Suspense> {children}</Suspense>
    </main>
  );
}

export default HomeLayout;
