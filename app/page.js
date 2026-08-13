"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";

const fallbackBrand = {
  lightLogo: "/DigiNext-02.png",
  darkLogo: "/DigiNext-01.png",
  supportEmail: "info@diginext.example",
  supportPhone: "+91 98765 43210"
};

const defaultTechnologyRows = [
  [
    { name: "Google Ads", image: "/google-ads.png" },
    { name: "Google Search Console", image: "/google-search-console.png" },
    { name: "Canva", image: "/canva.png" },
    { name: "Gamma", image: "/gamma.png" },
    { name: "ChatGPT", image: "/chatgpt.png" },
    { name: "Claude", image: "/claude.png" },
    { name: "Mid Journey", image: "/mid-journey.png" },
    { name: "Higxfield", image: "/higxfield.png" },
    { name: "Google Keywords Planner", image: "/google-keywords-planner.png" }
  ],
  [
    { name: "Meta Ads", image: "/meta-ads.png" },
    { name: "Meta Business Suite", image: "/meta-business-suite.png" },
    { name: "Instagram", image: "/instagram.png" },
    { name: "Facebook", image: "/facebook.png" },
    { name: "WhatsApp Business", image: "/whatsapp-business.png" },
    { name: "Google My Business", image: "/google-my-business.png" },
    { name: "Google Sheets", image: "/google-sheets.png" },
    { name: "Notion", image: "/notion.png" }
  ]
];

const courseTechnologyRows = {
  "ai-powered-digital-marketing-course": [
    [
      { name: "Google Ads", image: "/google-ads.png" },
      { name: "Google Search Console", image: "/google-search-console.png" },
      { name: "Canva", image: "/canva.png" },
      { name: "Gamma", image: "/gamma.png" },
      { name: "ChatGPT", image: "/chatgpt.png" },
      { name: "Claude", image: "/claude.png" },
      { name: "Mid Journey", image: "/mid-journey.png" },
      { name: "Higxfield", image: "/higxfield.png" },
      { name: "Google Keywords Planner", image: "/google-keywords-planner.png" }
    ],
    [
      { name: "Meta Ads", image: "/meta-ads.png" },
      { name: "Meta Business Suite", image: "/meta-business-suite.png" },
      { name: "Instagram", image: "/instagram.png" },
      { name: "Facebook", image: "/facebook.png" },
      { name: "WhatsApp Business", image: "/whatsapp-business.png" },
      { name: "Google My Business", image: "/google-my-business.png" },
      { name: "Google Sheets", image: "/google-sheets.png" },
      { name: "Notion", image: "/notion.png" }
    ]
  ]
};

