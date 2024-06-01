import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "~/components/ui/sonner";

export const metadata = {
  title: "Timely",
  description: "View your friends timezones anywhere on Discord 🌎",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Timely",
    description: "View your friends timezones anywhere on Discord 🌎",
    url: "https://timely.astrid.sh",
    siteName: "Timely",
    images: [
      {
        url: "https://timely.astrid.sh/Logo.png",
        width: 128,
        height: 128,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@astridlol",
  },
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
