"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const whatsappUrl =
  "https://wa.me/966509955337?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D9%85%D8%AD%D9%85%D8%AF%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D9%86%D8%A7%D8%A1%20%D9%85%D9%86%D8%AA%D8%AC%20%D8%B1%D9%82%D9%85%D9%8A";

const navItems = [
  { label: "من نحن", href: "#about" },
  { label: "أعمالنا", href: "#work" },
  { label: "الخدمات", href: "#services" },
  { label: "تواصل", href: "#contact" },
];

const projects = [
  {
    name: "وصلة",
    type: "منصة خدمات",
    description: "تجربة رقمية تختصر الطريق بين العميل والخدمة من أول نقرة.",
    icon: "link" as const,
    accent: "gold",
  },
  {
    name: "سوق الموظفين",
    type: "منتج موارد بشرية",
    description: "مساحة ذكية لترتيب الفرص والموارد البشرية في تجربة أوضح.",
    icon: "briefcase" as const,
    accent: "violet",
  },
  {
    name: "مرصد تسعة / نسق",
    type: "منصات بيانات",
    description: "واجهات ومنتجات تجعل البيانات قابلة للفهم، والمعلومة قابلة للقرار.",
    icon: "orbit" as const,
    accent: "cyan",
  },
  {
    name: "المعلمة",
    type: "أداة تعليمية",
    description: "حل عربي يقرّب المعرفة من المستخدم ويحوّلها إلى خطوات عملية.",
    icon: "spark" as const,
    accent: "rose",
  },
  {
    name: "عقل",
    type: "نظام ذكاء اصطناعي",
    description: "مساعد رقمي يحوّل الأفكار المتناثرة إلى أنظمة قابلة للتنفيذ.",
    icon: "brain" as const,
    accent: "mint",
  },
];

const services = [
  {
    eyebrow: "للإطلاق السريع",
    title: "صفحة هبوط",
    price: "يبدأ من 1,500 ر.س",
    description: "صفحة مركّزة تقنع العميل وتدفعه إلى الإجراء الصحيح.",
    features: ["تصميم Mobile-First", "كتابة وترتيب المحتوى", "زر واتساب وتحليلات أساسية"],
  },
  {
    eyebrow: "الأكثر طلبًا",
    title: "موقع احترافي كامل",
    price: "يبدأ من 4,500 ر.س",
    description: "حضور رقمي فاخر يشرح قيمتك ويجعل التواصل معك أسهل.",
    features: ["حتى 6 أقسام أو صفحات", "هوية بصرية وحركات ناعمة", "تهيئة للنشر على Vercel"],
    featured: true,
  },
  {
    eyebrow: "للمنتجات الجادة",
    title: "منتج SaaS مخصص",
    price: "يبدأ من 12,000 ر.س",
    description: "من الفكرة إلى نسخة قابلة للبيع مع ذكاء اصطناعي في المكان الصحيح.",
    features: ["تحليل وبناء MVP", "لوحة تحكم وتدفقات مستخدم", "تجهيز للتوسع والاشتراكات"],
  },
];

const reasons = [
  {
    number: "01",
    title: "سرعة تنفيذ محسوبة",
    text: "نحوّل الغموض إلى خطوات واضحة، ونبني النسخة التي يمكن عرضها وبيعها مبكرًا.",
    icon: "bolt" as const,
  },
  {
    number: "02",
    title: "الذكاء الاصطناعي كميزة",
    text: "نستخدم AI لتقليل الوقت وزيادة القيمة، لا كزخرفة تُضاف إلى المنتج في آخر لحظة.",
    icon: "spark" as const,
  },
  {
    number: "03",
    title: "عربي أولًا",
    text: "من اتجاه الصفحة إلى نبرة المحتوى؛ نبني تجربة يفهمها المستخدم العربي ويثق بها.",
    icon: "globe" as const,
  },
];

