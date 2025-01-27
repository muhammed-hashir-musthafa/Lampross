import type { Metadata } from "next";
  
export const metadata: Metadata = {
  title: "Lampros",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body suppressHydrationWarning={true}>
       {children}
     </body>
  );
}
