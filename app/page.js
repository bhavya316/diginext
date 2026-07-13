"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = "https://diginext-ij6j.onrender.com/api/v1" || "http://127.0.0.1:4000/api/v1";

const fallbackBrand = {
  lightLogo: "/DigiNext-02.png",
  darkLogo: "/DigiNext-01.png",
  supportEmail: "info@diginext.example",
  supportPhone: "+91 98765 43210"
};

const locationOptions = ["THANE", "Mumbai", "Navi Mumbai", "Kalyan/Dombivali", "Beyond Kalyan Dombivali"];

const defaultTechnologyRows = [
  [
    { name: "Figma", image: "/figma.png" },
    { name: "Next.js", image: "/next.webp" },
    { name: "React", image: "/react.png" },
    { name: "Node.js", image: "/node.png" },
    { name: "Python", image: "/python.png" }
  ],
  [
    { name: "TensorFlow", image: "/tensor.png" },
    { name: "AWS", image: "/aws.jpg" },
    { name: "MongoDB", image: "/mongo.jpg" },
    { name: "Git", image: "/git.png" },
    { name: "Docker", image: "/docker.png" }
  ]
];

const courseTechnologyRows = {
  "ai-powered-digital-marketing-course": [
    [
      { name: "Figma", image: "/figma.png" },
      { name: "Git", image: "/git.png" },
      { name: "Next.js", image: "/next.webp" },
      { name: "React", image: "/react.png" },
      { name: "AWS", image: "/aws.jpg" }
    ],
    [
      { name: "Python", image: "/python.png" },
      { name: "TensorFlow", image: "/tensor.png" },
      { name: "Node.js", image: "/node.png" },
      { name: "MongoDB", image: "/mongo.jpg" },
      { name: "Docker", image: "/docker.png" }
    ]
  ],
  "data-science-machine-learning-course": [
    [
      { name: "Python", image: "/python.png" },
      { name: "TensorFlow", image: "/tensor.png" },
      { name: "Git", image: "/git.png" },
      { name: "AWS", image: "/aws.jpg" },
      { name: "Docker", image: "/docker.png" }
    ],
    [
      { name: "MongoDB", image: "/mongo.jpg" },
      { name: "Node.js", image: "/node.png" },
      { name: "React", image: "/react.png" },
      { name: "Next.js", image: "/next.webp" },
      { name: "Figma", image: "/figma.png" }
    ]
  ],
  "devops-with-aws-azure": [
    [
      { name: "AWS", image: "/aws.jpg" },
      { name: "Docker", image: "/docker.png" },
      { name: "Git", image: "/git.png" },
      { name: "Node.js", image: "/node.png" },
      { name: "Python", image: "/python.png" }
    ],
    [
      { name: "Next.js", image: "/next.webp" },
      { name: "React", image: "/react.png" },
      { name: "MongoDB", image: "/mongo.jpg" },
      { name: "TensorFlow", image: "/tensor.png" },
      { name: "Figma", image: "/figma.png" }
    ]
  ],
  "web-full-stack-development": [
    [
      { name: "Next.js", image: "/next.webp" },
      { name: "React", image: "/react.png" },
      { name: "Node.js", image: "/node.png" },
      { name: "MongoDB", image: "/mongo.jpg" },
      { name: "Git", image: "/git.png" }
    ],
    [
      { name: "Docker", image: "/docker.png" },
      { name: "AWS", image: "/aws.jpg" },
      { name: "Figma", image: "/figma.png" },
      { name: "Python", image: "/python.png" },
      { name: "TensorFlow", image: "/tensor.png" }
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

function Header({ brand, theme, onThemeToggle }) {
  const logo = theme === "dark" ? brand.darkLogo || fallbackBrand.darkLogo : brand.lightLogo || fallbackBrand.lightLogo;

  return (
    <header className="site-header">
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
          </nav>
          <div className="header-actions">
            <button type="button" className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle theme">
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <a href="#contact" className="contact-link">
              Contact
            </a>
          </div>
          <div className="mobile-theme-slot">
            <button type="button" className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle theme">
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#courses">Courses</a>
          <a href="#teachers">Teachers</a>
          <a href="#faq">FAQs</a>
          <a href="#contact">Contact</a>
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

function CertificatesSection({ certificates }) {
  return (
    <section className="section">
      <div className="shell">
        <div className="section-heading">
          <h2>Certificates</h2>
          <div className="rule" />
        </div>
        <div className="certificate-grid">
          {certificates.length > 0
            ? certificates.map((certificate) => (
              <div key={certificate.id} className="card certificate-card">
                <div className="certificate-media">
                  <img src={certificate.imageUrl} alt={certificate.title} className="certificate-image" />
                </div>
                <h3>{certificate.title}</h3>
              </div>
            ))
            : Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="card certificate-card">
                <div className="certificate-placeholder">Certificate preview {index + 1}</div>
              </div>
            ))}
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

function CoursesSection({ courses, activeCourseSlug, onSelectCourse, onOpenModal }) {
  return (
    <section id="courses" className="section">
      <div className="shell">
        <div className="section-heading">
          <h2>What Will You Learn</h2>
          <div className="rule" />
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <article
              key={course.slug}
              className={`card course-card ${activeCourseSlug === course.slug ? "course-card-active" : ""}`}
              onClick={() => onSelectCourse(course.slug)}
            >
              <h3>{course.title}</h3>
              <p className="course-summary">{course.shortDescription}</p>
              <ul>
                {course.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="course-actions">
                <button type="button" className="ghost-inline" onClick={(event) => { event.stopPropagation(); onOpenModal("BROCHURE", course.slug); }}>
                  <Image src="/download.svg" alt="download" width={16} height={16} />
                  <span>Download Curriculum</span>
                </button>
                <button type="button" className="solid-inline" onClick={(event) => { event.stopPropagation(); onOpenModal("CALLBACK", course.slug); }}>
                  Enquire Now
                </button>
              </div>
            </article>
          ))}
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
          <h2>Technologies You Will Use</h2>
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
  return (
    <section id="teachers" className="section">
      <div className="shell">
        <div className="section-heading">
          <h2>Teachers</h2>
          <div className="rule" />
        </div>
        <div className="teacher-grid">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <div key={teacher.id} className="card teacher-card">
                <div className="teacher-media">
                  {teacher.photoUrl ? <img src={teacher.photoUrl} alt={teacher.name} className="teacher-image" /> : <div className="teacher-placeholder">{teacher.name.charAt(0)}</div>}
                </div>
                <h3>{teacher.name}</h3>
                {teacher.employmentStatus ? <p className="teacher-status">{teacher.employmentStatus}</p> : null}
                {teacher.credentials ? <p className="teacher-copy">{teacher.credentials}</p> : null}
                {teacher.linkedinUrl ? (
                  <a href={teacher.linkedinUrl} target="_blank" rel="noreferrer" className="teacher-link">
                    LinkedIn
                  </a>
                ) : null}
              </div>
            ))
          ) : (
            <div className="card teacher-empty">Teacher profiles will appear here once they are added from admin.</div>
          )}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ items, openFaq, setOpenFaq, onOpenModal }) {
  return (
    <section className="section faq-section" id="faq">
      <div className="shell">
        <div className="section-heading">
          <h2>Frequently Asked Questions</h2>
          <div className="rule" />
        </div>
        <div className="faq-list">
          {items.map(([question, answer], index) => (
            <div key={question} className="faq-item">
              <button type="button" className="faq-trigger" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <span>{question}</span>
                <span>{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index ? <p className="faq-answer">{answer}</p> : null}
            </div>
          ))}
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
    originLocation: locationOptions[0],
    requestType: initialRequestType,
    message: ""
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      originLocation: formState.originLocation,
      interest: selectedCourse?.title || "",
      requestedAsset: formState.requestType,
      brochureUrl: formState.requestType === "BROCHURE" ? selectedCourse?.brochureUrl || "" : "",
      message: formState.message
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
      originLocation: locationOptions[0],
      requestType: initialRequestType || "CALLBACK",
      message: ""
    });
  }

  return (
    <form className="contact-form modal-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={formState.name} onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))} required />
      <input type="email" placeholder="Email" value={formState.email} onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))} />
      <input
        type="tel"
        placeholder="Phone"
        value={formState.phone}
        onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value.replace(/\D/g, "").slice(0, 10) }))}
        inputMode="numeric"
        maxLength={10}
        required
      />
      <select value={formState.courseSlug} onChange={(event) => setFormState((current) => ({ ...current, courseSlug: event.target.value }))}>
        {courses.map((course) => (
          <option key={course.slug} value={course.slug}>
            {course.title}
          </option>
        ))}
      </select>
      <select value={formState.originLocation} onChange={(event) => setFormState((current) => ({ ...current, originLocation: event.target.value }))}>
        {locationOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select value={formState.requestType} onChange={(event) => setFormState((current) => ({ ...current, requestType: event.target.value }))}>
        <option value="CALLBACK">Request callback</option>
        <option value="BROCHURE">Download brochure</option>
      </select>
      <textarea rows={5} placeholder="Message / Feedback" value={formState.message} onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))} />
      <p className="field-note">Where are you from? is now captured in the form as requested.</p>
      {feedback.message ? <p className={`form-feedback ${feedback.type}`}>{feedback.message}</p> : null}
      <div className="form-actions">
        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

