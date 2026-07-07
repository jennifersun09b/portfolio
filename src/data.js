// ============================================================================
// EDIT YOUR CONTENT HERE
// Everything the site displays lives in this one file.
// ============================================================================

export const profile = {
  name: 'Zhuoyan Sun',
  initials: 'ZS',
  photo: '', // optional: drop an image URL or import here for a real photo
  roles: [
    'Data Scientist',
    'ML Engineer',
    'AI Agent Engineer',
    'Data Analyst',
  ],
  tagline:
    'AI in healthcare MSc at UCL with a biology foundation from Imperial. Build **clinical NLP pipelines**, **causal ML models**, and **AI agents** that turn complex data into decisions',
  location: 'London, UK',
  email: 'zhuoyansun41@gmail.com',
  phone: '+44 (0)7422 426924',
  availability: 'Open to Data Science / ML & AI Engineer roles',
  resume: `${import.meta.env.BASE_URL}resume1.pdf`,
  links: [
    { type: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/zhuoyan-jennifer-sun-8b6558297/' },
    { type: 'github', label: 'GitHub', url: 'https://github.com/jennifersun09b' },
  ],
}

export const about = {
  paragraphs: [
    "I'm a data scientist and AI engineer working at the intersection of **machine learning, AI, and healthcare**. Currently completing an **MSc in Health Data Science at UCL**, with a **BSc in Biological Sciences from Imperial College London** — a path that took me from bioinformatics to building ML and AI systems in healthcare.",
    "I like owning the full arc of a problem: wrangling messy, real-world data, engineering features, training and validating models, and shipping the results into something a human can actually act on. Lately that means **fine-tuning clinical language models**, designing **causal ML for preventive healthcare**, and building **multi-agent AI and RAG systems**.",
  ],
  stats: [
    { value: '5+', label: 'Projects' },
    { value: '3', label: 'Internships' },
    { value: '2', sup: 'nd', label: 'Top university' },
  ],
}

export const skills = [
  {
    category: 'ML & AI',
    color: 'violet',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Hugging Face Transformers', 'Causal ML'],
  },
  {
    category: 'AI Agents & NLP',
    color: 'pink',
    items: ['LLM Pipelines', 'Multi-agent Systems', 'ClinicalBERT', 'Prompt Engineering', 'RAG', 'Model Evaluation'],
  },
  {
    category: 'Data & Viz',
    color: 'cyan',
    items: ['pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Excel'],
  },
  {
    category: 'Languages & Tools',
    color: 'amber',
    items: ['Python', 'R', 'SQL', 'JavaScript', 'Linux Shell', 'Docker', 'Git', 'Streamlit', 'AWS'],
  },
]

export const projects = [
  {
    title: 'Patient Question Classification: TF-IDF vs. BERT',
    tag: 'AI / LLM',
    blurb:
      'Benchmarked traditional vs. transformer NLP for classifying **8,900+ patient questions** across **900+ diseases** (NHS-derived dataset). Pitted a **TF-IDF + kNN** baseline against fine-tuned **BERT, BioBERT, and PubMedBERT** — biomedical domain pre-training won, with **PubMedBERT reaching 0.63 accuracy** vs. 0.38 for the baseline.',
    tech: ['Hugging Face', 'PubMedBERT', 'PyTorch', 'scikit-learn', 'NLP'],
    repo: 'https://github.com/jennifersun09b/patient-question-classification',
    featured: true,
  },
  {
    title: 'Clinical NLP & LLM Pipeline for Radiology',
    tag: 'AI / LLM',
    blurb:
      'NLP pipeline using **Hugging Face Transformers** to parse radiology reports into structured features. Fine-tuned **ClinicalBERT-style models** for representation learning, and built an **evaluation framework** surfacing failure modes in vision-language systems.',
    tech: ['Hugging Face', 'ClinicalBERT', 'NLP', 'Model Eval'],
    featured: true,
  },
  {
    title: 'Causal ML for Cardiovascular Risk Simulation',
    tag: 'Machine Learning',
    blurb:
      'End-to-end ML pipeline on **longitudinal biobank data** with multi-timepoint features predicting cardiovascular risk. Built predictive and **causal models** for **individual-level counterfactual risk estimates**, with a simulation-driven webpage for preventive care.',
    tech: ['Causal ML', 'PyTorch', 'Simulation', 'Biobank'],
    featured: true,
  },
  {
    title: 'Jobwinner — Multi-Agent AI App',
    tag: 'AI / LLM',
    blurb:
      'A **multi-agent AI application** for the job search with differentiated agent personas, **evidence-backed reasoning**, and **live web search**. Maintained in its own repository.',
    tech: ['LLM Agents', 'Multi-agent', 'Web Search', 'Python'],
    repo: 'https://github.com/jennifersun09b/Jobwinner',
    featured: true,
  },
]

export const experience = [
  {
    role: 'Data Scientist (AI Agent)',
    org: 'DS Digital Technology',
    period: 'July 2026 — Present · Hangzhou, CN',
    points: [
      'Developed **AI Agent and RAG prototypes** for enterprise knowledge retrieval, workflow automation, and decision support.',
      'Implemented **document processing, embedding retrieval, prompt design, LLM generation, evaluation, and API integration**.',
      'Supported client-facing AI solution design through data analysis, metric definition, and cross-functional collaboration.',
    ],
  },
  {
    role: 'Associate Strategy Analyst',
    org: 'Ipsos Strategy3',
    period: 'May 2025 — Aug 2025 · Beijing, CN',
    points: [
      'Analyzed large-scale healthcare and consumer datasets from **100+ expert interviews** to extract quantitative trends and evidence-based market insights.',
      'Performed data-driven market sizing and predictive modeling to estimate **$20M revenue potential** across emerging health product segments.',
      'Translated analytical findings into business recommendations and executive dashboards with cross-functional data, research, and strategy teams.',
    ],
  },
  {
    role: 'Research Data Scientist',
    org: 'Westlake University',
    period: 'Sep 2024 — Dec 2024 · Hangzhou, CN',
    points: [
      'Applied Python and R to process and integrate multi-omics datasets exploring epigenetic changes in aging skin stem cells.',
      'Optimized bioinformatics pipelines, reducing computation time by **60%** and improving data reproducibility.',
      'Presented research findings to senior scientists, translating complex technical results into actionable biological insights.',
    ],
  },
]

export const education = [
  {
    degree: 'MSc Health Data Science (First-Class)',
    org: 'University College London',
    period: 'Sep 2025 — Present · London, UK',
    detail:
      'Core modules: Data Science & Statistics, Artificial Intelligence in Healthcare, Advanced Machine Learning for Healthcare, Advanced Data Science & Statistics.',
  },
  {
    degree: 'BSc Biological Sciences',
    org: 'Imperial College London',
    period: 'Sep 2021 — Jun 2024 · London, UK',
    detail:
      'Core modules: Mathematics, Bioinformatics, Programming & Statistics, Computational Omics, Integrative Systems Biology. Final project: molecular dynamics analysis of rare genetic variants in C9 and their membrane-binding mechanisms.',
  },
]
