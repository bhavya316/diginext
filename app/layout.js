import "./globals.css";

export const metadata = {
  title: "DigiNext Admin",
  description: "Admin panel for DigiNext"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
