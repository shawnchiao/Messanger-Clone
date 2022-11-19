import "../styles/globals.css";
import { Suspense } from "react";
import Header from "./Header";
import Loading from "./loading";
import Page from "./page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
