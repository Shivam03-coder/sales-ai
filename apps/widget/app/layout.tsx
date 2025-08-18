import { type Metadata } from "next";
import "@workspace/ui/globals.css";
import { appfonts } from "@/fonts";

export const metadata: Metadata = {
  title: "TRUGENT",
};

export default function AppRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en" className={appfonts}>
      <body className="">
        <main className="root">{children}</main>
      </body>
    </html>
  );
}
