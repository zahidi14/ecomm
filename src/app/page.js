import { AuthProvider } from "@/context/AuthContect";
import Image from "next/image";
import { Component } from "react";

export default function Home({ component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
