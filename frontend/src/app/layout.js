import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Certification Planner | #1 Authorized Professional Training",
  description: "Live instructor-led certification bootcamps for PMP, CISSP, AWS, Agile, ITIL, Six Sigma and more.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${plusJakarta.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-800 bg-white">
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
