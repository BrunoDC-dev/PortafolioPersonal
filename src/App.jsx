import { lazy, Suspense, useState } from "react";

const NeuralLab = lazy(() => import("./ProblemMap.jsx"));

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bruno-de-cruz/" },
  { label: "GitHub", href: "https://github.com/BrunoDC-dev" },
  { label: "Email", href: "mailto:brunodecruz.05@gmail.com" },
];

const modes = [
  { id: "observe", label: "observe", caption: "messy inputs" },
  { id: "prototype", label: "prototype", caption: "first useful version" },
  { id: "ship", label: "ship", caption: "real signal" },
];

function App() {
  const [mode, setMode] = useState("prototype");
  const activeMode = modes.find((item) => item.id === mode);

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">AI & Data Builder</p>
          <h1 id="hero-title">Bruno De Cruz</h1>
          <p className="hero-line">Small tools. Useful data. Real problems.</p>
          <p className="hero-note">
            Data Scientist at Mercado Libre. Mostly building, learning, and shipping.
          </p>
          <div className="links" aria-label="Contact links">
            {links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="lab-panel">
          <div className="lab-header">
            <div>
              <span className="lab-kicker">tiny inference machine</span>
              <p>{activeMode.caption}</p>
            </div>
            <div className="mode-switch" aria-label="Neural lab mode">
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === mode ? "active" : ""}
                  onClick={() => setMode(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="neural-stage" aria-label="Interactive neural inference visual">
            <Suspense fallback={<div className="stage-fallback">warming up...</div>}>
              <NeuralLab mode={mode} />
            </Suspense>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>Building, learning, shipping.</span>
        <span>Calendly soon. For now, say hi by email or LinkedIn.</span>
      </footer>
    </main>
  );
}

export default App;