function ActionModal({ courses, initialCourseSlug, initialRequestType, onClose, onSubmitLead }) {
  return (
    <div className="overlay-panel" role="dialog" aria-modal="true">
      <div className="overlay-scrim" onClick={onClose} />
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
        <div className="mini-label">Speak to an Expert!</div>
        <h3>Tell us about yourself</h3>
        <p>Enquire Now and Download Curriculum both open this form.</p>
        <LeadCaptureForm courses={courses} initialCourseSlug={initialCourseSlug} initialRequestType={initialRequestType} onSubmitLead={onSubmitLead} />
      </div>
    </div>
  );
}

function ContactSection({ courses, onSubmitLead }) {
  return (
    <section id="contact" className="section contact-section">
      <div className="shell narrow">
        <div className="section-heading">
          <h2>Join our rapidly growing learning network</h2>
        </div>
        <div className="card contact-card">
          <h3>Get Started with DGNext</h3>
          <LeadCaptureForm courses={courses} initialCourseSlug={courses[0]?.slug || ""} initialRequestType="CALLBACK" onSubmitLead={onSubmitLead} />
        </div>
      </div>
    </section>
  );
}

function Footer({ brand }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <h4>Contact</h4>
          <p>Email: {brand.supportEmail}</p>
          <p>Phone: {brand.supportPhone}</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#courses">Courses</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h4>Social</h4>
          <a href={`tel:${brand.supportPhone}`}>Call</a>
          <a href={`mailto:${brand.supportEmail}`}>Email</a>
        </div>
      </div>
      <div className="shell footer-meta">© 2025 Diginext. All rights reserved.</div>
    </footer>
  );
}

