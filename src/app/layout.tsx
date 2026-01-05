import './globals.css';

export const metadata = {
  title: 'AutomateFlow - Agentes de IA para seu Negócio',
  description: 'Transforme seu negócio com agentes de IA personalizados. Automatize atendimentos, qualifique leads e aumente suas vendas 24/7.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
