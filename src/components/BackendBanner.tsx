import React, { useEffect, useState } from "react";
import { checkHealth } from "../api/client";

type ConnectionState = "checking" | "online" | "offline";

export default function BackendBanner() {
  const [state, setState] = useState<ConnectionState>("checking");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const ok = await checkHealth();
      if (!cancelled) setState(ok ? "online" : "offline");
    }

    check();
    // Periksa ulang setiap 30 detik
    const interval = setInterval(check, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const config: Record<ConnectionState, { cls: string; dot: string; text: string }> = {
    checking: {
      cls: "backend-banner backend-banner--checking",
      dot: "backend-banner-dot",
      text: "Memeriksa koneksi backend...",
    },
    online: {
      cls: "backend-banner backend-banner--online",
      dot: "backend-banner-dot",
      text: "Backend terhubung — Worker API berjalan.",
    },
    offline: {
      cls: "backend-banner backend-banner--offline",
      dot: "backend-banner-dot",
      text: "Backend tidak terhubung. Jalankan: npm run dev, lalu buka URL Wrangler (bukan file HTML langsung).",
    },
  };

  const c = config[state];
  return (
    <div className={c.cls} aria-live="polite" role="status">
      <span className={c.dot} aria-hidden="true" />
      <span>{c.text}</span>
    </div>
  );
}
