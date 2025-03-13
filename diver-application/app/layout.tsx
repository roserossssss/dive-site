import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import './ui/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400"], 
  variable: '--font-poppins'
})


export const metadata: Metadata = {
  title: "Master Liveboards",
  description: "Run by Next.js, I WANNA ROCK, I WANNA ROCK, ROCK, I WANT TO ROCK ROCK! I WANT TO ROCK * cool gutar rift* TURN IT DOWN THEY SAY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
