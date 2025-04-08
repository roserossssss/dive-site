import type { Metadata } from "next";
import './ui/globals.css';


export const metadata: Metadata = {
  title: "Master Liveaboards",
  description: "Run by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
