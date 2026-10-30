import { useState } from 'react';
export function TabIcon({ src, domain }: { src: string | null; domain: string }) {
  const [failed, setFailed] = useState(false);
  const safe = src && /^(https?:|data:image\/(?:png|jpeg|gif|webp);base64,|chrome-extension:)/i.test(src);
  return <span className="favicon-circle" aria-hidden="true">{safe && !failed ? <img src={src!} alt="" loading="lazy" onError={() => setFailed(true)} referrerPolicy="no-referrer" /> : <span>{domain.slice(0,1).toUpperCase()}</span>}</span>;
}
