import { Navbar } from "@/src/components/UI/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="  flex-grow">{children}</main>
    </div>
  );
}