const courseContent = [
  {
    slug: "ai-powered-digital-marketing-course",
    title: "AI-Powered Digital Marketing Course",
    shortDescription: "Built by Marketers, Taught Inside an Agency.",
    durationText: "12 Weeks",
    deliveryMode: "Offline in Mumbai",
    heroHighlights: [
      "Train Inside a Real Marketing Agency",
      "12 Weeks of Hands-On Learning",
      "Build a real portfolio with client projects.",
      "Real Case Studies, Real Brands"
    ],
    aboutTitle: "About DigiNext",
    aboutHeading: "Train where marketing work actually happens",
    aboutBody:
      "At DigiNext, we're redefining digital education by training learners where the real action happens, inside a live marketing and tech agency. Our mission is to bridge the gap between theoretical knowledge and real-world execution by offering hands-on, AI-integrated Digital Marketing training in Thane, Mumbai.",
    reasons: [
      "Agency-led training with real briefs and execution cycles",
      "Hands-on work across strategy, creative production, and performance",
      "Portfolio-ready outcomes with mentor feedback"
    ],
    points: [
      "Strategy Decks",
      "Industry-Grade Case Studies",
      "Build Customer Avatars",
      "Content Pegs"
    ],
    agencyTitle: "Work Like a Real Social Media Agency",
    agencyBody:
      "Get trained in the exact workflows used by top marketing teams from campaign planning to publishing and performance optimization. Each week, you'll collaborate with real brand briefs and cross-functional teammates across copy, design, and performance marketing.",
    agencyBullets: [
      ["Campaign Planning", "Build like strategists, not students."],
      ["Research, Production & Publishing", "Execute like a creative team."],
      ["Analytics & Iteration", "Think like a growth marketer."]
    ],
    agencyStats: {
      Roles: "Strategy, Content, Design, Performance",
      Tools: "AI tools, publishing, reports",
      "Work Type": "Campaigns, content, analysis",
      Outcome: "Marketing portfolio with real brand work"
    },
    learningItems: [
      "Solve Real Brand Problems: Work on active client briefs, live brand challenges, and actual industry problems.",
      "Build a Portfolio That Gets You Hired: Finish with 2 production-grade projects from campaigns to strategy decks.",
      "Learn by Doing, With Expert Mentors: Create content in teams with expert feedback loops and suggestions.",
      "Master Agency Workflows: Experience sprints, approvals, and delivery cycles like an actual agency."
    ],
    faqs: [
      ["What makes DigiNext the best digital marketing course in Thane, Mumbai?", "DigiNext offers hands-on, agency-led training where students work on real client campaigns, use AI tools, and collaborate inside a live marketing setup."],
      ["Is DigiNext's digital marketing course suitable for beginners?", "Yes. The course is designed for beginners, students, career switchers, and business owners. No prior experience is required."],
      ["How long is the digital marketing course in Thane?", "The course runs for 12 weeks with offline live sessions held at our agency in Mumbai."],
      ["What topics are covered in the DigiNext course?", "You’ll learn social media strategy, performance marketing, SEO basics, content creation, campaign planning, AI tools, and analytics."],
      ["What kind of projects will I work on?", "You’ll work on 2 real brand campaigns covering content calendars, ad strategy, report analysis, and performance breakdowns."],
      ["Will I receive placement support after the course?", "Yes. We offer 1 year of placement support with mock interviews, resume help, portfolio review, and referrals."]
    ]
  },
  {
    slug: "data-science-machine-learning-course",
    title: "Data Science & Machine Learning Course",
    shortDescription: "Built by Analysts, Taught Inside a Working Tech Team",
    durationText: "10 Weeks",
    deliveryMode: "Offline in Mumbai",
    heroHighlights: [
      "Train Inside a Real Product & Data Team",
      "10 Weeks of Hands-On, Project-Based Learning",
      "Build a Real Portfolio with Predictive Models & Dashboards",
      "Real Case Studies from Startups, Apps & Live Data Pipelines"
    ],
    aboutTitle: "About DigiNext",
    aboutHeading: "Work through real business data problems",
    aboutBody:
      "At DigiNext, we're bridging the gap between textbook analytics and real-world business intelligence. Our 10-week offline course in Mumbai trains learners inside a functioning tech company setup, solving real data problems using Python, Pandas, SQL, and AI.",
    reasons: [
      "Learn inside a practical team workflow instead of a theory-first classroom",
      "Build models, dashboards, and reporting deliverables for a real portfolio",
      "Mentor reviews across business and technical problem-solving"
    ],
    points: [
      "Data Strategy & Collection",
      "Data Cleaning & Modelling",
      "Analysis & Insight Reporting",
      "AI-powered automation projects"
    ],
    agencyTitle: "Work Like a Real Data Analyst",
    agencyBody:
      "Learn how real analysts work with data from collection and cleaning, to visualization and machine learning. You'll collaborate across business and tech teams to solve real use-cases every week.",
    agencyBullets: [
      ["Data Strategy & Collection", "Frame problems, write data briefs, and extract structured and unstructured data."],
      ["Data Cleaning & Modelling", "Perform EDA, prepare datasets, and build models using Scikit-learn and TensorFlow."],
      ["Analysis & Insight Reporting", "Build dashboards and present insights to stakeholders."]
    ],
    agencyStats: {
      Roles: "Analyst, BI, ML, Data Ops",
      Tools: "Python, SQL, Pandas, BI",
      "Work Type": "EDA, modelling, dashboards",
      Outcome: "Job-ready data portfolio"
    },
    learningItems: [
      "Solve Real Business Data Problems using actual client or internal datasets.",
      "Build a Job-Ready Portfolio with 2 ML case studies, 1 dashboard, and 1 AI automation project.",
      "Learn by Doing, With Expert Mentors through code reviews and feedback from analysts and data engineers.",
      "Workflows from Real Tech Teams including notebooks, Git repos, and presentation sprints."
    ],
    faqs: [
      ["What makes DigiNext the best Data Science course?", "You don’t just learn data science, you work like a data scientist with real projects, live data, and tool training."],
      ["Is this course suitable for beginners?", "Yes. Python, SQL, ML concepts, and AI foundations are taught step by step."],
      ["What tools will I learn?", "Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, PowerBI/Tableau, and Git."],
      ["What kind of projects will I work on?", "You’ll work on ML models like customer segmentation, demand prediction, and dashboard reporting using real data."],
      ["Do I get placement support?", "Yes. We offer 1 year of placement support with job referrals, mock interviews, resume help, and coaching."],
      ["Is this course online or offline?", "Offline, fully classroom-based in Mumbai."]
    ]
  },
  {
    slug: "devops-with-aws-azure",
    title: "DevOps with AWS & Azure",
    shortDescription: "Real Infrastructure. Real Deployments. Real Results.",
    durationText: "10 Weeks",
    deliveryMode: "Offline in Mumbai",
    heroHighlights: [
      "Train Inside a Real Deployment & DevOps Workflow",
      "10 Weeks of Hands-On, Cloud-Native Learning",
      "Build Real Pipelines, Containerized Apps, CI/CD Projects",
      "Real Case Studies from Live Servers, Production Systems"
    ],
    aboutTitle: "About DigiNext",
    aboutHeading: "Train inside a practical DevOps environment",
    aboutBody:
      "This is not a simulator course. At DigiNext, you'll train inside a real DevOps environment configuring, deploying and monitoring production-grade apps. Learn on AWS, Azure, Docker, GitHub Actions, and Kubernetes basics.",
    reasons: [
      "Real deployment setup instead of a demo-only lab",
      "Cloud, CI/CD, monitoring, and team process coverage",
      "Portfolio projects built around deployment and reliability outcomes"
    ],
    points: [
      "Cloud Architecture Setup",
      "CI/CD & Automation",
      "Logs, Monitoring & Optimization",
      "Real-Time Alerts & Team Processes"
    ],
    agencyTitle: "Work Like a Real DevOps Engineer",
    agencyBody:
      "From setting up cloud infra to running deployment pipelines and monitoring servers, you'll follow how DevOps teams actually work.",
    agencyBullets: [
      ["Cloud Architecture Setup", "Build servers, security groups, DNS configs and deployment-ready infrastructure."],
      ["CI/CD & Automation", "Learn Jenkins, GitHub Actions, Docker, and container deployment best practices."],
      ["Logs, Monitoring & Optimization", "Use Prometheus, Grafana, and logging tools to track and optimize deployments."]
    ],
    agencyStats: {
      Roles: "DevOps, Infra, SRE, Security",
      Tools: "AWS, Azure, Docker, CI/CD",
      "Work Type": "Pipelines, infra, monitoring",
      Outcome: "Cloud deployment portfolio"
    },
    learningItems: [
      "Work on Real Deployment Projects by shipping web apps, APIs, and containerized systems end to end.",
      "Build 4+ Portfolio Projects covering infra setup, version control, testing pipelines, and monitoring.",
      "Mentorship by DevOps Engineers managing live infrastructure.",
      "Real-Time Alerts, Logs, Team Processes with release cycles, rollback strategies, and maintenance practices."
    ],
    faqs: [
      ["What makes this the best DevOps course?", "You learn inside a live deployment setup, not a simulation."],
      ["What tools will I learn?", "AWS EC2, S3, Route53, Azure DevOps, Docker, Git, GitHub Actions, Jenkins, Prometheus, and more."],
      ["Do I need prior coding experience?", "Basic Linux and Git knowledge helps, but all fundamentals are covered."],
      ["Do I need my own AWS/Azure account?", "Yes. We guide you to create and use student-level cloud accounts with usage limits."],
      ["Will I learn Kubernetes too?", "You’ll learn the fundamentals and practice orchestration basics."],
      ["Is this course online or offline?", "100% offline classroom sessions in Mumbai."]
    ]
  },
  {
    slug: "web-full-stack-development",
    title: "Web Full Stack Development",
    shortDescription: "Frontend. Backend. Deploy. All-in-One Bootcamp.",
    durationText: "10 Weeks",
    deliveryMode: "Offline in Mumbai",
    heroHighlights: [
      "Train Inside a Live Tech Agency with Real Client Briefs",
      "10 Weeks of End-to-End Web App Development",
      "Build Production-Grade Web Apps & Admin Dashboards",
      "Real Frontend + Backend Projects with Deployment"
    ],
    aboutTitle: "About DigiNext",
    aboutHeading: "Ship websites and apps like a real dev team",
    aboutBody:
      "Our Full Stack Development course teaches you everything from HTML to Hosting, using real-world workflows. You’ll work on client-facing websites, admin panels, and interactive applications with mentorship from developers inside a working tech agency.",
    reasons: [
      "Frontend and backend learning tied to real briefs",
      "Git, testing, review, and deployment built into the workflow",
      "Portfolio outputs designed for hiring conversations"
    ],
    points: [
      "Frontend Development",
      "Backend & Databases",
      "Testing & Deployment",
      "Work in Real Dev Sprints"
    ],
    agencyTitle: "Work Like a Real Web Developer",
    agencyBody:
      "Build & deploy fully functional, responsive websites using JavaScript frameworks, backend APIs, and databases with Git, hosting, testing and review cycles.",
    agencyBullets: [
      ["Frontend Development", "HTML5, CSS3, Tailwind, JavaScript, React, Next.js."],
      ["Backend & Databases", "Node.js, Express, MongoDB, Firebase, REST APIs and CRUD workflows."],
      ["Testing & Deployment", "Deploy to Vercel/AWS, use Git version control, and debug in dev environments."]
    ],
    agencyStats: {
      Roles: "Frontend, Backend, QA, Lead",
      Tools: "React, Node, DB, Git",
      "Work Type": "Apps, APIs, dashboards",
      Outcome: "Production-grade web portfolio"
    },
    learningItems: [
      "Solve Real Web Problems by building actual products used by clients.",
      "Build & Host 3+ Live Projects including a portfolio site and CRUD dashboard.",
      "Work in Real Dev Sprints with pull requests, testing, code reviews, and mobile optimization.",
      "Mentorship by Full Stack Developers with weekly feedback and best practices."
    ],
    faqs: [
      ["Is this the best full-stack course?", "The course is practical because you don’t just build, you ship, review, and deploy like a real dev team."],
      ["Do I need to know coding before joining?", "Not necessarily. We start with the basics of HTML, CSS, and JavaScript."],
      ["What tech stack do you cover?", "React, Next.js, Tailwind, Node.js, Express, MongoDB, Git, Firebase and Vercel."],
      ["Is this course offline?", "Yes. It's an offline, project-based course in Mumbai."],
      ["Do I get a certificate & job help?", "Yes. DigiNext Certificate plus 1-year placement support including referrals and interviews."],
      ["How do I enroll?", "Use Enquire Now or Download Curriculum on the website to get started."]
    ]
  }
];