type IconName =
  | "arrow"
  | "brain"
  | "briefcase"
  | "bolt"
  | "check"
  | "chevron"
  | "globe"
  | "link"
  | "menu"
  | "orbit"
  | "spark"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 19 19 5" />
        <path d="M8 5h11v11" />
      </svg>
    );
  }

  if (name === "brain") {
    return (
      <svg {...common}>
        <path d="M9.5 4.4A3.1 3.1 0 0 0 4.8 7a3 3 0 0 0 .2 1.1A3.7 3.7 0 0 0 5.7 15a3.1 3.1 0 0 0 4.5 4.5" />
        <path d="M14.5 4.4A3.1 3.1 0 0 1 19.2 7a3 3 0 0 1-.2 1.1 3.7 3.7 0 0 1-.7 6.9 3.1 3.1 0 0 1-4.5 4.5" />
        <path d="M12 4v16M8.2 8.2c1.6.2 2.3 1.1 2.3 2.4M15.8 8.2c-1.6.2-2.3 1.1-2.3 2.4M8.4 14.4c1.4-.2 2.2.4 2.5 1.5M15.6 14.4c-1.4-.2-2.2.4-2.5 1.5" />
      </svg>
    );
  }

  if (name === "briefcase") {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2.5" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18M10 12v1.5h4V12" />
      </svg>
    );
  }

  if (name === "bolt") {
    return (
      <svg {...common}>
        <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common}>
        <path d="m5 12 4.5 4.5L19 7" />
      </svg>
    );
  }

  if (name === "chevron") {
    return (
      <svg {...common}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  }

  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.7" />
        <path d="M3.7 12h16.6M12 3.3c2.2 2.4 3.3 5.3 3.3 8.7s-1.1 6.3-3.3 8.7c-2.2-2.4-3.3-5.3-3.3-8.7S9.8 5.7 12 3.3Z" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg {...common}>
        <path d="M10 13.8a4 4 0 0 0 5.7.1l2.7-2.7a4 4 0 0 0-5.7-5.7l-1.5 1.5" />
        <path d="M14 10.2a4 4 0 0 0-5.7-.1l-2.7 2.7a4 4 0 0 0 5.7 5.7l1.5-1.5" />
      </svg>
    );
  }

  if (name === "menu") {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  }

  if (name === "orbit") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="2.2" />
        <ellipse cx="12" cy="12" rx="9" ry="4.4" transform="rotate(-26 12 12)" />
        <path d="M18.6 6.5 20 5.1" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading-grid">
      <Reveal>
        <p className="eyebrow"><span />{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="section-description">{description}</p>
      </Reveal>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const heroY = useTransform(progress, [0, 0.35], [0, reduceMotion ? 0 : 74]);

  return (
    <main className="site-shell">
      <motion.div className="top-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <div className="nav-shell container-site">
          <a className="brand" href="#top" aria-label="العودة إلى بداية الصفحة">
            <Image className="brand-mark brand-mark-image" src="/brand-identity-mohammed-labs.png" alt="" width={34} height={34} priority />
            <span className="brand-copy">
              <strong>MOHAMMED LABS</strong>
              <small>PRODUCT STUDIO</small>
            </span>
          </a>

          <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="التنقل الرئيسي">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
          </nav>

          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            <span>ابدأ محادثة</span>
            <Icon name="arrow" size={16} />
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={20} />
          </button>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-orb hero-orb-gold" />
        <div className="hero-orb hero-orb-violet" />
        <div className="hero-grid-lines" />
        <div className="container-site hero-layout">
          <Reveal className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="live-dot" />MOHAMMED LABS · PRODUCT STUDIO</div>
            <h1 className="hero-title">
              الفكرة الجيدة
              <span>تستحق نظامًا</span>
              <em>يعمل بذكاء.</em>
            </h1>
            <p className="hero-description">
              أساعد أصحاب الأعمال على تحويل الأفكار إلى منصات SaaS وتجارب رقمية عربية، سريعة، ومصممة لتصنع قيمة حقيقية.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                <span>تحدث معي عن فكرتك</span>
                <Icon name="arrow" size={18} />
              </a>
              <a className="text-link" href="#work">
                <span>شاهد الأعمال</span>
                <Icon name="chevron" size={17} />
              </a>
            </div>
            <div className="hero-note"><span className="note-line" /> متاح لمشاريع مختارة حاليًا</div>
          </Reveal>

          <motion.div className="hero-visual-wrap" style={{ y: heroY }}>
            <div className="hero-visual-glow" />
            <div className="hero-visual" aria-label="نموذج مرئي لمنتج رقمي">
              <div className="visual-topbar">
                <div className="window-dots"><i /><i /><i /></div>
                <span className="visual-status"><b /> LIVE BUILD</span>
              </div>
              <div className="visual-content">
                <div className="visual-identity">
                  <Image src="/brand-identity-mohammed-labs.png" alt="" width={42} height={42} />
                  <div>
                    <strong>MOHAMMED LABS</strong>
                    <span>AI PRODUCT STUDIO</span>
                  </div>
                </div>
                <div className="visual-label">مساحة العمل / 01</div>
                <div className="visual-heading">ذكاء في المكان الصحيح</div>
                <p>نبني لك النظام الذي يختصر الوقت، ويرفع قيمة كل تواصل مع عميلك.</p>
                <div className="visual-metrics">
                  <div><span>وضوح</span><strong>96%</strong><i className="metric-bar"><b style={{ width: "96%" }} /></i></div>
                  <div><span>سرعة</span><strong>4.8x</strong><i className="metric-bar"><b style={{ width: "76%" }} /></i></div>
                </div>
                <div className="visual-footer">
                  <Image className="mini-avatar" src="/brand-identity-mohammed-labs.png" alt="" width={21} height={21} />
                  <span>من الفكرة إلى نسخة قابلة للبيع</span>
                  <Icon name="arrow" size={17} />
                </div>
              </div>
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="visual-cross cross-one">+</div>
              <div className="visual-cross cross-two">+</div>
            </div>
          </motion.div>
        </div>
        <div className="hero-scroll-hint"><span /> مرر لاكتشاف المزيد</div>
      </section>

      <div className="container-site">
        <Reveal className="signal-strip">
          <div><strong>05</strong><span>منتجات وأفكار قيد البناء</span></div>
          <div><strong>AI</strong><span>ذكاء اصطناعي يضيف قيمة</span></div>
          <div><strong>AR</strong><span>تجربة عربية من البداية</span></div>
          <div className="signal-arrow"><Icon name="arrow" size={20} /></div>
        </Reveal>
      </div>

      <section id="about" className="section-space about-section">
        <div className="container-site">
          <SectionHeading
            eyebrow="من نحن"
            title="نصنع الطبقة الرقمية التي تجعل عملك يبدو أكبر، ويعمل أذكى."
            description="لسنا مجرد منفذين لواجهة. نعمل معك على الفكرة، التدفق، الرسالة، والتقنية حتى تصل إلى منتج مفهوم وجاهز للخطوة التالية."
          />
          <div className="about-grid">
            <Reveal className="about-statement">
              <span className="quote-mark">“</span>
              <p>المنتج الجيد لا يشرح نفسه كثيرًا؛ يجعل الخطوة التالية واضحة.</p>
              <div className="signature"><span className="signature-line" /><span>محمد الزهراني</span></div>
            </Reveal>
            <Reveal className="about-copy" delay={0.1}>
              <p>نبني منصات وأدوات SaaS مدعومة بالذكاء الاصطناعي باللغة العربية، من صفحات التعريف التي تبيع، إلى الأنظمة التي تدير العمل خلف الكواليس.</p>
              <div className="about-points">
                <div><span>أفهم الفكرة</span><small>نرتبها قبل أن نبرمجها.</small></div>
                <div><span>أبني النسخة</span><small>نطلق بسرعة ونقيس بواقعية.</small></div>
                <div><span>أطوّر النظام</span><small>نترك مساحة للنمو من اليوم الأول.</small></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="work" className="section-space work-section">
        <div className="container-site">
          <SectionHeading
            eyebrow="أعمالنا ومنتجاتنا"
            title="أفكار مختلفة. نفس المبدأ: تجربة تُفهم بسرعة وتترك أثرًا."
            description="هذه مجموعة من المنتجات والمفاهيم التي عملنا عليها أو نبنيها؛ كل واحد منها يبدأ من مشكلة حقيقية وينتهي بتجربة أبسط."
          />
          <div className="projects-grid">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.06} className={`project-card accent-${project.accent}`}>
                <motion.article whileHover={reduceMotion ? undefined : { y: -7 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                  <div className="card-topline"><span>0{index + 1}</span><span>{project.type}</span></div>
                  <div className="project-icon"><Icon name={project.icon} size={23} /></div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="card-link"><span>استكشف الفكرة</span><Icon name="arrow" size={16} /></div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section-space services-section">
        <div className="container-site">
          <SectionHeading
            eyebrow="الخدمات والأسعار"
            title="اختر نقطة البداية. ونبني معك ما بعدها."
            description="الأسعار أدناه نقطة بداية قابلة للتعديل حسب حجم المحتوى، عدد التدفقات، والتكاملات المطلوبة."
          />
          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.08} className={`service-card ${service.featured ? "featured" : ""}`}>
                {service.featured && <div className="popular-badge">الأكثر طلبًا</div>}
                <div className="service-eyebrow">{service.eyebrow}</div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
                <div className="service-divider" />
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}><span><Icon name="check" size={14} /></span>{feature}</li>
                  ))}
                </ul>
                <a className="service-link" href={whatsappUrl} target="_blank" rel="noreferrer">اسأل عن التفاصيل <Icon name="arrow" size={16} /></a>
              </Reveal>
            ))}
          </div>
          <Reveal className="pricing-note">
            <span className="pricing-note-icon"><Icon name="spark" size={18} /></span>
            <p>هل لديك مشروع مختلف؟ أرسل الفكرة كما هي، وسأحوّلها إلى نطاق واضح وتقدير صريح قبل البدء.</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">أرسل فكرتك</a>
          </Reveal>
        </div>
      </section>

      <section className="section-space reasons-section">
        <div className="container-site">
          <SectionHeading
            eyebrow="ليش نحن"
            title="نوازن بين السرعة، الذكاء، والذوق."
            description="لأن المشروع لا يحتاج تقنية أكثر؛ يحتاج قرارات أفضل، وتفاصيل تجعل المستخدم يشعر أن كل شيء في مكانه."
          />
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <Reveal key={reason.number} delay={index * 0.08} className="reason-card">
                <div className="reason-number">{reason.number}</div>
                <div className="reason-icon"><Icon name={reason.icon} size={22} /></div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container-site">
          <Reveal className="contact-panel">
            <div className="contact-grid-lines" />
            <div className="contact-orb" />
            <div className="contact-copy">
              <p className="eyebrow"><span />هل نبدأ؟</p>
              <h2>خلّ فكرتك أول منتج نشتغل عليه معًا.</h2>
              <p>أرسل لي نبذة قصيرة عن المشروع، وسأرد عليك بتصور مبدئي واضح والخطوة المناسبة للبدء.</p>
            </div>
            <div className="contact-actions">
              <a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">
                <span>راسلني على واتساب</span>
                <Icon name="arrow" size={18} />
              </a>
              <a className="contact-site-link" href="https://linkarabs.com" target="_blank" rel="noreferrer">linkarabs.com <Icon name="arrow" size={14} /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer container-site">
        <div className="footer-brand"><Image className="brand-mark small brand-mark-image" src="/brand-identity-mohammed-labs.png" alt="" width={27} height={27} /><span>MOHAMMED LABS / PRODUCT STUDIO</span></div>
        <p>منتجات رقمية عربية، مصممة لتكبر.</p>
        <a href="#top" aria-label="العودة إلى أعلى الصفحة"><Icon name="arrow" size={16} /></a>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="تواصل معي عبر واتساب">
        <span className="whatsapp-pulse" />
        <span>واتساب</span>
        <Icon name="arrow" size={16} />
      </a>
    </main>
  );
}