function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Mobile navigation">
      <a href="#">Home</a>
      <a href="#courses">Courses</a>
      <a href="#teachers">Teachers</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}

export default function Page() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [brand, setBrand] = useState(fallbackBrand);
  const [courses, setCourses] = useState(courseContent);
  const [certificates, setCertificates] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [activeCourseSlug, setActiveCourseSlug] = useState(courseContent[0].slug);
  const [openFaq, setOpenFaq] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? window.localStorage.getItem("diginext-theme") : null;
    const initialTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.style.colorScheme = theme;
      document.body.setAttribute("data-theme", theme);
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("diginext-theme", theme);
    }
  }, [theme]);

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

  return (
    <main data-theme={theme}>
      <Header brand={brand} theme={theme} onThemeToggle={() => setTheme((current) => (current === "light" ? "dark" : "light"))} />
      <Hero course={activeCourse} onOpenModal={(type, slug) => setModal({ type, slug })} />
      <AboutSection course={activeCourse} />
      <CoursesSection courses={courses} activeCourseSlug={activeCourseSlug} onSelectCourse={setActiveCourseSlug} onOpenModal={(type, slug) => setModal({ type, slug })} />
      <AgencySection course={activeCourse} />
      <CertificatesSection certificates={certificates} />
      <LearningSection items={activeCourse.learningItems} onOpenModal={(type) => setModal({ type, slug: activeCourse.slug })} />
      <TechnologiesSection course={activeCourse} />
      <TeachersSection teachers={teachers} />
      <FaqSection items={activeCourse.faqs} openFaq={openFaq} setOpenFaq={setOpenFaq} onOpenModal={(type) => setModal({ type, slug: activeCourse.slug })} />
      <ContactSection courses={courses} onSubmitLead={submitLead} />
      <Footer brand={brand} />
      <MobileDock />
      {modal ? <ActionModal courses={courses} initialCourseSlug={modal.slug} initialRequestType={modal.type} onClose={() => setModal(null)} onSubmitLead={submitLead} /> : null}
    </main>
  );
}
