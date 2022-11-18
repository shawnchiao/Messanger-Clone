import { Suspense } from "react";
import Header from "./Header";
import Loading from "./loading";
import HomePage from './page'

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
        <Suspense fallback={<Loading/>}>
          <HomePage/>
        </Suspense>  
      </body>
    </html>
  );
}
