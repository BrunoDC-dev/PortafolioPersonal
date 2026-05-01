const links = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "mailto:brunodecruz.05@gmail.com" },
];

const companies = [
  "Mercado Libre",
  "Universidad de San Andres",
  "Blue Nose",
  "Decreditos",
  "HackITBA",
  "JPMorgan Chase Hackathon",
];

const work = [
  {
    company: "Mercado Libre",
    context: "Fraud Prevention",
    description: "Data science in risk, decisions and high-scale product systems.",
  },
  {
    company: "Universidad de San Andres",
    context: "AI research + teaching",
    description: "Applied intelligent systems, programming paradigms and academic work.",
  },
  {
    company: "Blue Nose",
    context: "CRM integrations",
    description: "Backend services, HubSpot workflows and operational automation.",
  },
  {
    company: "Decreditos",
    context: "Full stack development",
    description: "APIs, product features and systems connected to real users.",
  },
];

function NeuralBackground() {
  return (
    <div className="neural-bg" aria-hidden="true">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <g className="network network-a">
          <path d="M90 420 L250 260 L410 360 L570 210 L770 310 L960 170 L1120 260" />
          <path d="M180 520 L410 360 L610 480 L770 310 L1040 520" />
          <path d="M250 260 L610 480 L960 170" />
          <circle cx="90" cy="420" r="5" />
          <circle cx="250" cy="260" r="7" />
          <circle cx="410" cy="360" r="5" />
          <circle cx="570" cy="210" r="8" />
          <circle cx="770" cy="310" r="6" />
          <circle cx="960" cy="170" r="8" />
          <circle cx="1120" cy="260" r="5" />
          <circle cx="180" cy="520" r="6" />
          <circle cx="610" cy="480" r="7" />
          <circle cx="1040" cy="520" r="6" />
        </g>
        <g className="network network-b">
          <path d="M150 180 L340 130 L520 250 L690 120 L850 260 L1050 210" />
          <path d="M340 130 L420 500 L690 120 L930 450" />
          <circle cx="150" cy="180" r="4" />
          <circle cx="340" cy="130" r="5" />
          <circle cx="520" cy="250" r="4" />
          <circle cx="690" cy="120" r="5" />
          <circle cx="850" cy="260" r="4" />
          <circle cx="1050" cy="210" r="6" />
          <circle cx="420" cy="500" r="5" />
          <circle cx="930" cy="450" r="5" />
        </g>
      </svg>
    </div>
  );
}

function CompanyMarquee() {
  const repeated = [...companies, ...companies];

  return (
    <div className="marquee" aria-label="Companies and institutions">
      <div className="marquee-track">
        {repeated.map((company, index) => (
          <span key={`${company}-${index}`} className="company-wordmark">
            {company}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <main>
      <NeuralBackground />

      <header className="site-header">
        <a className="brand" href="#home">
          Bruno De Cruz
        </a>
        <nav aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="home" className="quote-hero" aria-labelledby="quote">
        <div className="quote-block">
          <p id="quote" className="quote">
            “Whatever you build,
            <br />
            build it with your whole heart.”
          </p>
          <p className="quote-source">Inspired by Colossians 3:23</p>
        </div>
      </section>

      <section id="work" className="profile-section" aria-labelledby="profile-title">
        <div className="profile-intro">
          <p className="eyebrow">AI & Data Builder</p>
          <h1 id="profile-title">Bruno De Cruz</h1>
          <p>
            Data Scientist at Mercado Libre. Building useful systems from real problems,
            with a focus on fraud prevention, AI, data and software.
          </p>
          <div className="profile-links">
            <a href="https://www.linkedin.com/in/bruno-de-cruz/">LinkedIn</a>
            <a href="https://github.com/BrunoDC-dev">GitHub</a>
            <a href="mailto:brunodecruz.05@gmail.com">Email</a>
          </div>
        </div>

        <CompanyMarquee />

        <div className="work-list" aria-label="Work experience">
          {work.map((item) => (
            <article key={item.company} className="work-item">
              <span>{item.company}</span>
              <strong>{item.context}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
