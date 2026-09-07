import { useEffect, useMemo, useRef, useState } from "react";
import {
  Gem,
  MessageCircle,
  Zap,
  ShieldCheck,
  Search,
  PenTool,
  Hammer,
  Rocket,
  LifeBuoy,
  Mail,
  Send,
  Copy,
  Check,
  ArrowUp,
  ChevronDown,
  Loader2,
  Sun,
  Moon,
  Github,
  Linkedin,
} from "lucide-react";

const EMAIL = "rajdeepsinghofficial08@gmail.com";

// Replace this with your real WhatsApp number: country code + number, no +, spaces, or dashes.
// Example for India: "919041974849"
const WHATSAPP_NUMBER = "919041974849";

const WHATSAPP_MESSAGE =
  "Hi! I saw your DevForge site and wanted to talk about a project.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// Replace this with your real Formspree endpoint.
const FORM_ENDPOINT = "https://formspree.io/f/xwlknlyo";

const SECTIONS = [
  { id: "home", num: "01", label: "DevForge" },
  { id: "about", num: "02", label: "About" },
  { id: "why", num: "03", label: "Why me" },
  { id: "services", num: "04", label: "Services" },
  { id: "pricing", num: "05", label: "Pricing" },
  { id: "process", num: "06", label: "Process" },
  { id: "work", num: "07", label: "Work" },
  { id: "faq", num: "08", label: "FAQ" },
  { id: "contact", num: "09", label: "Contact" },
];

const ROTATING_WORDS = [
  "websites.",
  "online stores.",
  "web apps.",
  "dashboards.",
];

const PILLARS = [
  {
    icon: Gem,
    title: "Quality over speed-runs",
    desc: "Every site is hand-built and tested across devices before it ships — no template dumped and forgotten.",
  },
  {
    icon: MessageCircle,
    title: "You talk to the person building it",
    desc: "No account managers, no relay chain. Questions get answered by whoever's actually writing the code — me.",
  },
  {
    icon: Zap,
    title: "Fast turnaround",
    desc: "Small team, zero internal meetings. Most sites go from kickoff to launch in 2–4 weeks.",
  },
  {
    icon: ShieldCheck,
    title: "Fair, upfront pricing",
    desc: "One quote before work starts. No surprise line items once the project is underway.",
  },
];

const SERVICES = [
  {
    title: "Business websites",
    desc: "Clean, fast sites for firms and shops that need a real online presence — built to load quickly and rank well.",
  },
  {
    title: "Online ordering & e-commerce",
    desc: "Menus, catalogs, carts, and checkout flows — customers browse, order, and pay without a phone call.",
  },
  {
    title: "Web applications",
    desc: "Dashboards, booking systems, internal tools — anything beyond a static page that needs real functionality.",
  },
  {
    title: "Redesigns & rebuilds",
    desc: "Already have a site that feels outdated or slow? I'll rebuild it without losing what already works.",
  },
  {
    title: "Ongoing maintenance",
    desc: "Bug fixes, content updates, and small feature additions after launch, billed hourly or on retainer.",
  },
];

const PROCESS = [
  {
    icon: Search,
    title: "Discovery",
    desc: "A short call to understand what the site needs to do and who it's for.",
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "A layout and visual direction you approve before any code gets written.",
  },
  {
    icon: Hammer,
    title: "Build",
    desc: "The actual site, built in stages so you can see progress along the way.",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Deployed, tested, and handed over — domain and hosting sorted out with you.",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    desc: "Around after launch for fixes, tweaks, or the next feature you need added.",
  },
];

const TECH_STACK = [
  "React",
  "Next.js",
  "Node.js",
  "Firebase",
  "PostgreSQL",
  "Tailwind",
  "TypeScript",
  "Figma",
];

/*
 * IMPORTANT:
 * These are your real base prices.
 * Keep them in INR and let the website convert them
 * automatically for international visitors.
 */
