import { Plus_Jakarta_Sans, Ubuntu, Inter, Nunito_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import DynamicMarketingPopup from "@/components/DynamicMarketingPopup";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
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
      className={`${plusJakarta.variable} ${ubuntu.variable} ${inter.variable} ${nunitoSans.variable} ${openSans.variable} ${plusJakarta.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-800 bg-white">
        <ModalProvider>
          {children}
          <DynamicMarketingPopup />
        </ModalProvider>
      </body>
    </html>
  );
}