const defaultCurriculum = {
  title: "12 Weeks to Kickstart Your Digital Marketing Journey",
  subtitle: "(Yes 12 weeks is all it will take)",
  description:
    "Step inside Digilligent and learn how a modern marketing agency operates. From client meetings and campaign planning to content production and performance marketing, you'll gain firsthand exposure to the people, processes, and projects that drive real business growth.",
  weeks: [
    {
      weekNumber: 1,
      tag: "ORIENTATION & FOUNDATIONS OF DIGITAL MARKETING",
      episodes: [
        {
          episodeNumber: 1,
          title: "The Digital Playfield",
          thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Importance of Social Media & Digital Marketing",
            "The Shift from Advertising to Storytelling",
            "Soft Skills for Digital Marketer",
            "Latest Trending Content Overview (Reels/Trends)",
            "The Marketing Funnel Model (TOFU, MOFU, BOFU)"
          ]
        },
        {
          episodeNumber: 2,
          title: "Agency Operations & Brief Breakdown",
          thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Deconstructing Client Briefs",
            "Cross-Functional Team Collaboration",
            "Content Strategy Frameworks",
            "Sprint Planning & Project Deadlines"
          ]
        }
      ]
    },
    {
      weekNumber: 2,
      tag: "BRAND STRATEGY & CUSTOMER AVATARS",
      episodes: [
        {
          episodeNumber: 1,
          title: "Customer Avatars & Positioning",
          thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Building Ideal Customer Profiles (ICPs)",
            "Competitor Benchmarking & Intelligence",
            "Value Proposition & Brand Positioning",
            "Brand Tone of Voice Guidelines"
          ]
        }
      ]
    },
    {
      weekNumber: 3,
      tag: "CONTENT CREATION & COPYWRITING",
      episodes: [
        {
          episodeNumber: 1,
          title: "High-Converting Copy & Creative Briefs",
          thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Hook, Line & Sinker Copywriting Sprints",
            "Scripting Short-Form Video (Reels/Shorts)",
            "Visual Storytelling & Creative Briefs",
            "AI Copywriting Tools Integration"
          ]
        }
      ]
    },
    {
      weekNumber: 4,
      tag: "META ADS & PERFORMANCE MARKETING",
      episodes: [
        {
          episodeNumber: 1,
          title: "Meta Ads Manager & Campaign Architecture",
          thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Meta Pixel & Conversion API Setup",
            "Audience Targeting & Retargeting Funnels",
            "A/B Testing Creatives & Ad Copies",
            "Budget Optimization & ROAS Tracking"
          ]
        }
      ]
    },
    {
      weekNumber: 5,
      tag: "GOOGLE ADS & SEARCH ENGINE MARKETING",
      episodes: [
        {
          episodeNumber: 1,
          title: "Search, Display & YouTube Ad Campaigns",
          thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Keyword Intent & Match Types",
            "Quality Score & Bidding Strategies",
            "YouTube In-Stream Video Campaigns",
            "Google Analytics 4 (GA4) Custom Events"
          ]
        }
      ]
    },
    {
      weekNumber: 6,
      tag: "SEO & ORGANIC GROWTH PLAYBOOKS",
      episodes: [
        {
          episodeNumber: 1,
          title: "Technical SEO & Organic Scaling",
          thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "On-Page SEO & Content Audits",
            "Technical SEO & Page Speed Optimization",
            "Local SEO & Google Business Profile",
            "Organic Growth & Backlink Building"
          ]
        }
      ]
    }
  ]
};

async function fetchJson(path, init) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, init);
    if (!response.ok) {
      throw new Error("Request failed");
    }

    const payload = await response.json();
    return payload.data;
  } catch {
    return null;
  }
}

function mapSettingsByKey(settings) {
  if (!Array.isArray(settings)) {
    return {};
  }

  return settings.reduce((accumulator, setting) => {
    accumulator[setting.key] = setting.valueJson;
    return accumulator;
  }, {});
}

function toSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildCourseRecord(courseRow) {
  const contentMatch =
    courseContent.find((item) => item.slug === courseRow.slug) ||
    courseContent.find((item) => toSlug(item.title) === toSlug(courseRow.title));

  const courseFaqs =
    Array.isArray(courseRow.faqs) && courseRow.faqs.length > 0
      ? courseRow.faqs.map((faq) => [faq.question, faq.answer])
      : contentMatch?.faqs;

  return {
    ...(contentMatch || {
      aboutTitle: "About DigiNext",
      aboutHeading: courseRow.title,
      aboutBody: courseRow.shortDescription || "Learn inside DigiNext's Mumbai-based hands-on training environment.",
      reasons: [
        "Hands-on, project-led learning",
        "Industry-style mentorship and reviews",
        "Portfolio-focused outcomes"
      ],
      points: [
        courseRow.durationText || "Hands-on learning",
        courseRow.deliveryMode || "Offline in Mumbai",
        "Project-based work",
        "Mentor guidance"
      ],
      agencyTitle: "Work Like a Real Team",
      agencyBody: courseRow.shortDescription || "Learn through practical workflows and execution.",
      agencyBullets: [
        ["Learn", "Follow guided practical workflows."],
        ["Build", "Work on projects and execution tasks."],
        ["Launch", "Create portfolio-ready outcomes."]
      ],
      agencyStats: {
        Roles: "Learner + Mentor",
        Tools: "Industry workflows",
        "Work Type": "Practical execution",
        Outcome: "Portfolio-ready output"
      },
      learningItems: [
        "Work on practical assignments and guided execution tasks.",
        "Build portfolio material tied to real workflow patterns.",
        "Learn by doing with mentor support and feedback.",
        "Train inside an offline, execution-led environment in Mumbai."
      ],
      heroHighlights: [
        courseRow.durationText || "Hands-on training",
        courseRow.deliveryMode || "Offline in Mumbai",
        "Project-based learning",
        "Portfolio-focused outcomes"
      ],
      faqs: [
        ["How do I enroll?", "Use Enquire Now or Download Curriculum on the website to get started."],
        ["Is this course offline?", "Yes. The course is offered from Mumbai."],
        ["Will I work on projects?", "Yes. DigiNext uses hands-on, project-led learning."],
        ["Will I receive guidance?", "Yes. Training includes expert support and mentor feedback."]
      ]
    }),
    id: String(courseRow.id),
    cityId: courseRow.city?.id ? String(courseRow.city.id) : "",
    slug: courseRow.slug || toSlug(courseRow.title),
    title: courseRow.title,
    shortDescription: courseRow.shortDescription || contentMatch?.shortDescription || "",
    durationText: courseRow.durationText || contentMatch?.durationText || "",
    deliveryMode: courseRow.deliveryMode || contentMatch?.deliveryMode || "",
    brochureUrl: courseRow.brochureUrl || "",
    faqs: courseFaqs || []
  };
}

function normalizeTeachers(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((teacher) => ({
    id: String(teacher.id),
    name: teacher.name,
    photoUrl: teacher.photoUrl || "",
    linkedinUrl: teacher.linkedinUrl || "",
    employmentStatus: teacher.employmentStatus || "",
    credentials: teacher.credentials || ""
  }));
}

function normalizeCertificates(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((certificate) => ({
    id: String(certificate.id),
    title: certificate.title,
    imageUrl: certificate.imageUrl,
    sortOrder: Number(certificate.sortOrder || 0)
  }));
}

