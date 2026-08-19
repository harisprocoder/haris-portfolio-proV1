import { useEffect, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1200);
    const t2 = setTimeout(() => setDone(true), 2000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  if (done) return null;

  return (
    <div className={`preloader ${hidden ? "hidden" : ""}`} role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="preloader-logo" aria-hidden="true">MH</div>
    </div>
  );
}
