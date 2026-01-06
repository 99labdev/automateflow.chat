'use client';

import Script from 'next/script';

export default function WebChat() {
  const connectionId = process.env.NEXT_PUBLIC_WEBCHAT_CONNECTION_ID;
  const webchatUrl = process.env.NEXT_PUBLIC_WEBCHAT_URL;

  if (!connectionId || !webchatUrl) {
    return null;
  }

  return (
    <Script
      async
      src={`${webchatUrl}/static/js/webchat-float.js`}
      data-connection-id={connectionId}
      strategy="lazyOnload"
    />
  );
}
