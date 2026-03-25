import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { WhatsAppBtn } from "@/components/public/WhatsAppBtn";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen pt-0">
        {children}
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
