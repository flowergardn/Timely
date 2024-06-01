import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "~/components/ui/sonner";

export const metadata = {
  title: "Timely",
  description: "View your friends timezones anywhere on Discord 🌎",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
