// English content of the portfolio. Mirrors data.js (Spanish): if you change something there, change it here too.
// Contact details, banner and publication references are shared with data.js.

(() => {
  const ES = window.PORTFOLIO;

  window.PORTFOLIO_EN = {
    profile: {
      ...ES.profile,
      role: 'Data Scientist · AI/ML Engineer · Co-founder',
      location: 'Valencia, Spain',
      status: 'Building custom AI solutions',
    },

    banner: ES.banner,
    bannerLabel: ES.bannerLabel,

    about: [
      "Hi, I'm **Pedro**. I've been coding since I was 14, and today I do what I enjoy most: turning data into decisions with **artificial intelligence and machine learning**.",
      "I hold a **BSc in Data Science** with **several distinctions (Matrícula de Honor)** and a **Master's in Business Process Planning and Management**, both from the **University of Valencia**. In a project with **Kongsberg** I detected faulty readings from **underwater fishing sensors** and estimated their correct values. My bachelor's thesis on ML and cardiac **digital twins** was published at **CASEIB** and **Computing in Cardiology (CinC)**.",
      "Right now I'm fully focused on **Nódicus**, the custom AI consultancy I co-founded with a friend, where we build AI and machine learning solutions tailored to each client. Type `company` or `projects` to learn more.",
    ],

    timeline: [
      { when: '2017', title: 'First lines of code', text: "I start coding at 14, out of curiosity. I haven't stopped since." },
      { when: '2021', title: 'BSc in Data Science', text: 'Statistics, programming and machine learning at the University of Valencia. I finish first year with a **GPA above 9.5/10**.' },
      { when: '2022', title: 'Web application developer', text: 'My first industry job, at **PKSIAM**: custom web applications for different clients, combined with my studies until 2025.' },
      { when: '2023–24', title: 'Erasmus in Norway', text: 'I spend my third year in Norway while still working remotely.' },
      { when: '2024–25', title: 'Thesis: ML and digital twins', text: 'My bachelor’s thesis is published at **CASEIB** and **Computing in Cardiology**. See `publications`.' },
      { when: '2025', title: 'Project with Kongsberg', text: 'Underwater fishing sensor data: detecting faulty readings and estimating the correct value. See `projects`.' },
      { when: '2025–26', title: "Master's in Business Process Planning and Management", text: 'At the University of Valencia, alongside the Kongsberg project.' },
      { when: 'Jun 2026 → now', title: 'I co-found Nódicus', text: 'I leave the Kongsberg project to start, with a friend, a custom AI and ML consultancy. See `company`.', now: true },
    ],

    company: {
      ...ES.company,
      since: 'Jun 2026 → now',
      tagline: 'Custom AI and machine learning consultancy',
      story: 'I started it with a friend in June 2026, after leaving the Kongsberg project, to bring AI and machine learning to companies with concrete problems. Some of our work is in `projects`.',
      services: [
        '**Custom AI**: solutions designed for each client’s specific problem.',
        '**Machine learning**: predictive models trained on the client’s own data.',
        '**Data**: cleaning, preparing and getting value out of information.',
      ],
    },

    experience: [
      {
        file: 'nodicus.md',
        title: 'Co-founder',
        org: 'Nódicus',
        when: 'Jun 2026 → now',
        sub: 'Custom AI and machine learning consultancy',
        bullets: [
          'Founded with a friend after leaving the Kongsberg project.',
          'We design custom AI solutions and ML models for each client.',
          '**Computer vision** project that verifies oncology drugs are prepared correctly: dataset generation and model training.',
        ],
        tags: ['AI', 'Machine Learning', 'LLMs', 'Computer vision', 'Consulting', 'Entrepreneurship'],
      },
      {
        file: 'kongsberg.md',
        title: 'Data Scientist',
        org: 'Kongsberg',
        when: '2025 → Jun 2026',
        sub: 'Underwater fishing sensor data',
        bullets: [
          'Cleaning and preparing sensor data.',
          'Models to detect when an incoming reading is faulty.',
          'Estimating the correct value from previous readings and the rest of the data.',
          'Combined with my master’s degree.',
        ],
        tags: ['Time series', 'Anomaly detection', 'Data imputation', 'Machine Learning'],
      },
      {
        file: 'pksiam.md',
        title: 'Web application developer',
        org: 'PKSIAM',
        when: '2022 → 2025',
        sub: 'Custom web applications for different clients',
        bullets: [
          'The full cycle of each project: **gathering requirements with the client**, managing the **database**, development and **deployment to production**.',
          'My first professional job, combined with my degree.',
          'I kept working remotely during my Erasmus in Norway.',
        ],
        tags: ['C#', '.NET', 'SQL', 'Web applications', 'Deployment', 'Client-facing'],
      },
    ],

    education: [
      {
        file: 'masters.md',
        title: "Master's in Business Process Planning and Management",
        org: 'University of Valencia',
        when: '2025 – 2026',
        bullets: ['Taken alongside the Kongsberg project.'],
      },
      {
        file: 'erasmus-norway.md',
        title: 'Erasmus',
        org: 'Norway',
        when: '2023 – 2024',
        bullets: [
          'Third year of my degree in Norway.',
          'Combined with my remote job as a web developer.',
        ],
        tags: ['International', 'English', 'Remote work'],
      },
      {
        file: 'bsc-data-science.md',
        title: 'BSc in Data Science',
        org: 'University of Valencia',
        when: '2021 – 2025',
        bullets: [
          'Average grade: **8.8/10**.',
          'Thesis on machine learning and digital twins, **published at CASEIB and CinC**.',
        ],
        tags: ['Statistics', 'Machine Learning', 'Programming'],
      },
    ],

    projects: [
      {
        id: 'vision',
        file: 'vision-oncology-drugs.md',
        short: 'A second pair of eyes: AI checks that the preparation is done right, for extra safety.',
        title: 'Computer vision to verify oncology drugs',
        org: 'Nódicus',
        when: 'Jun 2026 → now',
        summary: 'A computer-vision **assistance** system that **verifies the professional prepares oncology drugs correctly**. It doesn’t replace them: it adds an extra layer of **safety**. Besides the model, we generate the dataset it learns from.',
        flow: ['The professional prepares the drug', 'Computer vision', 'Verification', 'More safety'],
        sections: [
          {
            title: 'Context',
            text: 'Preparing oncology drugs is a delicate process where a mistake can have serious consequences. A person does it, and any additional check adds safety.',
          },
          {
            title: 'What it does',
            bullets: [
              'It works as an **assistant**: the professional keeps preparing the drug and the AI **checks it is done right**.',
              'It provides a **second check** that strengthens the safety of the process.',
            ],
          },
          {
            title: 'What we do',
            bullets: [
              '**We generate the dataset**: we define what data the model needs and create it.',
              '**We train and evaluate** the computer vision model, iterating on both data and model.',
            ],
          },
          {
            title: 'Why start with the data',
            text: 'A vision model is only as good as the data it learns from. Owning the dataset too lets us control quality end to end, instead of relying on data that doesn’t fit the problem.',
          },
        ],
        tags: ['Computer vision', 'Dataset creation', 'Deep learning', 'Healthcare'],
        links: [{ label: 'about Nódicus', cmd: 'company' }],
      },
      {
        id: 'warranty',
        file: 'llm-truck-warranty.md',
        short: 'An LLM proposes which tasks match each breakdown out of 10-15k codes. It used to be done by hand.',
        title: 'LLM + retrieval for truck warranty claims',
        org: 'Nódicus',
        when: 'Jun 2026 → now',
        summary: 'Given a **truck breakdown**, the system proposes the matching **task codes** from a catalogue of **10,000 to 15,000 options**. It is the step required to **claim the warranty**, and until now it was done by hand.',
        flow: ['Truck breakdown', 'The LLM proposes codes', 'If it misses: smarter search', 'Codes for the warranty'],
        sections: [
          {
            title: 'The problem',
            text: 'To get paid under warranty, each breakdown has to be classified and matched to the right tasks from a catalogue of thousands of codes. Someone had to do it by hand, breakdown by breakdown: slow, repetitive work.',
          },
          {
            title: 'The solution',
            bullets: [
              'An **LLM** interprets the breakdown and **proposes the matching task codes**.',
              'If the proposal misses, the system switches to a **smarter search** over the catalogue to find the right code.',
              'The resulting codes are the ones used to **claim the warranty**.',
            ],
          },
          {
            title: 'Why LLM + retrieval',
            text: 'With thousands of possible codes, an LLM can’t “know” the catalogue. Combining it with search over the real data grounds its answers in options that actually exist, and the fallback search covers the cases where the first proposal fails.',
          },
        ],
        tags: ['LLMs', 'Retrieval', 'Classification', 'Process automation'],
        links: [{ label: 'about Nódicus', cmd: 'company' }],
      },
      {
        id: 'kongsberg',
        file: 'kongsberg-data.md',
        short: 'Models that detect when an underwater fishing sensor reading is faulty and estimate the correct value.',
        title: 'Reliable data from underwater fishing sensors',
        org: 'Kongsberg',
        when: '2025 → Jun 2026',
        summary: 'A project with **Kongsberg**, the Norwegian technology group, on data from **underwater fishing sensors**. The goal: know when an incoming reading is **faulty** and **what value it should have**, based on previous readings and the rest of the data.',
        flow: ['A reading arrives', 'Error detection', 'Estimating the correct value', 'Reliable series'],
        sections: [
          {
            title: 'Context',
            text: 'Underwater sensors operate in a harsh environment and the data they send is not always reliable. A faulty reading taken as valid contaminates everything built on top of it.',
          },
          {
            title: 'What I did',
            bullets: [
              '**Cleaning and preparing** the sensor data.',
              '**Faulty data detection**: models that decide whether an incoming reading is reliable.',
              '**Estimating the correct value**: predicting what the reading should have been from **previous readings** and the **rest of the data**.',
            ],
          },
          {
            title: 'Why it matters',
            text: 'Detecting the error is only half the job: to keep the data useful it has to be replaced with a plausible value. Using both the sensor’s history and the rest of the data lets you estimate it with context, not just by extending the trend.',
          },
          {
            title: 'In parallel',
            text: 'I combined it with my **Master’s in Business Process Planning and Management** and left in June 2026 to co-found **Nódicus**.',
          },
        ],
        tags: ['Time series', 'Anomaly detection', 'Data imputation', 'Underwater sensors', 'Machine Learning'],
        links: [{ label: 'see timeline', cmd: 'timeline' }],
      },
    ],

    publications: [
      { ...ES.publications[0], note: 'International version, in English, of my bachelor’s thesis work.' },
      { ...ES.publications[1], details: 'Zaragoza, 19-21 Nov 2025, pp. 760-763 · ISBN 978-84-09-80259-3', note: 'Based on my bachelor’s thesis (in Spanish).' },
    ],

    skillsLead: 'LLMs and RAG · computer vision · sensor data',

    skills: [
      { group: 'languages', items: ['Python', 'SQL', 'C#'] },
      { group: 'ML', items: ['PyTorch', 'scikit-learn', 'XGBoost', 'pandas', 'NumPy'] },
      { group: 'LLMs', items: ['RAG', 'Embeddings', 'Vector databases', 'LangChain', 'Agents', 'Local LLMs', 'LLM evaluation'] },
      { group: 'vision', items: ['OpenCV', 'Dataset creation', 'Data augmentation', 'Synthetic data'] },
      { group: 'data', items: ['Cleaning', 'Anomaly detection', 'Imputation', 'Time series'] },
      { group: 'deployment', items: ['Docker', 'FastAPI', 'CI/CD', 'Git', 'Linux', 'GCP (basic)'] },
      { group: 'business', items: ['AI consulting', 'Client requirements', 'Project management', 'Spanish (native)', 'English'] },
    ],

    contactIntro: 'Got a problem that data or AI could solve? Drop me a line and let’s talk.',

    neofetch: [
      ['OS', 'BSc in Data Science · GPA 8.8/10'],
      ['Host', 'Co-founder @ Nódicus'],
      ['Uptime', 'coding since age 14'],
      ['Kernel', 'Python · C# · SQL'],
      ['Packages', 'machine learning, LLMs, computer vision, digital twins'],
      ['Papers', 'CinC 2025 · CASEIB 2025'],
      ['Shell', 'portfolio-sh 1.0'],
    ],
  };
})();