const PRICING = [
  {
    name: "Starter",
    priceINR: 5000,
    tagline: "A focused site to get you online",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form",
      "1 round of revisions",
    ],
    highlight: false,
  },
  {
    name: "Business",
    priceINR: 7000,
    tagline: "For firms that need ordering or booking",
    features: [
      "Everything in Starter",
      "Menu / catalog + cart",
      "Online payment integration",
      "Admin dashboard for orders",
      "2 rounds of revisions",
    ],
    highlight: true,
  },
  {
    name: "Custom",
    priceINR: null,
    tagline: "Web apps, dashboards, or anything bespoke",
    features: [
      "Custom scoped features",
      "Database & backend included",
      "Ongoing support option",
      "Scoped after a discovery call",
    ],
    highlight: false,
  },
];

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "It depends on scope, but every project starts with a single upfront quote after the discovery call — no hourly surprises unless you specifically want ongoing hourly maintenance.",
  },
  {
    q: "How long does a project take?",
    a: "Most business sites take 2–4 weeks from kickoff to launch. Larger web apps take longer — you'll get a realistic timeline before work starts.",
  },
  {
    q: "Do I own the code and design once it's done?",
    a: "Yes. Once the final invoice is paid, the code and design are yours — no ongoing license fees to keep your own site running.",
  },
  {
    q: "Who handles hosting and the domain?",
    a: "I'll set it up and walk you through it either way — domain and hosting accounts stay in your name so you're never locked in.",
  },
  {
    q: "What happens after the site launches?",
    a: "I stay reachable for fixes and small tweaks. If you need regular updates, we can set up a simple monthly maintenance arrangement.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              CURRENCY SYSTEM                               */
/* -------------------------------------------------------------------------- */

/*
 * Currency metadata.
 *
 * The visitor's country is detected automatically.
 * The currency code returned by the location API is then
 * used to fetch the INR -> local currency exchange rate.
 */
const CURRENCY_INFO = {
  INR: {
    name: "Indian Rupee",
    country: "India",
  },
  CAD: {
    name: "Canadian Dollar",
    country: "Canada",
  },
  USD: {
    name: "US Dollar",
    country: "United States",
  },
  GBP: {
    name: "British Pound",
    country: "United Kingdom",
  },
  AUD: {
    name: "Australian Dollar",
    country: "Australia",
  },
  NZD: {
    name: "New Zealand Dollar",
    country: "New Zealand",
  },
  EUR: {
    name: "Euro",
    country: "Europe",
  },
  AED: {
    name: "UAE Dirham",
    country: "United Arab Emirates",
  },
  SAR: {
    name: "Saudi Riyal",
    country: "Saudi Arabia",
  },
  SGD: {
    name: "Singapore Dollar",
    country: "Singapore",
  },
  JPY: {
    name: "Japanese Yen",
    country: "Japan",
  },
  CHF: {
    name: "Swiss Franc",
    country: "Switzerland",
  },
  SEK: {
    name: "Swedish Krona",
    country: "Sweden",
  },
  NOK: {
    name: "Norwegian Krone",
    country: "Norway",
  },
  DKK: {
    name: "Danish Krone",
    country: "Denmark",
  },
  PLN: {
    name: "Polish Zloty",
    country: "Poland",
  },
};

export default function DevForgeSite() {
  const [active, setActive] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [theme, setTheme] = useState("dark");

  /*
   * Currency state
   */
  const [currency, setCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencyLoading, setCurrencyLoading] = useState(true);

  const refs = useRef({});

  /*
   * ------------------------------------------------------------------------
   * AUTOMATIC COUNTRY + CURRENCY DETECTION
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    let cancelled = false;

    async function detectCurrency() {
      try {
        /*
         * First detect the visitor's country and currency.
         */
        const locationResponse = await fetch("https://ipapi.co/json/");

        if (!locationResponse.ok) {
          throw new Error("Unable to detect visitor location.");
        }

        const locationData = await locationResponse.json();

        const detectedCurrency = locationData?.currency || "INR";

        /*
         * If visitor is in India, no conversion is needed.
         */
        if (detectedCurrency === "INR") {
          if (!cancelled) {
            setCurrency("INR");
            setExchangeRate(1);
          }

          return;
        }

        /*
         * Fetch current INR -> visitor currency exchange rate.
         */
        const rateResponse = await fetch(
          "https://open.er-api.com/v6/latest/INR"
        );

        if (!rateResponse.ok) {
          throw new Error("Unable to fetch exchange rate.");
        }

        const rateData = await rateResponse.json();

        const rate = rateData?.rates?.[detectedCurrency];

        /*
         * Only use the detected currency if an exchange rate
         * actually exists.
         */
        if (rate && Number.isFinite(rate)) {
          if (!cancelled) {
            setCurrency(detectedCurrency);
            setExchangeRate(rate);
          }
        } else {
          /*
           * Unsupported currency → safely fall back to INR.
           */
          if (!cancelled) {
            setCurrency("INR");
            setExchangeRate(1);
          }
        }
      } catch (error) {
        console.error("Currency detection failed:", error);

        /*
         * Safe fallback:
         * If anything fails, your original INR prices remain visible.
         */
        if (!cancelled) {
          setCurrency("INR");
          setExchangeRate(1);
        }
      } finally {
        if (!cancelled) {
          setCurrencyLoading(false);
        }
      }
    }

    detectCurrency();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * ------------------------------------------------------------------------
   * PRICE FORMATTER
   * ------------------------------------------------------------------------
   *
   * Converts the INR base price into the visitor's local currency
   * and rounds it to a clean presentation price.
   */
  function formatLocalPrice(priceINR) {
    if (priceINR === null) {
      return "Let's talk";
    }

    const converted = priceINR * exchangeRate;

    let rounded;

    /*
     * Small values:
     * round to nearest 5.
     */
    if (converted < 100) {
      rounded = Math.round(converted / 5) * 5;
    }

    /*
     * Medium values:
     * round to nearest 10.
     */
    else if (converted < 1000) {
      rounded = Math.round(converted / 10) * 10;
    }

    /*
     * Larger values:
     * round to nearest 100.
     */
    else {
      rounded = Math.round(converted / 100) * 100;
    }

    /*
     * Prevent a very small converted value from accidentally
     * becoming zero.
     */
    if (rounded <= 0) {
      rounded = 1;
    }

    try {
      const formatted = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
        currencyDisplay: "symbol",
      }).format(rounded);

      return `${formatted}+`;
    } catch {
      return `${currency} ${rounded}+`;
    }
  }

  /*
   * Currency label used underneath the Pricing heading.
   */
  const currencyLabel =
    CURRENCY_INFO[currency]?.name || currency;

  /*
   * ------------------------------------------------------------------------
   * EXISTING SCROLL / NAVIGATION EFFECT
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    function onScroll() {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;

      setScrollPct(
        max > 0 ? (el.scrollTop / max) * 100 : 0
      );

      setShowTop(el.scrollTop > 500);
    }

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function scrollTo(id) {
    refs.current[id]?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div
      className={
        theme === "light"
          ? "df-root theme-light"
          : "df-root"
      }
    >
      <GlobalStyles />

      <div
        className="df-progress"
        style={{ width: `${scrollPct}%` }}
      />

      <button
        className="df-theme-toggle"
        onClick={() =>
          setTheme((t) =>
            t === "dark" ? "light" : "dark"
          )
        }
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun size={15} />
        ) : (
          <Moon size={15} />
        )}
      </button>

      <SideNav
        active={active}
        onNavigate={scrollTo}
      />

      <Hero
        scrollTo={scrollTo}
        refCallback={(el) =>
          (refs.current.home = el)
        }
      />

      <TechStrip />

      {/* -------------------------------- ABOUT ----------------------------- */}

      <section
        id="about"
        ref={(el) => (refs.current.about = el)}
        className="df-section"
      >
        <div className="df-section-head">
          <h2 className="df-kicker">About</h2>
        </div>

        <div className="df-section-body">
          <p className="df-lead">
            DevForge is run by one developer — no agency layer,
            no account managers, no outsourced build team.
          </p>

          <p className="df-body-text">
            That means every project gets full attention from
            planning through launch, and every question gets
            answered by the person who actually wrote the code.
            It also means projects stay small enough to move
            fast: most sites go from first call to live in a few
            weeks, not months.
          </p>
        </div>
      </section>

      {/* ---------------------------- WHY ME ------------------------------- */}

      <section
        id="why"
        ref={(el) => (refs.current.why = el)}
        className="df-section df-section-alt"
      >
        <div className="df-section-head">
          <h2 className="df-kicker">
            Why work with me
          </h2>

          <p className="df-kicker-sub">
            Four things every client gets, every project.
          </p>
        </div>

        <div className="df-pillar-grid">
          {PILLARS.map((p) => {
            const Icon = p.icon;

            return (
              <div
                className="df-pillar"
                key={p.title}
              >
                <span className="df-pillar-icon">
                  <Icon
                    size={18}
                    strokeWidth={2}
                  />
                </span>

                <h3>{p.title}</h3>

                <p>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------- SERVICES ----------------------------- */}

      <section
        id="services"
        ref={(el) => (refs.current.services = el)}
        className="df-section"
      >
        <div className="df-section-head">
          <h2 className="df-kicker">
            Services
          </h2>

          <p className="df-kicker-sub">
            Web development, start to finish.
          </p>
        </div>

        <ul className="df-service-list">
          {SERVICES.map((s) => (
            <li
              key={s.title}
              className="df-service-row"
            >
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ----------------------------- PRICING ----------------------------- */}

      <section
        id="pricing"
        ref={(el) => (refs.current.pricing = el)}
        className="df-section df-section-alt"
      >
        <div className="df-section-head">
          <h2 className="df-kicker">
            Pricing
          </h2>

          <div>
            <p className="df-kicker-sub">
              Rough starting points — every quote is scoped
              to what you actually need.
            </p>

            <p className="df-currency-display">
              {currencyLoading ? (
                <>
                  <Loader2
                    size={13}
                    className="df-spin"
                  />
                  Detecting local currency…
                </>
              ) : (
                <>
                  Prices shown in{" "}
                  <strong>{currency}</strong>
                  <span className="df-currency-name">
                    {" "}
                    · {currencyLabel}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="df-pricing-grid">
          {PRICING.map((tier) => (
            <div
              className={
                tier.highlight
                  ? "df-price-card highlight"
                  : "df-price-card"
              }
              key={tier.name}
            >
              {tier.highlight && (
                <span className="df-price-badge">
                  Most popular
                </span>
              )}

              <h3>{tier.name}</h3>

              <p className="df-price-tagline">
                {tier.tagline}
              </p>

              <p className="df-price-amount">
                {currencyLoading
                  ? "Loading..."
                  : formatLocalPrice(
                      tier.priceINR
                    )}
              </p>

              <ul className="df-price-features">
                {tier.features.map((f) => (
                  <li key={f}>
                    <Check size={14} /> {f}
                  </li>
                ))}
              </ul>

              <button
                className={
                  tier.highlight
                    ? "df-btn df-btn-primary df-price-cta"
                    : "df-btn df-btn-ghost df-price-cta"
                }
                onClick={() =>
                  scrollTo("contact")
                }
              >
                Get a quote
              </button>
            </div>
          ))}
        </div>

        <p className="df-pricing-note">
          Prices above are approximate starting prices shown
          in your local currency for convenience. Final quotes
          are scoped to what you actually need. Domain and
          hosting are billed separately. I can set up and
          manage both for you, or you're welcome to buy and
          hold your own domain/hosting if you'd rather.
        </p>
      </section>

      {/* ----------------------------- PROCESS ----------------------------- */}

      <section
        id="process"
        ref={(el) => (refs.current.process = el)}
        className="df-section"
      >
        <div className="df-section-head">
          <h2 className="df-kicker">
            How I work
          </h2>

          <p className="df-kicker-sub">
            Five stages, from first call to ongoing support.
          </p>
        </div>

        <div className="df-process-list">
          {PROCESS.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                className="df-process-row"
                key={step.title}
              >
                <span className="df-process-num">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="df-process-icon">
                  <Icon
                    size={17}
                    strokeWidth={2}
                  />
                </span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------- WORK ------------------------------ */}

      <section
        id="work"
        ref={(el) => (refs.current.work = el)}
        className="df-section"
      >
        <div className="df-section-head">
          <h2 className="df-kicker">
            Recent work
          </h2>
        </div>

        <div className="df-work-grid">
          <div className="df-work-card">
            <span className="df-work-tag">
              Web · Online ordering
            </span>

            <h3>Pizza Supplier</h3>

            <p>
              A full ordering site for a local pizza firm —
              browsable menu, dine-in / take-away / delivery
              selection, and online checkout.
            </p>
          </div>

          <div className="df-work-card df-work-card-placeholder">
            <span className="df-work-tag">
              Your project here
            </span>

            <h3>Next up: your site</h3>

            <p>
              This slot is waiting for the next client project.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------- FAQ ------------------------------- */}

      <section
        id="faq"
        ref={(el) => (refs.current.faq = el)}
        className="df-section df-section-alt"
      >
        <div className="df-section-head">
          <h2 className="df-kicker">
            FAQ
          </h2>

          <p className="df-kicker-sub">
            Common questions before getting started.
          </p>
        </div>

        <FaqList />
      </section>

      {/* ----------------------------- CONTACT ----------------------------- */}

      <ContactSection
        scrollRef={(el) =>
          (refs.current.contact = el)
        }
      />

      {/* ------------------------------ FOOTER ----------------------------- */}

      <footer className="df-footer">
        <span className="df-footer-brand">
          DevForge
        </span>

        <a
          className="df-footer-email"
          href={`mailto:${EMAIL}`}
        >
          <Mail size={13} /> {EMAIL}
        </a>

        <div className="df-footer-socials">
          <a
            href="https://github.com/rajdeepdev483"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>

          <a
            href="https://www.linkedin.com/in/rajdeep-singh-4458a53b5/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </footer>

      {/* ---------------------------- BACK TO TOP -------------------------- */}

      <button
        className={
          showTop
            ? "df-top-btn visible"
            : "df-top-btn"
        }
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>

      {/* --------------------------- WHATSAPP FAB -------------------------- */}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="df-whatsapp-fab"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}

/* ---------------------------------- HERO ---------------------------------- */

function Hero({ scrollTo, refCallback }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [glow, setGlow] = useState({
    x: 50,
    y: 40,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(
        (i) =>
          (i + 1) % ROTATING_WORDS.length
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const sparks = useMemo(
    () =>
      Array.from(
        { length: 16 },
        (_, i) => ({
          left: Math.random() * 100,
          delay: Math.random() * 6,
          duration: 4 + Math.random() * 4,
          size: 2 + Math.random() * 3,
        })
      ),
    []
  );

  function handleMouseMove(e) {
    const rect =
      e.currentTarget.getBoundingClientRect();

    setGlow({
      x:
        ((e.clientX - rect.left) /
          rect.width) *
        100,

      y:
        ((e.clientY - rect.top) /
          rect.height) *
        100,
    });
  }

  return (
    <section
      id="home"
      ref={refCallback}
      className="df-hero"
      onMouseMove={handleMouseMove}
    >
      <div
        className="df-hero-glow"
        style={{
          background: `radial-gradient(
            500px circle at ${glow.x}% ${glow.y}%,
            rgba(242,98,46,0.16),
            transparent 60%
          )`,
        }}
        aria-hidden="true"
      />

      <div
        className="df-sparks"
        aria-hidden="true"
      >
        {sparks.map((s, i) => (
          <span
            key={i}
            className="df-spark"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="df-hero-content">
        <span className="df-availability">
          <span className="df-availability-dot" />
          Available for new projects
        </span>

        <p className="df-eyebrow">
          Solo web development shop
        </p>

        <h1 className="df-h1">
          One developer.
          <br />
          Real{" "}
          <span className="df-rotate-wrap">
            <span
              key={wordIndex}
              className="df-rotate-word"
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        <p className="df-sub">
          DevForge is a one-person studio building fast,
          functional websites for firms who'd rather work
          directly with the person doing the work than a
          project manager relaying messages.
        </p>

        <div className="df-hero-actions">
          <button
            className="df-btn df-btn-primary"
            onClick={() => scrollTo("contact")}
          >
            Start a project
          </button>

          <button
            className="df-btn df-btn-ghost"
            onClick={() => scrollTo("work")}
          >
            See recent work
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- TECH STRIP -------------------------------- */

function TechStrip() {
  const loop = [
    ...TECH_STACK,
    ...TECH_STACK,
  ];

  return (
    <div className="df-tech-strip">
      <div className="df-tech-track">
        {loop.map((t, i) => (
          <span
            className="df-tech-pill"
            key={i}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------- FAQ ------------------------------------ */

function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="df-faq-list">
      {FAQS.map((item, i) => {
        const isOpen = open === i;

        return (
          <div
            className={
              isOpen
                ? "df-faq-item open"
                : "df-faq-item"
            }
            key={item.q}
          >
            <button
              className="df-faq-q"
              onClick={() =>
                setOpen(
                  isOpen ? -1 : i
                )
              }
            >
              <span>{item.q}</span>

              <ChevronDown
                size={16}
                className="df-faq-chevron"
              />
            </button>

            <div className="df-faq-a-wrap">
              <p className="df-faq-a">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------- CONTACT ---------------------------------- */

function ContactSection({ scrollRef }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] =
    useState("idle");

  const [copied, setCopied] =
    useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.message
    ) {
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(
        FORM_ENDPOINT,
        {
          method: "POST",
          headers: {
            Accept:
              "application/json",
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        setStatus("success");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function copyEmail() {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setCopied(true);

        window.setTimeout(
          () => setCopied(false),
          1500
        );
      });
  }

  return (
    <section
      id="contact"
      ref={scrollRef}
      className="df-section df-contact"
    >
      <div className="df-section-head">
        <h2 className="df-kicker">
          Contact
        </h2>

        <p className="df-kicker-sub">
          Tell me about the site you need — I'll reply
          within a day.
        </p>
      </div>

      <form
        className="df-form"
        onSubmit={handleSubmit}
      >
        <div className="df-form-row">
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) =>
              handleChange(
                "name",
                e.target.value
              )
            }
            required
          />

          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) =>
              handleChange(
                "email",
                e.target.value
              )
            }
            required
          />
        </div>

        <textarea
          rows={4}
          placeholder="What are you looking to build?"
          value={form.message}
          onChange={(e) =>
            handleChange(
              "message",
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
          className="df-btn df-btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <Loader2
                size={15}
                className="df-spin"
              />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send size={15} />
            </>
          )}
        </button>

        {status === "success" && (
          <p className="df-form-status success">
            <Check size={14} />
            Message sent — I'll get back to you soon.
          </p>
        )}

        {status === "error" && (
          <p className="df-form-status error">
            Couldn't send that. Email me directly at{" "}
            {EMAIL} instead.
          </p>
        )}
      </form>

      <div className="df-contact-alt">
        <Mail size={14} />

        <a href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>

        <button
          className="df-copy-btn"
          onClick={copyEmail}
          aria-label="Copy email"
        >
          {copied ? (
            <Check size={13} />
          ) : (
            <Copy size={13} />
          )}
        </button>
      </div>

      <div className="df-contact-alt">
        <MessageCircle size={14} />

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Message me on WhatsApp
        </a>
      </div>
    </section>
  );
}

/* -------------------------------- GLOBAL STYLES ----------------------------- */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

      :root {
        --ink: #14171F;
        --surface: #1B1F2A;
        --surface-2: #232838;
        --paper: #ECE8DE;
        --muted: #8B93A7;
        --ember: #F2622E;
        --ember-deep: #C94A1F;
        --steel: #5B8DEF;
        --line: #2C3142;
      }

      .df-root * {
        box-sizing: border-box;
      }

      .df-root {
        background: var(--ink);
        color: var(--paper);
        font-family: 'IBM Plex Sans', sans-serif;
        min-height: 100vh;
        line-height: 1.6;
        position: relative;
      }

      .df-root h1,
      .df-root h2,
      .df-root h3 {
        font-family: 'Big Shoulders Display', sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.01em;
        margin: 0;
        color: var(--paper);
      }

      .df-root em {
        font-style: normal;
        color: var(--ember);
      }

      .df-root button {
        font-family: inherit;
        cursor: pointer;
      }

      .df-root a {
        color: inherit;
      }

      .df-root input,
      .df-root textarea {
        font-family: inherit;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 6px;
        padding: 12px 14px;
        color: var(--paper);
        width: 100%;
        font-size: 0.92rem;
      }

      .df-root input::placeholder,
      .df-root textarea::placeholder {
        color: var(--muted);
      }

      .df-root input:focus,
      .df-root textarea:focus,
      .df-root button:focus-visible {
        outline: 2px solid var(--ember);
        outline-offset: 2px;
      }

      .df-btn {
        padding: 13px 24px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.92rem;
        border: none;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .df-btn-primary {
        background: var(--ember);
        color: #1A0D06;
      }

      .df-btn-primary:hover {
        background: var(--ember-deep);
        color: #fff;
      }

      .df-btn-primary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .df-btn-ghost {
        background: transparent;
        border: 1.5px solid var(--line);
        color: var(--paper);
      }

      .df-btn-ghost:hover {
        border-color: var(--ember);
        color: var(--ember);
      }

      .df-spin {
        animation: df-spin 0.8s linear infinite;
      }

      @keyframes df-spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* ---- Scroll progress ---- */

      .df-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--ember);
        z-index: 50;
        transition: width 0.1s linear;
      }

      /* ---- Side nav ---- */

      .df-sidenav {
        position: fixed;
        top: 50%;
        right: 32px;
        transform: translateY(-50%);
        z-index: 30;
      }

      .df-sidenav-track {
        position: relative;
        display: flex;
        flex-direction: column;
      }

      .df-sidenav-item {
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        height: 34px;
        padding: 0 14px 0 0;
      }

      .df-sidenav-label {
        font-size: 0.78rem;
        color: var(--muted);
        opacity: 0;
        transform: translateX(6px);
        transition:
          opacity 0.15s,
          transform 0.15s;
        white-space: nowrap;
      }

      .df-sidenav-item:hover .df-sidenav-label,
      .df-sidenav-item.active .df-sidenav-label {
        opacity: 1;
        transform: translateX(0);
      }

      .df-sidenav-item.active .df-sidenav-label {
        color: var(--paper);
        font-weight: 600;
      }

      .df-sidenav-num {
        font-family: 'Big Shoulders Display', sans-serif;
        font-size: 0.78rem;
        color: var(--muted);
        width: 16px;
        text-align: right;
      }

      .df-sidenav-item.active .df-sidenav-num {
        color: var(--ember);
      }

      .df-sidenav-dot {
        position: absolute;
        right: -2px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--ember);
        transition: top 0.25s ease;
      }

      /* ---- Hero ---- */

      .df-hero {
        position: relative;
        min-height: 92vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        width: 100%;
      }

      .df-hero-content {
        position: relative;
        z-index: 1;
        max-width: 900px;
        padding: 0 100px 0 64px;
        display: flex;
        flex-direction: column;
      }

      .df-hero-glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
      }

      .df-sparks {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }

      .df-spark {
        position: absolute;
        bottom: -10px;
        background: var(--ember);
        border-radius: 50%;
        opacity: 0;
        animation-name: df-spark-rise;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
      }

      @keyframes df-spark-rise {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }

        10% {
          opacity: 0.8;
        }

        90% {
          opacity: 0.2;
        }

        100% {
          transform: translateY(-70vh) translateX(20px);
          opacity: 0;
        }
      }

      .df-eyebrow {
        position: relative;
        z-index: 1;
        color: var(--ember);
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        margin-bottom: 18px;
        text-transform: uppercase;
      }

      .df-h1 {
        position: relative;
        z-index: 1;
        font-size: 4rem;
        line-height: 1.05;
        margin-bottom: 26px;
      }

      .df-rotate-wrap {
        display: inline-block;
        color: var(--ember);
        min-width: 1px;
      }

      .df-rotate-word {
        display: inline-block;
        animation: df-word-fade 0.4s ease;
      }

      @keyframes df-word-fade {
        from {
          opacity: 0;
          transform: translateY(6px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .df-sub {
        position: relative;
        z-index: 1;
        font-family: 'IBM Plex Sans', sans-serif;
        color: var(--muted);
        font-size: 1.05rem;
        max-width: 56ch;
        margin-bottom: 34px;
        text-transform: none;
      }

      .df-hero-actions {
        position: relative;
        z-index: 1;
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }

      /* ---- Tech strip ---- */

      .df-tech-strip {
        overflow: hidden;
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
        background: var(--surface);
        padding: 18px 0;
      }

      .df-tech-track {
        display: flex;
        gap: 14px;
        width: max-content;
        animation: df-marquee 26s linear infinite;
        will-change: transform;
      }

      @keyframes df-marquee {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }

      .df-tech-pill {
        padding: 8px 18px;
        border: 1px solid var(--line);
        border-radius: 20px;
        font-size: 0.82rem;
        color: var(--muted);
        white-space: nowrap;
      }

      /* ---- Generic section ---- */

      .df-section {
        padding: 90px 100px 90px 64px;
        border-top: 1px solid var(--line);
      }

      .df-section-alt {
        background: var(--surface);
      }

      .df-section-head {
        display: grid;
        grid-template-columns: 260px 1fr;
        gap: 24px;
        margin-bottom: 44px;
        align-items: baseline;
      }

      .df-kicker {
        font-size: 2.1rem;
      }

      .df-kicker-sub {
        color: var(--muted);
        font-family: 'IBM Plex Sans', sans-serif;
        text-transform: none;
        font-size: 1rem;
        margin: 0;
      }

      /*
       * New currency status line
       */
      .df-currency-display {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 7px 0 0;
        color: var(--ember);
        font-size: 0.78rem;
        font-family: 'IBM Plex Sans', sans-serif;
        text-transform: none;
      }

      .df-currency-display strong {
        font-weight: 700;
      }

      .df-currency-name {
        color: var(--muted);
      }

      .df-section-body {
        display: grid;
        grid-template-columns: 260px 1fr;
        gap: 24px;
      }

      .df-lead {
        grid-column: 2;
        font-size: 1.2rem;
        color: var(--paper);
        margin: 0 0 16px;
        max-width: 60ch;
      }

      .df-body-text {
        grid-column: 2;
        color: var(--muted);
        max-width: 62ch;
        margin: 0;
      }

      /* ---- Pillars ---- */

      .df-pillar-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1px;
        background: var(--line);
        border: 1px solid var(--line);
      }

      .df-pillar {
        background: var(--surface);
        padding: 30px;
        transition: background 0.2s;
      }

      .df-pillar:hover {
        background: var(--surface-2);
      }

      .df-pillar-icon {
        display: inline-flex;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: rgba(242,98,46,0.12);
        color: var(--ember);
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
      }

      .df-pillar h3 {
        font-size: 1.1rem;
        margin-bottom: 8px;
      }

      .df-pillar p {
        color: var(--muted);
        font-size: 0.92rem;
        margin: 0;
        text-transform: none;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      /* ---- Services ---- */

      .df-service-list {
        list-style: none;
        margin: 0;
        padding: 0;
        grid-column: 2;
      }

      .df-service-row {
        padding: 26px 100px 26px 64px;
        margin: 0 -100px 0 -64px;
        border-bottom: 1px solid var(--line);
        display: grid;
        grid-template-columns: 260px 1fr;
        gap: 24px;
        transition: background 0.2s;
      }

      .df-service-row:first-child {
        border-top: 1px solid var(--line);
      }

      .df-service-row:hover {
        background: var(--surface-2);
      }

      .df-service-row h3 {
        font-size: 1.3rem;
      }

      .df-service-row p {
        color: var(--muted);
        font-size: 0.95rem;
        margin: 0;
        text-transform: none;
        font-family: 'IBM Plex Sans', sans-serif;
        max-width: 56ch;
      }

      /* ---- Process ---- */

      .df-process-list {
        display: flex;
        flex-direction: column;
      }

      .df-process-row {
        display: grid;
        grid-template-columns: 50px 44px 1fr;
        align-items: start;
        gap: 18px;
        padding: 22px 100px 22px 64px;
        margin: 0 -100px 0 -64px;
        border-bottom: 1px solid var(--line);
        transition: background 0.2s;
      }

      .df-process-row:first-child {
        border-top: 1px solid var(--line);
      }

      .df-process-row:hover {
        background: var(--surface-2);
      }

      .df-process-num {
        font-family: 'Big Shoulders Display', sans-serif;
        font-size: 1.3rem;
        color: var(--line);
      }

      .df-process-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid var(--ember);
        color: var(--ember);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .df-process-row h3 {
        font-size: 1.05rem;
        margin-bottom: 4px;
      }

      .df-process-row p {
        color: var(--muted);
        font-size: 0.9rem;
        margin: 0;
        text-transform: none;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      /* ---- Work ---- */

      .df-work-grid {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
      }

      .df-work-card {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 26px;
        transition:
          transform 0.2s,
          border-color 0.2s;
      }

      .df-work-card:hover {
        transform: translateY(-3px);
        border-color: var(--ember);
      }

      .df-work-card-placeholder {
        border-style: dashed;
        opacity: 0.6;
      }

      .df-work-card-placeholder:hover {
        transform: none;
        border-color: var(--line);
      }

      .df-work-tag {
        color: var(--ember);
        font-size: 0.76rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .df-work-card h3 {
        font-size: 1.4rem;
        margin: 10px 0 8px;
      }

      .df-work-card p {
        color: var(--muted);
        font-size: 0.92rem;
        margin: 0;
        text-transform: none;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      /* ---- FAQ ---- */

      .df-faq-list {
        grid-column: 2;
        display: flex;
        flex-direction: column;
      }

      .df-faq-item {
        border-bottom: 1px solid var(--line);
      }

      .df-faq-item:first-child {
        border-top: 1px solid var(--line);
      }

      .df-faq-q {
        width: 100%;
        background: none;
        border: none;
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--paper);
        font-size: 1rem;
        font-weight: 500;
        text-align: left;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .df-faq-chevron {
        transition: transform 0.2s;
        color: var(--muted);
        flex-shrink: 0;
      }

      .df-faq-item.open .df-faq-chevron {
        transform: rotate(180deg);
        color: var(--ember);
      }

      .df-faq-a-wrap {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.25s ease;
      }

      .df-faq-item.open .df-faq-a-wrap {
        grid-template-rows: 1fr;
      }

      .df-faq-a {
        overflow: hidden;
        color: var(--muted);
        font-size: 0.92rem;
        margin: 0;
        padding-right: 40px;
        max-width: 62ch;
      }

      .df-faq-item.open .df-faq-a {
        padding-bottom: 18px;
      }

      /* ---- Contact ---- */

      .df-contact {
        padding-bottom: 60px;
      }

      .df-form {
        grid-column: 2;
        display: flex;
        flex-direction: column;
        gap: 14px;
        max-width: 560px;
      }

      .df-form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }

      .df-form-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
        margin: 4px 0 0;
      }

      .df-form-status.success {
        color: #7BC67E;
      }

      .df-form-status.error {
        color: #E4756B;
      }

      .df-contact-alt {
        grid-column: 2;
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--muted);
        font-size: 0.92rem;
        max-width: 560px;
      }

      .df-contact-alt a {
        text-decoration: none;
        border-bottom: 1px solid var(--line);
      }

      .df-contact-alt a:hover {
        color: var(--ember);
        border-color: var(--ember);
      }

      .df-copy-btn {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 5px;
        padding: 5px 6px;
        color: var(--muted);
        display: inline-flex;
      }

      .df-copy-btn:hover {
        color: var(--ember);
        border-color: var(--ember);
      }

      /* ---- Footer ---- */

      .df-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 26px 100px 26px 64px;
        border-top: 1px solid var(--line);
        flex-wrap: wrap;
        gap: 10px;
      }

      .df-footer-brand {
        font-family: 'Big Shoulders Display', sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 1.1rem;
      }

      .df-footer-email {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--muted);
        font-size: 0.82rem;
        text-decoration: none;
      }

      .df-footer-email:hover {
        color: var(--ember);
      }

      /* ---- Back to top ---- */

      .df-top-btn {
        position: fixed;
        bottom: 28px;
        left: 28px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--surface);
        border: 1px solid var(--line);
        color: var(--paper);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transform: translateY(8px);
        transition:
          opacity 0.2s,
          transform 0.2s,
          border-color 0.2s;
        z-index: 30;
      }

      .df-top-btn.visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      .df-top-btn:hover {
        border-color: var(--ember);
        color: var(--ember);
      }

      /* ---- WhatsApp floating button ---- */

      .df-whatsapp-fab {
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: #25D366;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(37,211,102,0.4);
        z-index: 30;
        transition:
          transform 0.2s,
          box-shadow 0.2s;
      }

      .df-whatsapp-fab:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 20px rgba(37,211,102,0.55);
      }

      /* ---- Theme toggle & light theme ---- */

      .df-theme-toggle {
        position: fixed;
        top: 24px;
        right: 32px;
        z-index: 40;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--surface);
        border: 1px solid var(--line);
        color: var(--paper);
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          border-color 0.2s,
          color 0.2s;
      }

      .df-theme-toggle:hover {
        border-color: var(--ember);
        color: var(--ember);
      }

      .df-root.theme-light {
        --ink: #F5F1E8;
        --surface: #FFFFFF;
        --surface-2: #F1ECDD;
        --paper: #1B1F2A;
        --muted: #6B7280;
        --line: #E1DACB;
      }

      .df-root.theme-light .df-btn-primary {
        color: #fff;
      }

      .df-root.theme-light .df-work-card:hover,
      .df-root.theme-light .df-pillar:hover {
        background: var(--surface-2);
      }

      /* ---- Availability badge ---- */

      .df-availability {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px;
        border: 1px solid var(--line);
        border-radius: 20px;
        font-size: 0.78rem;
        color: var(--muted);
        margin-bottom: 18px;
        width: fit-content;
        text-transform: none;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .df-availability-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #6FCF7A;
        box-shadow: 0 0 0 0 rgba(111,207,122,0.5);
        animation: df-pulse 2s infinite;
      }

      @keyframes df-pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(111,207,122,0.5);
        }

        70% {
          box-shadow: 0 0 0 6px rgba(111,207,122,0);
        }

        100% {
          box-shadow: 0 0 0 0 rgba(111,207,122,0);
        }
      }

      /* ---- Pricing ---- */

      .df-pricing-grid {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
      }

      .df-price-card {
        position: relative;
        background: var(--ink);
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 30px 26px;
        display: flex;
        flex-direction: column;
      }

      .df-price-card.highlight {
        border-color: var(--ember);
        background: var(--surface-2);
      }

      .df-price-badge {
        position: absolute;
        top: -12px;
        left: 26px;
        background: var(--ember);
        color: #1A0D06;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }

      .df-price-card h3 {
        font-size: 1.3rem;
        margin-bottom: 6px;
      }

      .df-price-tagline {
        color: var(--muted);
        font-size: 0.85rem;
        margin: 0 0 16px;
        text-transform: none;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .df-price-amount {
        font-family: 'Big Shoulders Display', sans-serif;
        font-size: 1.8rem;
        color: var(--ember);
        margin: 0 0 20px;
      }

      .df-price-features {
        list-style: none;
        margin: 0 0 26px;
        padding: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .df-price-features li {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        color: var(--muted);
        font-size: 0.88rem;
        text-transform: none;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .df-price-features li svg {
        color: var(--ember);
        flex-shrink: 0;
        margin-top: 2px;
      }

      .df-price-cta {
        width: 100%;
        justify-content: center;
      }

      .df-pricing-note {
        grid-column: 1 / -1;
        color: var(--muted);
        font-size: 0.85rem;
        margin: 24px 0 0;
        max-width: 70ch;
        text-transform: none;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      /* ---- Footer socials ---- */

      .df-footer-socials {
        display: flex;
        gap: 14px;
      }

      .df-footer-socials a {
        color: var(--muted);
        display: flex;
      }

      .df-footer-socials a:hover {
        color: var(--ember);
      }

      /* ---- Reduced motion ---- */

      @media (prefers-reduced-motion: reduce) {
        .df-spark,
        .df-rotate-word {
          animation: none;
        }
      }

      /* ---- Responsive ---- */

      @media (max-width: 900px) {
        .df-sidenav {
          display: none;
        }

        .df-hero-content {
          padding-left: 24px;
          padding-right: 24px;
        }

        .df-section,
        .df-footer {
          padding-left: 24px;
          padding-right: 24px;
        }

        .df-h1 {
          font-size: 2.6rem;
        }

        .df-section-head,
        .df-section-body {
          grid-template-columns: 1fr;
        }

        .df-lead,
        .df-body-text,
        .df-service-list,
        .df-contact-alt,
        .df-form,
        .df-faq-list {
          grid-column: 1;
        }

        .df-service-row {
          grid-template-columns: 1fr;
          padding: 20px 24px;
          margin: 0 -24px;
        }

        .df-process-row {
          padding: 18px 24px;
          margin: 0 -24px;
        }

        .df-pillar-grid,
        .df-work-grid,
        .df-pricing-grid {
          grid-template-columns: 1fr;
        }

        .df-form-row {
          grid-template-columns: 1fr;
        }

        .df-top-btn {
          left: 16px;
          bottom: 16px;
        }

        .df-whatsapp-fab {
          right: 16px;
          bottom: 16px;
        }

        .df-theme-toggle {
          top: 16px;
          right: 16px;
        }

        .df-currency-display {
          margin-top: 10px;
        }
      }
    `}</style>
  );
}

/* -------------------------------- SIDE NAV -------------------------------- */

function SideNav({ active, onNavigate }) {
  const activeIndex = SECTIONS.findIndex(
    (s) => s.id === active
  );

  return (
    <nav
      className="df-sidenav"
      aria-label="Section navigation"
    >
      <div className="df-sidenav-track">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={
              active === s.id
                ? "df-sidenav-item active"
                : "df-sidenav-item"
            }
            onClick={() =>
              onNavigate(s.id)
            }
          >
            <span className="df-sidenav-label">
              {s.label}
            </span>

            <span className="df-sidenav-num">
              {s.num}
            </span>
          </button>
        ))}

        <span
          className="df-sidenav-dot"
          style={{
            top: `${activeIndex * 34 + 6}px`,
          }}
          aria-hidden="true"
        />
      </div>
    </nav>
  );
}