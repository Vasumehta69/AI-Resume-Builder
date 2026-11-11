import { ResumeData } from '../types/resume';

export interface PhraseCategory {
  id: string;
  name: string;
  subcategories: {
    name: string;
    bullets: string[];
  }[];
}

export const ACTION_VERBS = {
  Leadership: [
    'Spearheaded', 'Directed', 'Mobilized', 'Championed', 'Orchestrated',
    'Cultivated', 'Guided', 'Mentored', 'Empowered', 'Unified',
    'Formulated', 'Governed', 'Steered', 'Pioneered', 'Administered'
  ],
  Technical: [
    'Architected', 'Engineered', 'Deployed', 'Refactored', 'Automated',
    'Configured', 'Containerized', 'Benchmarked', 'Integrated', 'Instrumented',
    'Synthesized', 'Programmed', 'Migrated', 'Provisioned', 'Decoupled'
  ],
  Optimization: [
    'Accelerated', 'Streamlined', 'Consolidated', 'Maximized', 'Eliminated',
    'Compressed', 'Augmented', 'Trimmed', 'Rectified', 'Standardized',
    'Refined', 'Scaled', 'Overhauled', 'Modernized', 'Re-engineered'
  ],
  Analysis: [
    'Evaluated', 'Audited', 'Investigated', 'Quantified', 'Formulated',
    'Surveyed', 'Forecasted', 'Synthesized', 'Diagnosed', 'Identified',
    'Appraised', 'Mapped', 'Extracted', 'Validated', 'Benchmarked'
  ],
  Innovation: [
    'Conceived', 'Devised', 'Invented', 'Introduced', 'Spearheaded',
    'Launched', 'Conceptualized', 'Drafted', 'Fabricated', 'Established',
    'Revitalized', 'Initiated', 'Originated', 'Founded', 'Patented'
  ],
  Revenue: [
    'Generated', 'Negotiated', 'Closed', 'Secured', 'Expanded',
    'Captured', 'Monetized', 'Boosted', 'Elevated', 'Delivered',
    'Outperformed', 'Acquired', 'Retained', 'Surpassed', 'Prospected'
  ],
};

