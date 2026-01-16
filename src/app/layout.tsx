import './globals.css';
import Script from 'next/script';
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W94MNVZW4B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W94MNVZW4B');
          `}
        </Script>
        <meta name="facebook-domain-verification" content="h1zg28p5tr050xxpepso1aa964nsww" />
        <meta name="google-site-verification" content="Zryea_OBU9ZWlviBTX5b95BgpeVfxTg1byM2fJhhPoA" />
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
