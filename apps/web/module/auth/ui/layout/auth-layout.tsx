import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen h-full center flex-col">
      {children}
    </div>
  );
};

export default AuthLayout;