export const PHRASE_CATEGORIES: PhraseCategory[] = [
  {
    id: 'software-eng',
    name: 'Software Engineering & Architecture',
    subcategories: [
      {
        name: 'Backend & Distributed Systems',
        bullets: [
          'Architected high-throughput microservices handling 45,000+ requests per second with sub-25ms p99 latency.',
          'Engineered resilient event-driven pipeline using Apache Kafka and Go, decoupling core billing services and zeroing message drops.',
          'Migrated monolithic relational schema to partitioned PostgreSQL cluster, trimming database load by 52% during peak sales periods.',
          'Designed idempotency and distributed locking mechanisms using Redis, preventing duplicate transaction anomalies across checkout flows.',
          'Authored gRPC contracts and protobuf schemas across 14 independent engineering pods, shortening cross-team integration cycles by 3 weeks.',
          'Refactored legacy REST endpoints into batch queries with GraphQL, reducing network payload bandwidth by 40%.',
          'Spearheaded transition from on-prem infrastructure to multi-region AWS setup (EKS, RDS Aurora), increasing system availability to 99.99%.',
          'Implemented rate-limiting and DDoS mitigation proxy handling 100M+ monthly edge requests without infrastructure degradation.',
          'Built internal distributed tracing instrumentation with OpenTelemetry, decreasing mean time to resolution (MTTR) by 38%.',
          'Eliminated database deadlocks across high-concurrency payment processing tables, boosting transaction throughput by 3.2x.',
        ],
      },
      {
        name: 'Frontend & Web Applications',
        bullets: [
          'Engineered responsive web client with React, Next.js, and TypeScript, improving Google Core Web Vitals (LCP) from 3.8s to 1.1s.',
          'Spearheaded enterprise design system component library adopted by 40+ engineers, standardizing accessibility (WCAG AA) across 6 products.',
          'Implemented optimistic UI mutations and normalized client-side cache using TanStack Query, eliminating visible layout shifts for 500k+ MAU.',
          'Refactored legacy client-side state machine into modular Zustand stores, slashing memory consumption and reducing bundle size by 34%.',
          'Built interactive real-time collaborative canvas utilizing WebSockets and CRDTs, supporting seamless multi-cursor co-editing for up to 50 concurrent users.',
          'Integrated automated visual regression test suite with Playwright, catching 95% of frontend styling regressions prior to staging deployment.',
          'Introduced server-driven UI architecture for dynamic promotional landing pages, enabling marketing teams to deploy layouts without engineering sprints.',
          'Developed offline-first PWA caching strategies with Service Workers and IndexedDB, allowing field staff to log inspections without internet connectivity.',
          'Optimized bundle tree-shaking and dynamic code-splitting, trimming initial page load JS payload from 850KB to 210KB.',
          'Engineered keyboard navigation shortcuts and ARIA live regions, earning 100% lighthouse accessibility compliance score.',
        ],
      },
      {
        name: 'DevOps, SRE & Cloud Infrastructure',
        bullets: [
          'Provisioned immutable multi-account AWS architecture using Terraform and GitHub Actions, cutting environment spin-up time from 4 days to 15 minutes.',
          'Configured Kubernetes (EKS) auto-scaling clusters with Karpenter, reducing idle compute waste and lowering annual AWS cloud expenditure by $140,000.',
          'Constructed robust CI/CD deployment pipelines incorporating automated canary releases and rollback triggers via ArgoCD, achieving zero-downtime releases.',
          'Orchestrated multi-region disaster recovery strategy with automated failover testing, satisfying strict 15-minute RTO and 5-minute RPO mandates.',
          'Hardened container supply chain security using Trivy vulnerability scanners and Cosign image signing, resolving 100% of high-severity CVEs.',
          'Standardized centralized logging and alerting with Prometheus, Grafana, and Datadog, reducing false positive on-call notifications by 65%.',
          'Built automated cost-anomaly detection lambda functions that alert engineering managers when dev sandbox resources exceed spending thresholds.',
          'Automated database snapshot backups, point-in-time recovery validations, and cross-region replication for enterprise HIPAA compliance.',
          'Authored comprehensive SRE incident post-mortems and blameless retrospective playbooks, improving team reliability practices.',
        ],
      },
      {
        name: 'AI, Machine Learning & LLM Systems',
        bullets: [
          'Engineered production Retrieval-Augmented Generation (RAG) system utilizing vector databases and rerankers, achieving 94% retrieval accuracy on technical documentation.',
          'Fine-tuned lightweight open-source LLMs with LoRA on proprietary customer support logs, matching GPT-4 benchmark performance while reducing API cost by 85%.',
          'Built high-performance inference server with TensorRT-LLM and vLLM, doubling token generation throughput per GPU worker node.',
          'Implemented semantic evaluation framework with automated test suites evaluating hallucination rates, toxicity, and context fidelity across model releases.',
          'Architected end-to-end data pipeline processing 2TB daily streaming text data with Apache Flink and PySpark for continuous model retraining.',
          'Deployed guardrail classification models at the API gateway layer to detect and redact PII and sensitive user credentials in real-time.',
          'Designed embedding search indexing pipeline handling 10 million vector records with sub-15ms search latency.',
          'Collaborated with compliance teams to publish model cards, bias audit reports, and AI governance guidelines ahead of enterprise pilot rollouts.',
        ],
      },
    ],
  },
  {
    id: 'product-management',
    name: 'Product & Project Management',
    subcategories: [
      {
        name: 'Product Strategy & Vision',
        bullets: [
          'Defined 3-year product roadmap and spearheaded zero-to-one launch of enterprise SaaS analytics module, generating $2.4M ARR within first 12 months.',
          'Conducted 60+ discovery interviews with VP-level buyers to identify critical workflow bottlenecks, validating product-market fit before engineering investment.',
          'Authored comprehensive PRDs, user stories, and acceptance criteria across 4 scrum teams, maintaining 94% on-time sprint velocity across consecutive quarters.',
          'Restructured pricing and packaging tiers from seat-based to usage-based billing, lifting average revenue per account (ARPU) by 32%.',
          'Instituted North Star metric frameworks (Activation, Retention, LTV) across product vertical, creating cross-functional alignment between Eng, Design, and Sales.',
          'Formulated competitive positioning strategy against legacy market leaders, securing 18 Fortune 500 competitive takeout wins in FY25.',
          'Led product committee through build vs. buy evaluation for authentication infrastructure, accelerating time-to-market by 4 months.',
        ],
      },
      {
        name: 'Growth & Experimentation',
        bullets: [
          'Designed and analyzed 40+ rigorous A/B experiments across user onboarding funnel, driving 22% improvement in day-7 activation rates.',
          'Engineered self-serve viral invitation loop, increasing net new organic user referrals by 38% and lowering customer acquisition cost (CAC).',
          'Streamlined free-to-paid upgrade checkout flow with 1-click team billing, generating an immediate $450k annualized revenue expansion.',
          'Identified churn triggers through cohort retention analysis, introducing targeted re-engagement nudges that curtailed net revenue churn to under 0.8% monthly.',
          'Partnered with product marketing to launch in-app contextual walkthroughs, raising feature adoption of advanced reporting tools from 14% to 48%.',
          'Built quantitative dashboard tracking user journey friction points, isolating checkout drop-offs and resolving conversion leaks.',
        ],
      },
    ],
  },
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    subcategories: [
      {
        name: 'Machine Learning & Predictive Modeling',
        bullets: [
          'Developed gradient-boosted churn prediction model identifying at-risk accounts 60 days in advance, enabling customer success teams to save $1.2M in annual recurring revenue.',
          'Built real-time fraud detection scoring service with XGBoost evaluating credit card transactions under 10ms, decreasing fraudulent chargebacks by 46%.',
          'Trained personalized recommendation engine using collaborative filtering and neural embeddings, increasing user click-through rate (CTR) by 19%.',
          'Constructed customer lifetime value (LTV) forecasting models in PySpark, optimizing marketing capital allocation across 8 ad channels.',
          'Created automated uplift modeling pipeline to isolate customers most responsive to promotional discount codes, increasing promotion ROI by 35%.',
          'Formulated survival analysis models to estimate hardware battery degradation, guiding preventative maintenance scheduling across 25,000 IoT field devices.',
        ],
      },
      {
        name: 'Business Intelligence & Data Engineering',
        bullets: [
          'Designed unified star-schema data warehouse in Snowflake and dbt, consolidating 12 disparate data silos into single source of corporate truth.',
          'Modeled 45+ clean dbt data marts with automated CI testing and data quality assertions, eliminating daily executive reporting discrepancies.',
          'Created self-serve Tableau and Looker reporting suite for 300+ business users, reducing ad-hoc data pull requests by 60%.',
          'Streamlined ETL pipeline runs from 4 hours to 35 minutes by optimizing SQL queries, partitioning keys, and clustering columns.',
          'Governed data cataloging and lineage documentation with Atlan, ensuring GDPR and CCPA regulatory compliance across enterprise analytics.',
        ],
      },
    ],
  },
  {
    id: 'marketing-growth',
    name: 'Marketing, Growth & Brand',
    subcategories: [
      {
        name: 'Growth Marketing & Paid Acquisition',
        bullets: [
          'Managed $3.5M annual paid media budget across Google Ads, LinkedIn, and Meta, scaling pipeline opportunities by 140% while maintaining target CPA.',
          'Designed multi-touch attribution model in BigQuery, reallocating spend to highest-converting bottom-funnel keywords and boosting blended ROAS by 2.4x.',
          'Scaled organic search acquisition through programmatic SEO content strategy, growing non-brand organic traffic from 45,000 to 280,000 monthly visits.',
          'Spearheaded account-based marketing (ABM) campaign targeting 200 key enterprise accounts, resulting in 42 completed discovery calls and $1.8M in pipeline.',
          'Executed iterative creative testing cadences across video and display ad formats, driving 45% lift in click-through rates and 18% lower cost per lead.',
        ],
      },
      {
        name: 'Content & Brand Marketing',
        bullets: [
          'Authored bi-weekly industry research report that garnered 15,000+ organic downloads and mentions across Forbes, TechCrunch, and Bloomberg.',
          'Organized inaugural virtual customer summit attracting 4,200 registered attendees, generating 350 enterprise sales-qualified leads (SQLs).',
          'Revamped corporate website messaging and brand narrative, elevating overall visitor-to-demo conversion rate from 1.8% to 3.4%.',
          'Launched technical podcast series with industry executives, reaching top 20 rankings on Apple Technology charts within 6 episodes.',
        ],
      },
    ],
  },
  {
    id: 'sales-bizdev',
    name: 'Sales & Business Development',
    subcategories: [
      {
        name: 'Enterprise Sales & Closing',
        bullets: [
          'Consistently surpassed quota attainment, delivering 138% of FY25 annual target ($2.1M new ARR) across Fortune 1000 manufacturing and tech accounts.',
          'Closed largest multi-year contract in company history ($850k ACV, 3-year term), successfully outpositioning incumbent legacy software providers.',
          'Conducted complex multi-stakeholder technical negotiations with C-level executives, IT security directors, and procurement teams.',
          'Developed territory expansion playbook that scaled regional sales pipeline from $1.4M to $6.8M within 18 months.',
          'Partnered with Solutions Architects to deliver custom proof-of-concept (POC) pilots, converting 85% of technical evaluations into signed master agreements.',
        ],
      },
    ],
  },
  {
    id: 'design-ux',
    name: 'UI/UX & Product Design',
    subcategories: [
      {
        name: 'Product Design & Design Systems',
        bullets: [
          'Led end-to-end UX/UI redesign of core web application, improving task completion rates by 34% and reducing user onboarding support tickets by 50%.',
          'Established comprehensive Figma design system containing 250+ accessible components, tokens, and documentation, cutting UI design sprint delivery time in half.',
          'Conducted 45 usability testing sessions and moderated cognitive walkthroughs, translating qualitative friction points into high-leverage UI refinements.',
          'Created interactive high-fidelity prototypes with micro-interactions in ProtoPie and Figma to align executive leadership ahead of engineering kickoffs.',
          'Partnered closely with frontend engineers to audit CSS token implementations, guaranteeing 100% visual fidelity and pixel-perfect production delivery.',
        ],
      },
    ],
  },
  {
    id: 'finance-ops',
    name: 'Finance, Operations & Strategy',
    subcategories: [
      {
        name: 'Financial Planning & Analysis (FP&A)',
        bullets: [
          'Engineered company-wide 3-statement financial model and rolling 18-month forecasts, enabling executive leadership to project cash burn with 96% accuracy.',
          'Spearheaded departmental operating expense review, identifying redundant vendor contracts and generating $420k in immediate annual cost savings.',
          'Prepared financial board presentations, variance analyses, and investor updates ahead of successful $28M Series B financing round.',
          'Automated monthly SaaS metric reporting (ARR, Net Retention, CAC Payback, Rule of 40) using SQL and Adaptive Insights, saving 20 finance hours per month.',
          'Led financial due diligence and synergy valuation modeling for $14M strategic bolt-on acquisition.',
        ],
      },
    ],
  },
];

