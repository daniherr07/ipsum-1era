import "./globals.css";

export const metadata = {
  title: "IPSUM",
  description: "Ofrecemos un servicio de consultoría y dirección técnica en la tramitología para bonos de vivienda, autorizados por Grupo Mutual, entidad bancaria autorizada en la gestión de bonos de vivienda.",
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
