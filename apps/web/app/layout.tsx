import { type Metadata } from "next";
import "@workspace/ui/globals.css";
import { appfonts } from "@/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { AppRootProviders } from "@/providers/app-root-providers";

export const metadata: Metadata = {
  title: "TRUGENT",
};

export default function AppRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en" className={appfonts}>
      <ClerkProvider>
        <body className="">
          <AppRootProviders>
            <main className="root">{children}</main>
          </AppRootProviders>
        </body>
      </ClerkProvider>
    </html>
  );
}