function Header({ brand, onOpenContact }) {
  const logo = brand.darkLogo || fallbackBrand.darkLogo;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling DOWN -> Hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP -> Reveal header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className="site-header"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out"
      }}
    >
      <div className="shell">
        <div className="header-row">
          <a href="#" className="brand" aria-label="DGNext home">
            <Image src={logo} alt="DigiNext Logo" width={220} height={54} priority className="brand-logo" />
          </a>
          <nav className="desktop-nav">
            <a href="#">Home</a>
            <a href="#about">About</a>
            <a href="#courses">Courses</a>
            <a href="#teachers">Teachers</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="header-actions">
            <button type="button" className="contact-link" onClick={onOpenContact}>
              Contact
            </button>
          </div>
          <div className="mobile-theme-slot">
          </div>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#courses">Courses</a>
          <a href="#teachers">Teachers</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQs</a>
          <button type="button" onClick={onOpenContact}>Contact</button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ course, onOpenModal }) {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Industry-led training</span>
          <h1>{course.title}</h1>
          <p>{course.shortDescription}</p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => onOpenModal("CALLBACK", course.slug)}>
              Enquire Now
            </button>
            <button type="button" className="ghost-button" onClick={() => onOpenModal("BROCHURE", course.slug)}>
              Download Curriculum
            </button>
          </div>
          <div className="hero-points">
            {course.heroHighlights.map((item) => (
              <div key={item} className="hero-point">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-panel enroll-panel">
          <div className="mini-label">Enroll for this course</div>
          <h3>{course.title}</h3>
          <p>
            Speak to an expert about this course, request the brochure, and get the right next step for your
            enrollment.
          </p>
          <div className="enroll-panel-points">
            <div className="agency-bullet">
              <span>1</span>
              <div>
                <strong>Request details</strong>
                <p>Open the form for this exact course.</p>
              </div>
            </div>
            <div className="agency-bullet">
              <span>2</span>
              <div>
                <strong>Talk to an expert</strong>
                <p>Get guidance on fit, duration, and brochure.</p>
              </div>
            </div>
            <div className="agency-bullet">
              <span>3</span>
              <div>
                <strong>Secure your seat</strong>
                <p>Complete the next step for the upcoming batch.</p>
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => onOpenModal("CALLBACK", course.slug)}>
              Enroll for {course.title}
            </button>
            <button type="button" className="ghost-button" onClick={() => onOpenModal("BROCHURE", course.slug)}>
              Get Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : (trimmed.length === 11 ? trimmed : null);
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0` : null;
}

function VideoSection({ videoSettings }) {
  const embedUrl = getYouTubeEmbedUrl(videoSettings?.youtubeUrl);

  return (
    <section className="video-section">
      <div className="shell">
        <div className="video-card">
          <div className="video-container">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="DigiNext Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="video-placeholder">
                <h3>Video Showcase</h3>
                <p>No video URL configured yet. You can update the YouTube video link from the DigiNext Admin Settings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultPackageSettings = {
  title: "What will these 6 Months Cost?",
  packages: [
    {
      id: "founders-plan",
      badge: "Founder's Advantage Plan",
      subtitle: "Best Value - One Time Payment",
      originalPrice: "₹ 82,515*",
      taxNote: "+ 18% GST",
      highlightBannerTitle: "Exclusive Benefits for the Founding Cohort",
      highlightBannerText: "Save more with Founder Scholarship and Upfront Payment Benefits.",
      feeBreakdown: [
        { label: "Professional Certification Program", amount: "₹82,515", isDiscount: false },
        { label: "Founder's Scholarship", amount: "- ₹12,515", isDiscount: true },
        { label: "Upfront Payment Benefit", amount: "- ₹5,000", isDiscount: false }
      ],
      totalEffectiveFee: "₹65,000*",
      totalPayable: "₹65,000*",
      totalPayableNote: "Inclusive of 18% GST",
      ctaText: "APPLY NOW --->"
    },
    {
      id: "flexible-plan",
      badge: "Flexible Learning Plan",
      subtitle: "3-Phase Payment",
      originalPrice: "₹ 82,515*",
      taxNote: "+ 18% GST",
      highlightBannerTitle: "Flexible Payments. Same Learning Experience.",
      highlightBannerText: "Spread your payments across three phases without missing out on the complete DigiNext journey.",
      feeBreakdown: [
        { label: "Professional Certification Program", amount: "₹82,515", isDiscount: false },
        { label: "Founder's Scholarship", amount: "- ₹10,515", isDiscount: true },
        { label: "Upfront Payment Benefit", amount: "- ₹5,000", isDiscount: false },
        { label: "EMI Processing Fees", amount: "- ₹2,000", isDiscount: false }
      ],
      totalEffectiveFee: "₹74,000*",
      totalPayable: "₹74,000*",
      totalPayableNote: "Inclusive of 18% GST",
      ctaText: "APPLY NOW --->"
    }
  ]
};

function PackageCard({ pkg, idx, onOpenModal }) {
  return (
    <div
      className="package-card"
      style={{
        background: "#111116",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(0, 0, 0, 0.45)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box"
      }}
    >
      {/* Top Inner Content Area */}
      <div style={{ padding: "18px 20px 14px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Pill Badge */}
        <div style={{ marginBottom: "8px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              padding: "4px 12px",
              borderRadius: "99px",
              fontSize: "0.78rem",
              fontWeight: "600",
              color: "#ffffff"
            }}
          >
            <span>{idx === 0 ? "🏆" : "💳"}</span>
            <span>{pkg.badge}</span>
          </div>
        </div>

        {/* Subtitle */}
        {pkg.subtitle && (
          <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.55)", marginBottom: "2px" }}>
            {pkg.subtitle}
          </div>
        )}

        {/* Base Price & Tax Note */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "2.1rem", fontWeight: "900", color: "#ffffff", lineHeight: "1.05", letterSpacing: "-0.02em" }}>
            {pkg.originalPrice}
          </div>
          {pkg.taxNote && (
            <div style={{ fontSize: "0.74rem", color: "rgba(255, 255, 255, 0.45)", marginTop: "1px" }}>
              {pkg.taxNote}
            </div>
          )}
        </div>

        {/* Dashed Highlight Banner */}
        {(pkg.highlightBannerTitle || pkg.highlightBannerText) && (
          <div
            style={{
              background: "rgba(248, 156, 28, 0.04)",
              border: "1px dashed rgba(248, 156, 28, 0.35)",
              borderRadius: "8px",
              padding: "10px 12px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "12px"
            }}
          >
            <span style={{ fontSize: "1.2rem", lineHeight: "1" }}>🎓</span>
            <div>
              {pkg.highlightBannerTitle && (
                <div style={{ color: "#f89c1c", fontWeight: "700", fontSize: "0.8rem", marginBottom: "2px" }}>
                  {pkg.highlightBannerTitle}
                </div>
              )}
              {pkg.highlightBannerText && (
                <div style={{ color: "rgba(255, 255, 255, 0.68)", fontSize: "0.72rem", lineHeight: "1.3" }}>
                  {pkg.highlightBannerText}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Thin Line Separator */}
        <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", margin: "0 0 12px 0" }} />

        {/* Fee Breakdown List */}
        <div style={{ marginTop: "auto", marginBottom: "12px" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: "800", letterSpacing: "0.08em", color: "rgba(255, 255, 255, 0.55)", marginBottom: "8px" }}>
            FEE BREAKDOWN
          </div>

          {(pkg.feeBreakdown || []).map((item, fIdx) => (
            <div key={fIdx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", marginBottom: "6px" }}>
              <span style={{ color: item.isDiscount ? "#f89c1c" : "rgba(255, 255, 255, 0.8)", fontWeight: item.isDiscount ? "700" : "400" }}>
                {item.label}
              </span>
              <span style={{ color: item.isDiscount ? "#f89c1c" : "#ffffff", fontWeight: "700" }}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Total Effective Program Fee */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <span style={{ fontSize: "0.92rem", fontWeight: "800", color: "#ffffff" }}>Total Effective Program Fee</span>
          <span style={{ fontSize: "1.18rem", fontWeight: "900", color: "#ffffff" }}>{pkg.totalEffectiveFee}</span>
        </div>
      </div>

      {/* Bottom Dark Total Payable Box & CTA */}
      <div
        style={{
          background: "radial-gradient(circle at center, #0c0c10 0%, #060608 100%)",
          padding: "14px 20px 16px 20px",
          borderTop: "1px dashed rgba(255, 255, 255, 0.15)",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: "0.66rem", fontWeight: "800", color: "rgba(255, 255, 255, 0.55)", letterSpacing: "0.08em", marginBottom: "2px" }}>
          TOTAL PAYABLE
        </div>
        <div style={{ fontSize: "1.9rem", fontWeight: "900", color: "#ffffff", lineHeight: "1" }}>
          {pkg.totalPayable}
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.45)", marginTop: "2px", marginBottom: "12px" }}>
          {pkg.totalPayableNote || "Inclusive of 18% GST"}
        </div>

        <button
          type="button"
          onClick={() => onOpenModal && onOpenModal("CALLBACK")}
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #f89c1c 0%, #fbaf33 100%)",
            color: "#000000",
            border: "none",
            padding: "10px",
            borderRadius: "7px",
            fontWeight: "900",
            fontSize: "0.88rem",
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(248, 156, 28, 0.28)",
            transition: "all 0.2s ease"
          }}
        >
          {pkg.ctaText || "APPLY NOW --->"}
        </button>
      </div>
    </div>
  );
}

function PackagesSection({ packageSettings, onOpenModal }) {
  const data = packageSettings || defaultPackageSettings;
  const packages = Array.isArray(data.packages) && data.packages.length > 0 ? data.packages : defaultPackageSettings.packages;

  const [activePackageIndex, setActivePackageIndex] = useState(0);

  // Swipe gesture support
  const [dragStartX, setDragStartX] = useState(null);

  const handleNextPackage = () => {
    setActivePackageIndex((prev) => Math.min(packages.length - 1, prev + 1));
  };

  const handlePrevPackage = () => {
    setActivePackageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSwipeStart = (clientX) => {
    setDragStartX(clientX);
  };

  const handleSwipeEnd = (clientX) => {
    if (dragStartX === null) return;
    const diff = dragStartX - clientX;
    if (diff > 40) {
      handleNextPackage();
    } else if (diff < -40) {
      handlePrevPackage();
    }
    setDragStartX(null);
  };

  return (
    <section
      id="pricing"
      className="section pricing-section"
      style={{
        padding: "44px 0 56px 0",
        background: "#0a0a0d",
        scrollMarginTop: "88px"
      }}
    >
      <div className="shell" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 12px" }}>
        <div className="section-heading" style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "1.9rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
            {data.title || "What will these 6 Months Cost?"}
          </h2>
          <div className="rule" style={{ margin: "10px auto 0", width: "45px", height: "3px", background: "#f89c1c", borderRadius: "2px" }} />
        </div>

        {/* DESKTOP VIEW: Clean Side-by-Side Grid (Hidden on Mobile) */}
        <div className="desktop-packages-grid">
          {packages.map((pkg, idx) => (
            <PackageCard key={pkg.id || idx} pkg={pkg} idx={idx} onOpenModal={onOpenModal} />
          ))}
        </div>

        {/* MOBILE VIEW: Horizontal Slider with Floating Side Arrow Buttons (Hidden on Desktop) */}
        <div className="mobile-packages-slider">
          <div className="package-card-wrapper">
            {/* Left Arrow Navigation Button */}
            {packages.length > 1 && (
              <button
                type="button"
                className="package-floating-arrow prev"
                onClick={handlePrevPackage}
                disabled={activePackageIndex === 0}
                title="Previous Package"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Slider Viewport */}
            <div className="package-slider-viewport">
              <div
                className="package-slider-track"
                style={{
                  transform: `translateX(-${activePackageIndex * 100}%)`
                }}
              >
                {packages.map((pkg, idx) => (
                  <div
                    key={pkg.id || idx}
                    className="package-slide-item"
                    onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
                    onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX)}
                    onMouseDown={(e) => handleSwipeStart(e.clientX)}
                    onMouseUp={(e) => handleSwipeEnd(e.clientX)}
                  >
                    <PackageCard pkg={pkg} idx={idx} onOpenModal={onOpenModal} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow Navigation Button */}
            {packages.length > 1 && (
              <button
                type="button"
                className="package-floating-arrow next"
                onClick={handleNextPackage}
                disabled={activePackageIndex === packages.length - 1}
                title="Next Package"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ course }) {
  return (
    <section id="about" className="section">
      <div className="shell about-grid">
        <div>
          <div className="section-heading align-left">
            <h2>{course.aboutTitle}</h2>
            <div className="rule" />
          </div>
          <h3>{course.aboutHeading}</h3>
          <p className="body-copy">{course.aboutBody}</p>
        </div>
        <div className="card about-card">
          <h3>Why Choose DigiNext?</h3>
          {course.reasons.map((item, index) => (
            <div key={item} className="numbered-item">
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumSection({ curriculumSettings, onOpenModal }) {
  const curriculum = curriculumSettings || defaultCurriculum;
  const weeks = curriculum.weeks || defaultCurriculum.weeks;

  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [activeEpIndex, setActiveEpIndex] = useState(0);

  const currentWeek = weeks[activeWeekIndex] || weeks[0];
  const episodes = Array.isArray(currentWeek.episodes) && currentWeek.episodes.length > 0 ? currentWeek.episodes : [{ title: "Overview", bullets: [] }];
  const currentEpisode = episodes[activeEpIndex] || episodes[0];

  const allEpisodes = weeks.reduce((acc, week, wIdx) => {
    const eps = Array.isArray(week.episodes) && week.episodes.length > 0 ? week.episodes : [{ title: "Overview", bullets: [] }];
    eps.forEach((ep, epIdx) => {
      acc.push({
        ...ep,
        weekNumber: week.weekNumber,
        tag: week.tag,
        wIdx,
        epIdx,
        globalIdx: acc.length
      });
    });
    return acc;
  }, []);

  const activeGlobalIndex = allEpisodes.findIndex(ep => ep.wIdx === activeWeekIndex && ep.epIdx === activeEpIndex);

  const handleNextEpisode = () => {
    if (activeEpIndex < episodes.length - 1) {
      setActiveEpIndex(activeEpIndex + 1);
    } else if (activeWeekIndex < weeks.length - 1) {
      setActiveWeekIndex(activeWeekIndex + 1);
      setActiveEpIndex(0);
    }
  };

  const handlePrevEpisode = () => {
    if (activeEpIndex > 0) {
      setActiveEpIndex(activeEpIndex - 1);
    } else if (activeWeekIndex > 0) {
      const prevWeekEps = weeks[activeWeekIndex - 1].episodes || [];
      setActiveWeekIndex(activeWeekIndex - 1);
      setActiveEpIndex(Math.max(0, prevWeekEps.length - 1));
    }
  };

  // Swipe support
  const [dragStartX, setDragStartX] = useState(null);
  const handleSwipeStart = (clientX) => {
    setDragStartX(clientX);
  };

  const handleSwipeEnd = (clientX) => {
    if (dragStartX === null) return;
    const diff = dragStartX - clientX;
    if (diff > 40) {
      handleNextEpisode();
    } else if (diff < -40) {
      handlePrevEpisode();
    }
    setDragStartX(null);
  };

  const handlePlayClick = (e) => {
    if (e) e.stopPropagation();
    if (onOpenModal) {
      onOpenModal("CALLBACK");
    }
  };

  // Sliding Window of max 6 visible weeks
  const maxVisibleWeeks = 6;
  let startIdx = Math.max(
    0,
    Math.min(activeWeekIndex - Math.floor(maxVisibleWeeks / 2), weeks.length - maxVisibleWeeks)
  );
  if (startIdx < 0) startIdx = 0;
  const visibleWeeks = weeks.slice(startIdx, startIdx + maxVisibleWeeks);

  return (
    <section id="courses" className="curriculum-section">
      <div className="shell">
        {/* Section Header */}
        <div className="curriculum-header">
          <h2 className="curriculum-title">{curriculum.title || "12 Weeks to Kickstart Your Digital Marketing Journey"}</h2>
          {curriculum.subtitle ? <div className="curriculum-subtitle">{curriculum.subtitle}</div> : null}
          {curriculum.description ? <p className="curriculum-desc">{curriculum.description}</p> : null}
        </div>

        {/* Main Curriculum Card Container with Side Navigation Buttons */}
        <div className="curriculum-card-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", maxWidth: "1020px", margin: "0 auto 32px" }}>
          <button
            type="button"
            className="card-side-arrow-btn"
            onClick={handlePrevEpisode}
            disabled={activeWeekIndex === 0 && activeEpIndex === 0}
            title="Previous Episode/Week"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className="curriculum-slider-viewport"
            style={{ flex: 1, margin: 0, borderRadius: "16px", overflow: "hidden", position: "relative" }}
          >
            <div
              className="curriculum-slider-track"
              style={{
                display: "flex",
                width: "100%",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: `translateX(-${(activeGlobalIndex !== -1 ? activeGlobalIndex : 0) * 100}%)`
              }}
            >
              {allEpisodes.map((ep, idx) => (
                <div
                  key={idx}
                  className="curriculum-card variant-6-card"
                  onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
                  onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX)}
                  onMouseDown={(e) => handleSwipeStart(e.clientX)}
                  onMouseUp={(e) => handleSwipeEnd(e.clientX)}
                  style={{
                    flex: "0 0 100%", margin: 0, cursor: "grab", userSelect: "none",
                    borderRadius: "16px", overflow: "hidden", boxSizing: "border-box",
                    background: "#0d0d12", border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex", flexDirection: "column"
                  }}
                >
                  {/* Top Split Section (Side by side on both mobile & desktop) */}
                  <div className="variant-6-top">
                    {/* Left Info Area */}
                    <div className="variant-6-left">
                      <div className="curriculum-tag" style={{ color: "#f89c1c", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {ep.tag}
                      </div>
                      <div className="rule-line" style={{ width: "24px", height: "2px", background: "#f89c1c" }} />

                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span className="week-label" style={{ color: "#f89c1c", fontWeight: "700", letterSpacing: "0.05em" }}>WEEK</span>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                          <span className="week-num" style={{ color: "#f89c1c", fontWeight: "700", lineHeight: "1" }}>{ep.weekNumber}</span>
                          <div style={{ display: "flex", flexDirection: "column", paddingBottom: "2px" }}>
                            <h3 className="ep-title" style={{ fontWeight: "700", color: "#ffffff", margin: 0 }}>
                              <span style={{ fontWeight: "400", opacity: 0.8, marginRight: "6px" }}>EP:{ep.episodeNumber || ep.epIdx + 1}</span>
                              <br className="hidden md:block" />
                              {ep.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Image Area */}
                    <div
                      className="variant-6-right"
                      onClick={(e) => { e.stopPropagation(); if (onOpenModal) onOpenModal("CALLBACK"); }}
                    >
                      <img
                        src={ep.thumbnail || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"}
                        alt={ep.title}
                      />
                      {/* Gradient to blend image into left side */}
                      <div className="variant-6-gradient" />

                      {/* Variant 6 Play Button Circle */}
                      <div className="variant-6-play-circle">
                        <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff" style={{ marginLeft: "4px" }}>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Box */}
                  <div className="curriculum-info variant-6-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0a0a0f", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div className="topics-grid">
                      {(ep.bullets || []).map((bullet, bIdx) => (
                        <div key={bIdx} className="topic-item">
                          <span className="topic-bullet">•</span>
                          <span className="topic-text">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Netflix Style Play Action Bar */}
                    <div className="netflix-action-bar" style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginTop: "auto", paddingTop: "16px", borderTop: "1px solid var(--border-color, rgba(255,255,255,0.1))" }}>
                      <button
                        type="button"
                        className="netflix-play-btn"
                        onClick={(e) => { e.stopPropagation(); if (onOpenModal) onOpenModal("CALLBACK"); }}
                        style={{
                          background: "#e50914",
                          color: "#ffffff",
                          border: "none",
                          padding: "10px 22px",
                          borderRadius: "6px",
                          fontWeight: "800",
                          fontSize: "0.95rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 4px 14px rgba(229, 9, 20, 0.4)",
                          transition: "transform 0.2s ease, background 0.2s ease"
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Play Episode {ep.episodeNumber || ep.epIdx + 1}</span>
                      </button>

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={(e) => { e.stopPropagation(); if (onOpenModal) onOpenModal("BROCHURE"); }}
                        style={{ padding: "10px 18px", fontSize: "0.9rem", fontWeight: "700", borderRadius: "6px" }}
                      >
                        📄 Get Syllabus & Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="card-side-arrow-btn"
            onClick={handleNextEpisode}
            title="Next Episode/Week"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Week Selector Navigation Bar */}
        <div className="week-nav-container">
          <span className="week-nav-label">Week</span>
          <div className="week-buttons-list">
            {visibleWeeks.map((w) => {
              const actualWeekIdx = weeks.findIndex((item) => item.weekNumber === w.weekNumber);
              const isActiveWeek = actualWeekIdx === activeWeekIndex;

              return (
                <div key={w.weekNumber} className="week-nav-item-wrapper" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    type="button"
                    className={`week-nav-btn ${isActiveWeek ? "active" : ""}`}
                    onClick={() => {
                      setActiveWeekIndex(actualWeekIdx);
                      setActiveEpIndex(0);
                    }}
                  >
                    {w.weekNumber}
                  </button>

                  {/* Interspersed episode indicator dots right beside active week */}
                  {isActiveWeek && episodes.length > 1 && (
                    <div className="week-ep-dots-bridge" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 4px" }}>
                      {episodes.map((ep, epIdx) => (
                        <span
                          key={epIdx}
                          className={`ep-dot ${epIdx === activeEpIndex ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveEpIndex(epIdx);
                          }}
                          title={`Episode ${epIdx + 1}: ${ep.title}`}
                          style={{
                            width: epIdx === activeEpIndex ? "10px" : "7px",
                            height: epIdx === activeEpIndex ? "10px" : "7px",
                            borderRadius: "50%",
                            background: epIdx === activeEpIndex ? "#f89c1c" : "rgba(255, 255, 255, 0.3)",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dashed Line Divider */}
        <div className="curriculum-divider">
          <div className="dashed-line" />
        </div>
      </div>
    </section>
  );
}

