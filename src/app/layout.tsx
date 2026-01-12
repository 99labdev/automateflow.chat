import './globals.css';
import WebChat from '@/components/WebChat';

export const metadata = {
  title: 'AutomateFlow - Agentes de IA para seu Negócio',
  description: 'Transforme seu negócio com agentes de IA personalizados. Automatize atendimentos, qualifique leads e aumente suas vendas 24/7.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" data-theme="light">
      <head>
        <meta name="facebook-domain-verification" content="h1zg28p5tr050xxpepso1aa964nsww" />
        <meta name="google-site-verification" content="tDZBwT2zxzguJNxFeKOeiiXV1xtWxHVG1FYTq-AREzg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <WebChat />
      </body>
    </html>
  );
}
