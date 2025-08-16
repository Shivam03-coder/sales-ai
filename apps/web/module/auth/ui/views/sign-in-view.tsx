import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

export const SignInView = () => {
  return (
    <SignIn
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#0b0f1a",
          colorText: "#fff",
          colorInputBackground: "#121726",
          borderRadius: "0.75rem",
          colorPrimary: "#a855f7",
        },
      }}
    />
  );
};
