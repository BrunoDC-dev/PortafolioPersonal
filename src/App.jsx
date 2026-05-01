import { lazy, Suspense } from "react";

const ProblemMap = lazy(() => import("./ProblemMap.jsx"));

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bruno-de-cruz/" },
  { label: "GitHub", href: "https://github.com/BrunoDC-dev" },
  { label: "Email", href: "mailto:brunodecruz.05@gmail.com" },
];

const exploring = [
  "AI-assisted workflows",
  "Internal tools",
  "Data products",
  "MVPs from narrow problems",
];

const signals = [
  "Data Scientist at Mercado Libre",
  "AI Engineering at Universidad de San Andres",
  "Microsoft Certified: Azure AI Engineer Associate",
  "HackITBA 2024 winner",
  "JPMorgan Chase Hackathon 2025, 2nd place",
];

const tools = ["Python", "PyTorch", "Pandas", "Azure", "Node.js", "Next.js", "React", "SQL"];

function App() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">AI & Data Builder</p>
          <h1 id="hero-title">Bruno De Cruz</h1>
          <p className="hero-line">I build small, useful systems from real problems.</p>
          <p className="hero-note">
            Data Scientist at Mercado Libre. Exploring AI workflows, internal tools,
            data products and MVPs.
          </p>
          <div className="actions" aria-label="Primary links">
            <a className="button primary" href="#calendly-coming-soon">
              Book a call
            </a>
            {links.map((link) => (
              <a key={link.label} className="button" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="map-wrap" aria-label="Interactive problem map">
          <Suspense fallback={<div className="map-fallback">Loading problem map...</div>}>
            <ProblemMap />
          </Suspense>
        </div>
      </section>

      <section className="content-grid" aria-label="Portfolio details">
        <article>
          <span className="section-kicker">Currently exploring</span>
          <ul>
            {exploring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article>
          <span className="section-kicker">Signals</span>
          <ul>
            {signals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="wide">
          <span className="section-kicker">Tools</span>
          <div className="tool-list">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </article>
      </section>

      <footer id="calendly-coming-soon" className="footer">
        <p>Building, learning, shipping.</p>
        <p>
          Calendly link coming soon. For now, reach me through{" "}
          <a href="mailto:brunodecruz.05@gmail.com">email</a> or{" "}
          <a href="https://www.linkedin.com/in/bruno-de-cruz/">LinkedIn</a>.
        </p>
      </footer>
    </main>
  );
}

export default App;
