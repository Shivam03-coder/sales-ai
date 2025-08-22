import { type Metadata } from "next";
import "@workspace/ui/globals.css";
import { appfonts } from "@/fonts";
import { ConvexClientProvider } from "@/modules/widget/ui/components/convex-provider";

export const metadata: Metadata = {
  title: "SALES-AI",
};

export default function AppRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en" className={appfonts}>
      <ConvexClientProvider>
        <body className="">
          <main className="root">{children}</main>
        </body>
      </ConvexClientProvider>
    </html>
  );
}