export const RESUME_PRESETS: { id: string; name: string; role: string; description: string; data: ResumeData }[] = [
  {
    id: 'software-lead',
    name: 'Senior Full-Stack Engineer',
    role: 'Engineering',
    description: 'Modern full-stack technical leader with distributed systems, React, and cloud architecture expertise.',
    data: {
      personalInfo: {
        fullName: 'Alexander Vance',
        headline: 'Staff Full-Stack & Distributed Systems Engineer',
        email: 'alex.vance@techmail.io',
        phone: '+1 (415) 892-4102',
        location: 'San Francisco, CA',
        website: 'https://alexvance.dev',
        linkedin: 'linkedin.com/in/alexandervance',
        github: 'github.com/avance-dev',
        summary: 'Staff Software Engineer with 8+ years of experience architecting resilient distributed systems and responsive web applications at scale. Proven track record leading core platform teams, modernizing microservices to handle 50k+ QPS, and mentoring 12+ engineers across global teams.',
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Staff Software Engineer',
          company: 'Stratos Cloud Platforms',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: 'Present',
          current: true,
          bullets: [
            'Architected distributed event-driven data streaming engine in Go and Apache Kafka, processing 45,000+ events per second with sub-20ms p99 latency.',
            'Spearheaded enterprise web portal rewrite with Next.js 15, TypeScript, and Tailwind CSS, elevating Google Core Web Vitals score to 98/100.',
            'Decoupled monolithic billing subsystem into containerized Kubernetes microservices, eliminating cross-service transaction failures and reducing cloud costs by $120k annually.',
            'Mentored 6 senior and staff engineers, introduced RFC architecture review standards, and reduced production incident rate by 42%.',
          ],
        },
        {
          id: 'exp-2',
          jobTitle: 'Senior Full-Stack Engineer',
          company: 'Hyperion Analytics',
          location: 'Seattle, WA',
          startDate: '2019-06',
          endDate: '2022-02',
          current: false,
          bullets: [
            'Engineered real-time interactive analytics dashboard utilized by 120,000+ active enterprise users, optimizing WebGL chart render performance from 24fps to 60fps.',
            'Constructed automated CI/CD deployment pipelines using GitHub Actions and Terraform, decreasing deployment cycle time from 3 hours to 12 minutes.',
            'Implemented Redis caching layer and optimized PostgreSQL query indexes, reducing p95 database query execution latency by 64%.',
          ],
        },
        {
          id: 'exp-3',
          jobTitle: 'Software Engineer',
          company: 'Apex Data Labs',
          location: 'Austin, TX',
          startDate: '2017-08',
          endDate: '2019-05',
          current: false,
          bullets: [
            'Developed RESTful API microservices in Python (FastAPI) and Node.js, integrating multi-tenant SSO authentication via OAuth 2.0 and SAML.',
            'Authored unit and end-to-end test suites achieving 92% code coverage, catching over 80 potential regression defects prior to staging deployment.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.S. in Computer Science',
          school: 'University of Washington',
          location: 'Seattle, WA',
          startDate: '2013-09',
          endDate: '2017-06',
          gpaOrHonors: 'Magna Cum Laude (GPA: 3.86/4.0)',
          details: 'Specialization in Distributed Systems & Database Architecture.',
        },
      ],
      skillGroups: [
        {
          id: 'sk-1',
          category: 'Languages & Core',
          items: ['TypeScript', 'JavaScript (ESNext)', 'Go', 'Python', 'SQL (PostgreSQL)', 'GraphQL', 'Rust'],
        },
        {
          id: 'sk-2',
          category: 'Frontend & Frameworks',
          items: ['React 19', 'Next.js', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'WebGL', 'HTML5/CSS3'],
        },
        {
          id: 'sk-3',
          category: 'Backend & Cloud Infrastructure',
          items: ['Node.js', 'Docker', 'Kubernetes (EKS)', 'AWS (ECS, Lambda, S3, RDS)', 'Kafka', 'Redis', 'Terraform'],
        },
        {
          id: 'sk-4',
          category: 'Practices & Engineering',
          items: ['System Architecture', 'Microservices', 'CI/CD Automation', 'REST & gRPC API Design', 'Performance Profiling', 'Mentorship'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Chronos Distributed Task Queue',
          role: 'Creator & Maintainer',
          link: 'https://github.com/avance-dev/chronos-queue',
          tools: ['Go', 'Redis', 'gRPC', 'Docker'],
          bullets: [
            'Engineered open-source distributed job queue handling up to 100k delayed tasks with guaranteed at-least-once execution and dead-letter queues.',
            'Acquired 1,800+ GitHub stars and community contributions from 24 active developers worldwide.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Professional',
          issuer: 'Amazon Web Services',
          date: '2024',
        },
        {
          id: 'cert-2',
          name: 'Certified Kubernetes Administrator (CKA)',
          issuer: 'Cloud Native Computing Foundation',
          date: '2023',
        },
      ],
      design: {
        template: 'modern-executive',
        font: 'sans-modern',
        spacing: 'balanced',
        accentColor: 'navy',
        showPhoto: false,
        showDividers: true,
        uppercaseHeaders: true,
      },
    },
  },
  {
    id: 'product-lead',
    name: 'Lead Product Manager',
    role: 'Product',
    description: 'Metrics-driven B2B product leader focused on monetization, zero-to-one launches, and PLG growth.',
    data: {
      personalInfo: {
        fullName: 'Elena Rostova',
        headline: 'Lead Product Manager — Growth & Platform Monetization',
        email: 'elena.rostova@prodmind.com',
        phone: '+1 (650) 419-7231',
        location: 'New York, NY',
        website: 'https://elenarostova.com',
        linkedin: 'linkedin.com/in/elenarostova',
        github: '',
        summary: 'Strategic Lead Product Manager with 7+ years directing high-velocity product discovery, monetization frameworks, and cross-functional engineering teams. Successfully led zero-to-one launch of enterprise SaaS analytics generating $4.2M ARR in Year 1.',
      },
      experiences: [
        {
          id: 'exp-pm-1',
          jobTitle: 'Lead Product Manager',
          company: 'Veloce Data Systems',
          location: 'New York, NY',
          startDate: '2022-01',
          endDate: 'Present',
          current: true,
          bullets: [
            'Spearheaded product vision and end-to-end execution of enterprise AI insights suite, acquiring 45 Fortune 500 customers and reaching $4.2M ARR within 14 months.',
            'Re-architected self-serve product onboarding experience, driving a 28% increase in Day-14 customer activation and shortening time-to-value from 18 days to 4 days.',
            'Managed team of 18 engineers, 2 UX designers, and 1 product analyst across two agile pods, consistently achieving 95% sprint roadmap predictability.',
            'Executed 35+ customer discovery interviews with VP-level buyers, translating recurring friction points into validated PRDs.',
          ],
        },
        {
          id: 'exp-pm-2',
          jobTitle: 'Senior Product Manager — Growth',
          company: 'Aura Cloud Collaboration',
          location: 'San Francisco, CA',
          startDate: '2019-04',
          endDate: '2021-12',
          current: false,
          bullets: [
            'Designed viral team-invite loop and revised tier pricing models, lifting free-to-paid trial conversion rate from 3.2% to 5.8%.',
            'Executed 40+ rigorous multivariate growth experiments across checkout and workspace invite flows, generating an incremental $1.8M annualized revenue run rate.',
            'Partnered with Enterprise Sales to close $850k in expansion deals by delivering customer-requested enterprise governance and audit log features.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-pm-1',
          degree: 'M.B.A. & B.S. in Computer Engineering',
          school: 'Columbia University',
          location: 'New York, NY',
          startDate: '2014-09',
          endDate: '2019-05',
          gpaOrHonors: 'Dean’s Honor List',
          details: 'Focus on Technology Strategy & Operations Research.',
        },
      ],
      skillGroups: [
        {
          id: 'sk-pm-1',
          category: 'Product Strategy',
          items: ['Product Vision & Roadmap', 'Customer Discovery', 'PRD Authoring', 'Product-Led Growth (PLG)', 'Pricing & Packaging', 'Competitive Analysis'],
        },
        {
          id: 'sk-pm-2',
          category: 'Analytics & Discovery',
          items: ['A/B Testing & Experimentation', 'Cohort Retention Modeling', 'Mixpanel', 'Amplitude', 'SQL (Advanced)', 'User Journey Mapping'],
        },
        {
          id: 'sk-pm-3',
          category: 'Leadership & Execution',
          items: ['Agile / Scrum Leadership', 'Cross-Functional Alignment', 'Go-To-Market (GTM)', 'Stakeholder Management', 'Executive Presentations'],
        },
      ],
      projects: [
        {
          id: 'proj-pm-1',
          name: 'PLG Experimentation Framework',
          role: 'Lead Author',
          link: 'https://medium.com/@elena-product/plg-experimentation-handbook',
          tools: ['Amplitude', 'SQL', 'Figma'],
          bullets: [
            'Published comprehensive guide on statistical experimentation in early-stage B2B startups, read by over 45,000 product professionals.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-pm-1',
          name: 'Reforge Advanced Growth Series',
          issuer: 'Reforge',
          date: '2023',
        },
      ],
      design: {
        template: 'classic-ats',
        font: 'serif-clean',
        spacing: 'balanced',
        accentColor: 'charcoal',
        showPhoto: false,
        showDividers: true,
        uppercaseHeaders: true,
      },
    },
  },
  {
    id: 'data-scientist',
    name: 'Senior Data Scientist',
    role: 'Data Science',
    description: 'Expert in machine learning, deep learning, causal inference, and real-time prediction pipelines.',
    data: {
      personalInfo: {
        fullName: 'Dr. Marcus Thorne',
        headline: 'Staff Data Scientist & Machine Learning Architect',
        email: 'marcus.thorne.phd@datasphere.org',
        phone: '+1 (617) 502-9981',
        location: 'Boston, MA',
        website: 'https://marcusthorne.ai',
        linkedin: 'linkedin.com/in/marcus-thorne-ai',
        github: 'github.com/mthorne-ai',
        summary: 'PhD Data Scientist with 7+ years of experience leading statistical modeling, LLM deployment, and recommendation algorithms in production. Author of 6 peer-reviewed papers in machine learning; delivered ML pipelines generating over $8.5M in incremental revenue.',
      },
      experiences: [
        {
          id: 'exp-ds-1',
          jobTitle: 'Staff Data Scientist',
          company: 'Cerebro Labs AI',
          location: 'Boston, MA',
          startDate: '2021-09',
          endDate: 'Present',
          current: true,
          bullets: [
            'Architected real-time recommendation and retrieval engine processing 100M+ user interactions daily, driving an 18% lift in average order value (AOV).',
            'Formulated multi-task deep neural network predicting customer lifetime value (LTV), guiding $15M in annual marketing capital allocation.',
            'Productionized fine-tuned LLM classification pipelines with vLLM and Triton Inference Server, reducing inference latency by 68% and eliminating $80k in monthly GPU costs.',
            'Conducted rigorous causal inference and synthetic control studies to evaluate offline impact of multi-million dollar marketing sponsorships.',
          ],
        },
        {
          id: 'exp-ds-2',
          jobTitle: 'Senior Machine Learning Scientist',
          company: 'Quantum Health Analytics',
          location: 'Cambridge, MA',
          startDate: '2018-06',
          endDate: '2021-08',
          current: false,
          bullets: [
            'Trained gradient-boosted diagnostic risk models with XGBoost and LightGBM, outperforming clinical baseline models by 24% AUC-ROC.',
            'Constructed end-to-end automated ML pipeline using dbt, Snowflake, and MLflow, enabling daily automated model evaluation and drift detection.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-ds-1',
          degree: 'Ph.D. in Computer Science (Machine Learning)',
          school: 'Massachusetts Institute of Technology (MIT)',
          location: 'Cambridge, MA',
          startDate: '2014-09',
          endDate: '2018-05',
          gpaOrHonors: 'NSF Graduate Research Fellow',
          details: 'Dissertation on Scalable Deep Learning under Distribution Shifts.',
        },
      ],
      skillGroups: [
        {
          id: 'sk-ds-1',
          category: 'Machine Learning & AI',
          items: ['Deep Learning (PyTorch, JAX)', 'Transformers & LLMs', 'XGBoost', 'LightGBM', 'Causal Inference', 'NLP', 'Vector Search'],
        },
        {
          id: 'sk-ds-2',
          category: 'Data Engineering & Cloud',
          items: ['Python', 'SQL (PostgreSQL, Snowflake)', 'PySpark', 'dbt', 'Docker', 'Kubeflow', 'MLflow', 'AWS SageMaker'],
        },
      ],
      projects: [
        {
          id: 'proj-ds-1',
          name: 'VecTorch Vector Search Library',
          role: 'Lead Researcher',
          link: 'https://github.com/mthorne-ai/vectorch',
          tools: ['PyTorch', 'C++', 'CUDA'],
          bullets: [
            'Developed hardware-accelerated approximate nearest neighbor vector search engine benchmarking 2.5x faster indexing than baseline Faiss.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-ds-1',
          name: 'Deep Learning Specialization (Andrew Ng)',
          issuer: 'DeepLearning.AI',
          date: '2020',
        },
      ],
      design: {
        template: 'tech-minimalist',
        font: 'mono-hybrid',
        spacing: 'balanced',
        accentColor: 'teal',
        showPhoto: false,
        showDividers: true,
        uppercaseHeaders: true,
      },
    },
  },
  {
    id: 'designer-uiux',
    name: 'Lead UI/UX Designer',
    role: 'Design',
    description: 'Design systems architect with focus on craft, typography, accessibility, and high-impact digital experiences.',
    data: {
      personalInfo: {
        fullName: 'Sophia Lin',
        headline: 'Lead Product Designer & Design Systems Architect',
        email: 'sophia@sophialin.design',
        phone: '+1 (312) 674-2910',
        location: 'Chicago, IL',
        website: 'https://sophialin.design',
        linkedin: 'linkedin.com/in/sophialindesign',
        github: '',
        summary: 'Award-winning Lead Product Designer with 8 years of experience designing scalable design systems, multi-platform applications, and intuitive enterprise workflows. Champion of WCAG 2.2 accessibility, pixel-perfect craft, and measurable UX outcomes.',
      },
      experiences: [
        {
          id: 'exp-des-1',
          jobTitle: 'Lead Product Designer',
          company: 'Aether Creative Software',
          location: 'Chicago, IL',
          startDate: '2022-04',
          endDate: 'Present',
          current: true,
          bullets: [
            'Spearheaded enterprise design system consisting of 300+ accessible Figma components, typography scales, and tokenized primitives adopted across 5 product suites.',
            'Redesigned core workspace workflows, resulting in a 36% decrease in time-on-task and a 48-point lift in customer Net Promoter Score (NPS).',
            'Facilitated 50+ user testing sessions, moderated cognitive walkthroughs, and conducted card-sorting experiments to inform information architecture overhaul.',
            'Mentored 5 junior and mid-level product designers, driving quarterly design critiques and establishing company-wide design tokens governance.',
          ],
        },
        {
          id: 'exp-des-2',
          jobTitle: 'Senior UI/UX Designer',
          company: 'Kinetic Digital Agency',
          location: 'Austin, TX',
          startDate: '2018-09',
          endDate: '2022-03',
          current: false,
          bullets: [
            'Delivered responsive web and mobile product designs for Fortune 500 clients, generating an average 24% uplift in ecommerce checkout conversion rates.',
            'Engineered interactive micro-animations and physics-based tactile UI transitions in ProtoPie, reducing client review cycles by 40%.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-des-1',
          degree: 'B.F.A. in Visual Communication & Interaction Design',
          school: 'School of the Art Institute of Chicago (SAIC)',
          location: 'Chicago, IL',
          startDate: '2014-09',
          endDate: '2018-05',
          gpaOrHonors: 'First Class Honors (GPA: 3.92/4.0)',
          details: 'Recipient of the Annual SAIC Presidential Design Fellowship.',
        },
      ],
      skillGroups: [
        {
          id: 'sk-des-1',
          category: 'Design & Craft',
          items: ['Design Systems', 'Figma (Variables & AutoLayout)', 'UI/UX Architecture', 'Typography & Visual Hierarchy', 'Prototyping (ProtoPie)', 'Design Tokens'],
        },
        {
          id: 'sk-des-2',
          category: 'Research & Code',
          items: ['Usability Testing', 'User Journey Mapping', 'Information Architecture', 'WCAG 2.2 AA/AAA Accessibility', 'HTML5/CSS3', 'Tailwind CSS'],
        },
      ],
      projects: [
        {
          id: 'proj-des-1',
          name: 'Prism Open Design System Tokens',
          role: 'Creator & Maintainer',
          link: 'https://prismtokens.design',
          tools: ['Figma', 'TypeScript', 'Tokens Studio'],
          bullets: [
            'Published open-source multi-brand design tokens repository downloaded by 15,000+ designers and developers.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-des-1',
          name: 'Certified Usability Analyst (CUA)',
          issuer: 'Human Factors International',
          date: '2022',
        },
      ],
      design: {
        template: 'contemporary-studio',
        font: 'serif-display',
        spacing: 'spacious',
        accentColor: 'burgundy',
        showPhoto: false,
        showDividers: true,
        uppercaseHeaders: false,
      },
    },
  },
];
