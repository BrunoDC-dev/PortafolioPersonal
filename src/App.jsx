import { useEffect, useLayoutEffect, useState } from "react";

const links = [
  { label: "home", href: "#home" },
  { label: "work", href: "#work" },
  { label: "contact", href: "#contact" },
];

const calendlyUrl = "https://calendly.com/brunodecruz";

const work = [
  {
    company: "Mercado Libre",
    context: "Security & Fraud Prevention",
    description: "Data science, risk signals and decision systems in a high-scale marketplace.",
  },
  {
    company: "Universidad de San Andres",
    context: "AI Research & Teaching",
    description: "Applied intelligent systems, programming paradigms and technical communication.",
  },
  {
    company: "Blue Nose",
    context: "CRM Consulting",
    description: "HubSpot integrations, backend services and automation for business operations.",
  },
  {
    company: "Decreditos",
    context: "Finance",
    description: "Full-stack product work, APIs and systems connected to financial workflows.",
  },
];

function ThemeIcon({ theme }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {theme === "light" ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </>
      ) : (
        <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
      )}
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const [activeHash, setActiveHash] = useState(() => window.location.hash || "#home");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#131212" : "#f0f0f0";
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash || "#home");
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useLayoutEffect(() => {
    const section = document.getElementById(window.location.hash.slice(1));
    if (section) section.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">Skip to content</a>
      <header id="home" className="site-header">
        <a className="brand" href="#home">Bruno De Cruz</a>
        <nav className="navigation" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={activeHash === link.href ? "location" : undefined}>
              <span className="nav-slash" aria-hidden="true">/</span>
              <span className="nav-label">{link.label}</span>
            </a>
          ))}
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        >
          <ThemeIcon theme={theme} />
        </button>
      </header>

      <main className="page-content">
        <section className="quote-hero" aria-label="A thought to build by">
          <blockquote className="quote">
            <p>“Whatever you build,<br />build it with your whole heart.”</p>
            <cite>Inspired by Colossians 3:23</cite>
          </blockquote>
        </section>

        <a className="section-jump" href="#work">work <span aria-hidden="true">↓</span></a>

        <section id="work" className="profile-section" aria-labelledby="profile-title">
          <h1 id="profile-title">Bruno De Cruz</h1>
          <p className="role">AI & Data Builder</p>
          <p className="bio">
            Data Scientist at Mercado Libre. Building useful systems from real problems,
            with a founder-minded approach to AI, data, automation and product work.
          </p>
          <div className="profile-links" aria-label="Find me online">
            <a href={calendlyUrl}>Book a call</a>
            <a href="https://www.linkedin.com/in/bruno-de-cruz/">LinkedIn</a>
            <a href="https://github.com/BrunoDC-dev">GitHub</a>
            <a href="mailto:brunodecruz.05@gmail.com">Email</a>
          </div>

          <h2 className="experience-heading">Companies I’ve worked with</h2>
          <div className="work-list">
            {work.map((item) => (
              <article key={item.company} className="work-item">
                <h3>{item.company}</h3>
                <p className="work-context">{item.context}</p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p>Want to talk through an idea, workflow, or product?</p>
          <p>
            <a href={calendlyUrl}>Book a call</a> or reach me through{" "}
            <a href="mailto:brunodecruz.05@gmail.com">email</a>.
          </p>
        </section>
        <footer className="site-footer"><a href="#home">back to top <span aria-hidden="true">↑</span></a></footer>
      </main>
    </>
  );
}

export default App;
