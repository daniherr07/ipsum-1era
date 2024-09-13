import "./globals.css";

export const metadata = {
  title: "Proyecto Ipsum",
  description: "Proyecto de ipsum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
