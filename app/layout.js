import "./globals.css";

export const metadata = {
  title: "DIGINext",
  description: "Rebuilt marketing site for DGNext"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