function AgencySection({ course }) {
  return (
    <section className="section agency-section">
      <div className="shell">
        <div className="section-heading">
          <h2>{course.agencyTitle}</h2>
          <div className="rule" />
        </div>
        <div className="agency-layout">
          <div className="agency-copy card">
            <div className="mini-label">Practical workflow</div>
            <h3>{course.title}</h3>
            <p>{course.agencyBody}</p>
            <div className="agency-bullets">
              {course.agencyBullets.map(([title, body], index) => (
                <div key={title} className="agency-bullet">
                  <span>{index + 1}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="agency-stats card">
            {Object.entries(course.agencyStats).map(([label, value]) => (
              <div key={label} className="stat-tile">
                <div className="tile-label">{label}</div>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningSection({ items, onOpenModal }) {
  return (
    <section className="section learning-section">
      <div className="shell">
        <div className="section-heading">
          <h2>Build Skills the DigiNext Way</h2>
          <div className="rule" />
        </div>
        <div className="learning-grid">
          {items.map((item, index) => (
            <div key={item} className="numbered-item">
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className="cta-banner">
          <div>
            <h3>Speak to an Expert!</h3>
            <p>Use the same enquiry flow for call backs and brochure downloads.</p>
          </div>
          <button type="button" className="primary-button" onClick={() => onOpenModal("CALLBACK")}>
            Book a Free Career Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

function TechnologiesSection({ course }) {
  const rows = courseTechnologyRows[course.slug] || defaultTechnologyRows;

  return (
    <section className="section technologies-section" id="technologies">
      <div className="shell">
        <div className="section-heading">
          <h2>Tools You Will Use</h2>
          <div className="rule" />
        </div>
        <p className="section-subcopy">A quick view of the tools and platforms used across the {course.title} workflow.</p>
        <div className="tech-stack">
          {rows.map((row, rowIndex) => (
            <div
              key={`${course.slug}-${rowIndex}`}
              className={`tech-row ${rowIndex % 2 === 0 ? "tech-row-left" : "tech-row-right"}`}
            >
              <div className="tech-track">
                {[...row, ...row].map((tool, toolIndex) => (
                  <div key={`${tool.name}-${toolIndex}`} className="tech-pill">
                    <div className="tech-icon">
                      <Image src={tool.image} alt={tool.name} fill sizes="64px" className="tech-icon-image" />
                    </div>
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeachersSection({ teachers }) {
  const teacherList = (Array.isArray(teachers) && teachers.length > 0 && teachers.some(t => t.photoUrl))
    ? teachers.filter(t => t.photoUrl)
    : [
        { id: "1", name: "Mervin Agera", photoUrl: "/teacher-mervin.jpg" },
        { id: "2", name: "Terrence D'Mello", photoUrl: "/teacher-terrence.jpg" }
      ];

  const [activeTeacherIndex, setActiveTeacherIndex] = useState(0);

  const handleNextTeacher = () => {
    setActiveTeacherIndex((prev) => Math.min(teacherList.length - 1, prev + 1));
  };

  const handlePrevTeacher = () => {
    setActiveTeacherIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <section id="teachers" className="section" style={{ padding: "48px 0 56px", background: "#0a0a0d" }}>
      <div className="shell" style={{ maxWidth: "1020px", margin: "0 auto", padding: "0 16px" }}>
        <div className="section-heading" style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>Teachers</h2>
          <div className="rule" style={{ margin: "10px auto 0", width: "45px", height: "3px", background: "#f89c1c", borderRadius: "2px" }} />
        </div>

        {/* DESKTOP VIEW: Side-by-Side Centered Grid with Capped Card Sizes */}
        <div className="desktop-teachers-grid">
          {teacherList.map((teacher, idx) => (
            <div
              key={teacher.id || idx}
              className="teacher-card"
              style={{
                maxWidth: "440px",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "#111116"
              }}
            >
              <img
                src={teacher.photoUrl}
                alt={teacher.name || "Teacher"}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
              />
            </div>
          ))}
        </div>

        {/* MOBILE VIEW: Horizontal Slider with Centered Overlay SVG Arrows */}
        <div className="mobile-teachers-slider">
          <div className="package-card-wrapper" style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
            {teacherList.length > 1 && (
              <button
                type="button"
                className="package-floating-arrow prev"
                onClick={handlePrevTeacher}
                disabled={activeTeacherIndex === 0}
                title="Previous Teacher"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            <div className="package-slider-viewport" style={{ flex: 1, overflow: "hidden", borderRadius: "16px", width: "100%" }}>
              <div
                className="package-slider-track"
                style={{
                  display: "flex",
                  width: "100%",
                  transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                  transform: `translateX(-${activeTeacherIndex * 100}%)`
                }}
              >
                {teacherList.map((teacher, idx) => (
                  <div
                    key={teacher.id || idx}
                    style={{ flex: "0 0 100%", width: "100%", boxSizing: "border-box" }}
                  >
                    <div
                      style={{
                        maxWidth: "480px",
                        margin: "0 auto",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 10px 28px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "#111116"
                      }}
                    >
                      <img
                        src={teacher.photoUrl}
                        alt={teacher.name || "Teacher"}
                        style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {teacherList.length > 1 && (
              <button
                type="button"
                className="package-floating-arrow next"
                onClick={handleNextTeacher}
                disabled={activeTeacherIndex === teacherList.length - 1}
                title="Next Teacher"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ faqSettings, fallbackFaqs, openFaq, setOpenFaq, onOpenModal }) {
  const faqs = (faqSettings && Array.isArray(faqSettings.faqs) && faqSettings.faqs.length > 0)
    ? faqSettings.faqs
    : (fallbackFaqs || []);

  const sectionTitle = faqSettings?.sectionTitle || "Frequently Asked Questions";

  return (
    <section className="section faq-section" id="faq">
      <div className="shell">
        <div className="section-heading">
          <h2>{sectionTitle}</h2>
          <div className="rule" />
        </div>
        <div className="faq-list">
          {faqs.map((faqItem, index) => {
            const question = Array.isArray(faqItem) ? faqItem[0] : faqItem.question;
            const answer = Array.isArray(faqItem) ? faqItem[1] : faqItem.answer;
            return (
              <div key={question || index} className="faq-item">
                <button type="button" className="faq-trigger" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span>{question}</span>
                  <span>{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index ? <p className="faq-answer">{answer}</p> : null}
              </div>
            );
          })}
        </div>
        <div className="callback-card">
          <h3>Still have questions or need more information?</h3>
          <p>Request a callback to get personalized guidance</p>
          <button type="button" className="primary-button inline-button" onClick={() => onOpenModal("CALLBACK")}>
            <Image src="/call.svg" alt="call" width={20} height={20} />
            <span>Request a callback</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function LeadCaptureForm({ courses, initialCourseSlug, initialRequestType, onSubmitLead }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    courseSlug: initialCourseSlug,
    requestType: initialRequestType
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLabel = formState.requestType === "BROCHURE" ? "Get course brochure" : "Request callback";

  const updateField = (field) => (event) => {
    setFormState((current) => ({ ...current, [field]: event.target.value }));
  };

  const updatePhone = (event) => {
    setFormState((current) => ({
      ...current,
      phone: event.target.value.replace(/\D/g, "").slice(0, 10)
    }));
  };

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      courseSlug: initialCourseSlug || courses[0]?.slug || "",
      requestType: initialRequestType || "CALLBACK"
    }));
    setFeedback({ type: "", message: "" });
  }, [courses, initialCourseSlug, initialRequestType]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const selectedCourse = courses.find((course) => course.slug === formState.courseSlug) || courses[0];
    const result = await onSubmitLead({
      source: formState.requestType === "BROCHURE" ? "ENROLL" : "CALLBACK",
      cityId: selectedCourse?.cityId || undefined,
      courseId: selectedCourse?.id || undefined,
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      interest: selectedCourse?.title || "",
      requestedAsset: formState.requestType,
      brochureUrl: formState.requestType === "BROCHURE" ? selectedCourse?.brochureUrl || "" : ""
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setFeedback({ type: "error", message: result.message });
      return;
    }

    setFormState({
      name: "",
      email: "",
      phone: "",
      courseSlug: initialCourseSlug || courses[0]?.slug || "",
      requestType: initialRequestType || "CALLBACK"
    });
  }

  return (
    <form className="contact-form modal-form premium-theme-form" onSubmit={handleSubmit}>
      <label className="premium-form-group">
        <span className="premium-form-label">Full name</span>
        <span className="field-with-icon">
          <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
          </svg>
          <input
            type="text"
            className="premium-form-input has-icon"
            placeholder="Your name"
            value={formState.name}
            onChange={updateField("name")}
            autoComplete="name"
            required
          />
        </span>
      </label>

      <label className="premium-form-group">
        <span className="premium-form-label">Phone number</span>
        <span className="field-with-icon">
          <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.143-7.143 1.125 1.125 0 01.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102A1.125 1.125 0 005.872 2.25H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <input
            type="tel"
            className="premium-form-input has-icon"
            placeholder="10-digit mobile number"
            value={formState.phone}
            onChange={updatePhone}
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            required
          />
        </span>
      </label>

      <label className="premium-form-group form-span-full">
        <span className="premium-form-label">Email address</span>
        <span className="field-with-icon">
          <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <input
            type="email"
            className="premium-form-input has-icon"
            placeholder="you@example.com"
            value={formState.email}
            onChange={updateField("email")}
            autoComplete="email"
          />
        </span>
      </label>

      {feedback.message && (
        <p className={`form-feedback ${feedback.type}`}>{feedback.message}</p>
      )}

      <div className="premium-form-actions">
        <button type="submit" className="premium-submit-btn" disabled={isSubmitting}>
          <span>{isSubmitting ? "Submitting..." : submitLabel}</span>
          <span aria-hidden="true">-&gt;</span>
        </button>
        <p>We will only use your details to contact you about DigiNext courses.</p>
      </div>
    </form>
  );
}

function ActionModal({ courses, initialCourseSlug, initialRequestType, onClose, onSubmitLead }) {
  const isBrochureRequest = initialRequestType === "BROCHURE";

  return (
    <div className="overlay-panel" role="dialog" aria-modal="true">
      <div className="overlay-scrim" onClick={onClose} />
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
        <div className="mini-label">{isBrochureRequest ? "Course Brochure" : "Speak to an Expert!"}</div>
        <h3>{isBrochureRequest ? "Get the curriculum" : "Tell us about yourself"}</h3>
        <p>{isBrochureRequest ? "Enter your details and we will open the course brochure after submission." : "Enter your details and our team will call you back."}</p>
        <LeadCaptureForm courses={courses} initialCourseSlug={initialCourseSlug} initialRequestType={initialRequestType} onSubmitLead={onSubmitLead} />
      </div>
    </div>
  );
}

function Footer({ brand, onOpenContact }) {
  return (
    <footer className="site-footer" style={{ background: "#0a0a0a", color: "#f5f5f5", padding: "60px 0 40px", borderTop: "none" }}>
      <div className="shell" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Top Section */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", gap: "16px", fontSize: "14px", color: "#e5e5e5" }}>
          <div style={{ fontWeight: "400" }}>future@dotlabs.design</div>
          <a href="#about" style={{ color: "#e5e5e5", textDecoration: "none", transition: "opacity 0.2s" }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>About</a>
          <button type="button" onClick={onOpenContact} style={{ color: "#e5e5e5", textDecoration: "none", transition: "opacity 0.2s", background: "transparent", padding: 0, border: 0, cursor: "pointer" }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>Contact</button>
          <a href="#" style={{ color: "#e5e5e5", textDecoration: "none", transition: "opacity 0.2s" }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>Terms & Conditions</a>
          <a href="#" style={{ color: "#e5e5e5", textDecoration: "none", transition: "opacity 0.2s" }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>Privacy Policy</a>
          <a href="#" style={{ color: "#e5e5e5", textDecoration: "none", transition: "opacity 0.2s" }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>Refund Policy</a>
          <a href="#" style={{ color: "#e5e5e5", textDecoration: "none", transition: "opacity 0.2s" }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>Service Policy</a>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "32px" }}></div>

        {/* Bottom Section */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>

          {/* Socials */}
          <div style={{ display: "flex", gap: "20px", flex: "1", minWidth: "150px" }}>
            <a href="#" style={{ color: "#a3a3a3", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#fff"} onMouseOut={e => e.currentTarget.style.color = "#a3a3a3"}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" style={{ color: "#a3a3a3", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#fff"} onMouseOut={e => e.currentTarget.style.color = "#a3a3a3"}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" style={{ color: "#a3a3a3", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#fff"} onMouseOut={e => e.currentTarget.style.color = "#a3a3a3"}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>

          {/* Center Text */}
          <div style={{ flex: "2", textAlign: "center", fontSize: "14px", color: "#a3a3a3", lineHeight: "1.6", minWidth: "250px" }}>
            With ❤️ from a Designer to the<br />Designers of Tomorrow
          </div>

          {/* Right Text */}
          <div style={{ flex: "1", textAlign: "right", fontSize: "14px", color: "#a3a3a3", lineHeight: "1.6", minWidth: "250px" }}>
            ©2025 dot labs UI/UX school of tomorrow.<br />
            All Rights Reserved
          </div>

        </div>

      </div>
    </footer>
  );
}

function MobileDock({ onOpenContact }) {
  return (
    <nav className="mobile-dock" aria-label="Mobile navigation">
      <a href="#">Home</a>
      <a href="#courses">Courses</a>
      <a href="#teachers">Teachers</a>
      <button type="button" onClick={onOpenContact}>Contact</button>
    </nav>
  );
}

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const router = useRouter();
  const [brand, setBrand] = useState(fallbackBrand);
  const [courses, setCourses] = useState(courseContent);
  const [certificates, setCertificates] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [activeCourseSlug, setActiveCourseSlug] = useState(courseContent[0].slug);
  const [openFaq, setOpenFaq] = useState(null);
  const [modal, setModal] = useState(null);
  const [videoSettings, setVideoSettings] = useState({
    youtubeUrl: "",
    title: "Experience Agency-Led Training at DigiNext",
    subtitle: "Watch how our students build real-world marketing campaigns inside a live agency environment."
  });
  const [curriculumSettings, setCurriculumSettings] = useState(defaultCurriculum);
  const [packageSettings, setPackageSettings] = useState(defaultPackageSettings);
  const [faqSettings, setFaqSettings] = useState(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.style.colorScheme = "dark";
      document.body.setAttribute("data-theme", "dark");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const [courseRows, certificateRows, teacherRows, settingsRows] = await Promise.all([
        fetchJson("/courses?status=PUBLISHED"),
        fetchJson("/certificates"),
        fetchJson("/teachers"),
        fetchJson("/settings")
      ]);
      if (!isMounted) {
        return;
      }

      const dynamicCourses = Array.isArray(courseRows) && courseRows.length > 0 ? courseRows.map(buildCourseRecord) : courseContent;
      setCourses(dynamicCourses);
      setCertificates(normalizeCertificates(certificateRows));
      setTeachers(normalizeTeachers(teacherRows));

      const settingsMap = mapSettingsByKey(settingsRows);
      setBrand({ ...fallbackBrand, ...(settingsMap.brand || {}) });
      if (settingsMap.video_settings) {
        setVideoSettings((current) => ({ ...current, ...settingsMap.video_settings }));
      }
      if (settingsMap.curriculum_settings) {
        setCurriculumSettings(settingsMap.curriculum_settings);
      }
      if (settingsMap.package_settings) {
        setPackageSettings(settingsMap.package_settings);
      }
      if (settingsMap.faq_settings) {
        setFaqSettings(settingsMap.faq_settings);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeCourse = useMemo(
    () => courses.find((course) => course.slug === activeCourseSlug) || courses[0],
    [courses, activeCourseSlug]
  );

  useEffect(() => {
    setOpenFaq(null);
  }, [activeCourseSlug]);

  useEffect(() => {
    if (!courses.some((course) => course.slug === activeCourseSlug) && courses[0]?.slug) {
      setActiveCourseSlug(courses[0].slug);
    }
  }, [courses, activeCourseSlug]);

  async function submitLead(payload) {
    const response = await fetchJson("/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response) {
      return { ok: false, message: "Unable to submit the form right now." };
    }

    const requestType = payload.requestedAsset === "BROCHURE" ? "brochure" : "callback";
    if (payload.requestedAsset === "BROCHURE" && payload.brochureUrl && typeof window !== "undefined") {
      window.open(payload.brochureUrl, "_blank", "noopener,noreferrer");
    }

    router.push(`/thank-you?phone=${encodeURIComponent(brand.supportPhone)}&request=${requestType}&course=${encodeURIComponent(payload.interest || "")}`);
    setModal(null);
    return { ok: true };
  }

  const openContactModal = () => setModal({ type: "CALLBACK", slug: activeCourse.slug });

  return (
    <main data-theme="dark" className={isScrolled ? "is-scrolled" : ""}>
      <Header brand={brand} onOpenContact={openContactModal} />
      <Hero course={activeCourse} onOpenModal={(type, slug) => setModal({ type, slug })} />
      <VideoSection videoSettings={videoSettings} />
      <AboutSection course={activeCourse} />
      <CurriculumSection curriculumSettings={curriculumSettings} onOpenModal={(type) => setModal({ type, slug: activeCourse.slug })} />
      <AgencySection course={activeCourse} />
      <PackagesSection packageSettings={packageSettings} onOpenModal={(type) => setModal({ type, slug: activeCourse.slug })} />
      <LearningSection items={activeCourse.learningItems} onOpenModal={(type) => setModal({ type, slug: activeCourse.slug })} />
      <TechnologiesSection course={activeCourse} />
      <TeachersSection teachers={teachers} />
      <FaqSection faqSettings={faqSettings} fallbackFaqs={activeCourse.faqs} openFaq={openFaq} setOpenFaq={setOpenFaq} onOpenModal={(type) => setModal({ type, slug: activeCourse.slug })} />
      <Footer brand={brand} onOpenContact={openContactModal} />
      <MobileDock onOpenContact={openContactModal} />
      {modal ? <ActionModal courses={courses} initialCourseSlug={modal.slug} initialRequestType={modal.type} onClose={() => setModal(null)} onSubmitLead={submitLead} /> : null}
    </main>
  );
}
