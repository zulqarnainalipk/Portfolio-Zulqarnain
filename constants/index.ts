// Nav Links
export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'experience', title: 'Experience' },
  { id: 'tech', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'research', title: 'Research' },
  { id: 'awards', title: 'Awards' },
  { id: 'community', title: 'Community' },
  { id: 'contact', title: 'Contact' },
]

// Technologies
export const technologies = [
  {
    name: 'Python',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  },
  {
    name: 'C++',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'SQL',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
  },
  {
    name: 'JavaScript',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
  },
  {
    name: 'PyTorch',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg',
  },
  {
    name: 'TensorFlow',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
  },
  {
    name: 'Scikit-learn',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/scikitlearn/scikitlearn-original.svg',
  },
  {
    name: 'NumPy',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg',
  },
  {
    name: 'Pandas',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg',
  },
  {
    name: 'HTML5',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
  },
  {
    name: 'Keras',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/keras/keras-original.svg',
  },
  {
    name: 'Matplotlib',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/matplotlib/matplotlib-original.svg',
  },
]

// Experiences
export const experiences = [
  {
    title: 'Python Developer',
    companyName: 'Shipd',
    icon: '/assets/shipd.svg',
    iconBg: '#050816',
    date: 'Jun 2025 – Present',
    points: [
      'Develop production-grade Python solutions for AI model training on elite invite-only platform',
      'Engineer high-performance algorithms serving as benchmarks for coding proficiency evaluation',
      'Ranked among top 5% contributors for code quality and complex problem-solving capabilities',
      'Collaborate with global teams establishing best practices for scalable Python codebases',
    ],
  },
  {
    title: 'Machine Learning Engineer',
    companyName: 'Seath General Trading Company',
    icon: '/assets/seath.svg',
    iconBg: '#050816',
    date: 'Jan 2025 – Aug 2025',
    points: [
      'Developed and deployed machine learning models to optimize supply chain and procurement processes',
      'Improved efficiency and decision-making through advanced analytics',
      'Collaborated with cross-functional teams to transform data into actionable insights',
      'Implemented scalable ML solutions using Python, TensorFlow, and related tools',
      'Ensured compliance with government data standards',
    ],
  },
  {
    title: 'Database Operations Manager',
    companyName: 'PRIME HONDA',
    icon: '/assets/honda.svg',
    iconBg: '#050816',
    date: 'Jun 2023 – Oct 2023',
    points: [
      'Spearheaded database restructuring initiative, improving retrieval speed by 25%',
      'Implemented automated validation protocols, reducing error rates by 35%',
      'Managed database operations and optimization for automotive dealership',
    ],
  },
]

// Education
export const education = [
  {
    degree: 'Bachelor of Science in Data Science',
    school: 'The Islamia University of Bahawalpur, Pakistan',
    date: '2022 – 2026',
    gpa: 'GPA: 3.60',
    highlights: [
      'Emerging Researcher Award (2025)',
      'Winner, TechQuest 2024 Data Science Competition',
    ],
  },
]

// Projects
export const projects = [
  {
    title: 'Zeffy: Advanced AutoML Pipeline',
    description: 'An automated ML pipeline integrating feature engineering, hyperparameter tuning, and ensembling. Simplified high-performance model development with a modular Python-based architecture.',
    tags: [
      { name: 'Python', color: 'blue-text-gradient' },
      { name: 'AutoML', color: 'green-text-gradient' },
      { name: 'Scikit-learn', color: 'pink-text-gradient' },
    ],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    githubLink: 'https://github.com/zulqarnainalipk/zeffy',
  },
  {
    title: 'SepsisGuard: Pediatric Early Detection System',
    description: 'ML system predicting pediatric sepsis 6 hours before diagnosis (AUC: 0.983). Designed interpretable Random Forest model for real-time PICU deployment.',
    tags: [
      { name: 'Python', color: 'blue-text-gradient' },
      { name: 'Healthcare AI', color: 'green-text-gradient' },
      { name: 'Random Forest', color: 'pink-text-gradient' },
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    githubLink: 'https://github.com/zulqarnainalipk/sepsisguard',
  },
  {
    title: 'Aerosol Optical Depth Estimation',
    description: 'Combined Sentinel-2 imagery with AERONET data achieving 0.964 Pearson correlation. Developed CatBoost-based methodology for atmospheric aerosol monitoring.',
    tags: [
      { name: 'Python', color: 'blue-text-gradient' },
      { name: 'Remote Sensing', color: 'green-text-gradient' },
      { name: 'CatBoost', color: 'pink-text-gradient' },
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    githubLink: 'https://github.com/zulqarnainalipk/aerosol-estimation',
  },
  {
    title: 'PII Data Detection',
    description: 'Automated ML/NLP pipeline to detect and anonymize personally identifiable information in educational datasets. Ensured compliance with FERPA, GDPR, and CCPA.',
    tags: [
      { name: 'NLP', color: 'blue-text-gradient' },
      { name: 'Python', color: 'green-text-gradient' },
      { name: 'Data Privacy', color: 'pink-text-gradient' },
    ],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    githubLink: 'https://github.com/zulqarnainalipk/pii-detection',
  },
]

// Research Publications
export const research = [
  {
    title: 'Intelligence Without Consciousness: the Rise of the IIT Zombies',
    authors: 'Zulqarnain Ali',
    year: 2025,
    journal: 'Preprint',
    link: 'https://doi.org/10.20944/preprints202510.1665.v2',
    abstract: 'Exploring the implications of systems that exhibit intelligence without subjective experience, analyzing the philosophical and practical implications for AI development.',
  },
  {
    title: 'Quantifying Consciousness in Transformer Architectures: A Comprehensive Framework Using Integrated Information Theory and φ Approximation Methods',
    authors: 'Zulqarnain Ali',
    year: 2025,
    journal: 'Preprint',
    link: 'https://doi.org/10.20944/preprints202508.1770.v1',
    abstract: 'A novel framework for measuring consciousness in transformer models using Integrated Information Theory, providing quantitative metrics for AI consciousness assessment.',
  },
  {
    title: 'A CatBoost-Based Approach for Aerosol Optical Depth Estimation Using Multi-Spectral Sentinel-2 Data',
    authors: 'Zulqarnain Ali',
    year: 2024,
    journal: 'Journal of Remote Sensing Applications',
    link: 'https://acceleron.org.in/index.php/aaj/article/view/231',
    abstract: 'Developing a novel CatBoost-based methodology for estimating aerosol optical depth from satellite data, contributing to environmental monitoring and climate research.',
  },
]

// Awards Categories
export const awardCategories = [
  {
    id: 'kaggle',
    title: 'Kaggle Achievements',
    description: 'Kaggle Master with multiple competition medals and notebook expertise',
  },
  {
    id: 'competitive',
    title: 'Competition Medals',
    description: 'Achievements in data science and machine learning competitions',
  },
  {
    id: 'academic',
    title: 'Academic Awards',
    description: 'Recognitions for academic excellence and university achievements',
  },
  {
    id: 'research',
    title: 'Research Awards',
    description: 'Awards for research contributions and innovations',
  },
]

// Awards and Achievements
export const awards = [
  // Kaggle Achievements
  {
    category: 'kaggle',
    items: [
      {
        title: 'Kaggle Master',
        organization: 'Kaggle',
        year: 2024,
        description: 'Ranked top 1% globally among 100,000+ data scientists. Notebook Master Rank: 148, Competition Expert Rank: 1616.',
        link: 'https://www.kaggle.com/johndoe2011',
      },
	        {
        title: 'Bronze Medal',
        organization: 'NeurIPS - Open Polymer Prediction 2025',
        year: 2025,
        description: 'Achieved bronze medal in NeurIPS challange to accelerate sustainable materials research.',
        link: 'https://www.kaggle.com/certification/competitions/johndoe2011/neurips-open-polymer-prediction-2025',
      },
	  
      {
        title: 'Bronze Medal',
        organization: 'Jane Street Market Prediction',
        year: 2025,
        description: 'Achieved bronze medal in prestigious quantitative finance ML competition.',
        link: 'https://www.kaggle.com/certification/competitions/johndoe2011/jane-street-real-time-market-data-forecasting',
      },
      {
        title: 'Bronze Medal',
        organization: 'RSNA 2024 Abdominal Trauma Detection',
        year: 2024,
        description: 'Ranked 179th out of 1874 participants in medical imaging competition.',
        link: 'https://www.kaggle.com/certification/competitions/johndoe2011/rsna-2024-lumbar-spine-degenerative-classification',
      },
      {
        title: 'Bronze Medal',
        organization: 'BirdCLEF 2024',
        year: 2024,
        description: 'Achieved bronze in bird species classification using audio recognition.',
        link: 'https://www.kaggle.com/certification/competitions/zulqarnainalipk/birdclef-2024',
      },
      {
        title: 'Bronze Medal',
        organization: 'Home Credit Default Risk',
        year: 2024,
        description: 'Credit default prediction challenge for financial inclusion.',
        link: 'https://www.kaggle.com/certification/competitions/zulqarnainalipk/home-credit-credit-risk-model-stability',
      },
      {
        title: 'Bronze Medal',
        organization: 'LLM - Detect AI Generated Text',
        year: 2024,
        description: 'NLP competition for detecting AI-generated written content.',
        link: 'https://www.kaggle.com/certification/competitions/zulqarnainali/llm-detect-ai-generated-text',
      },
    ],
  },
  // Competition Medals
  {
    category: 'competitive',
    items: [
      {
        title: 'Gold Medal',
        organization: 'CGIAR Root Volume Estimation Challenge',
        year: 2023,
        description: 'Won gold medal in agricultural data science competition on Zindi.',
        link: 'https://zindi.africa/zc/M5H9xQr',
      },
	   {
        title: 'Gold Medal',
        organization: 'Classification for Landslide Detection',
        year: 2023,
        description: 'Won gold medal in reliable landslide detection competition on Zindi.',
        link: 'https://zindi.africa/zc/JZHxLQw',
      },  
      {
        title: 'Gold Medal',
        organization: 'TechQuest 2024 Data Science Competition',
        year: 2024,
        description: '1st Place winner in university-wide data science competition at IUB.',
        link: 'https://www.linkedin.com/feed/update/urn:li:activity:7255239660669415424/',
      },
      {
        title: 'GREEN Star',
        organization: 'Solafune Aerosol Estimation',
        year: 2024,
        description: 'Top ranking in satellite-based atmospheric aerosol monitoring competition.',
        link: 'https://solafune.com/competitions/ca6ee401-eba9-4f7d-95e6-d1b378a17200',
      },
      {
        title: 'Bronze Star',
        organization: 'Solafune Field Area Segmentation',
        year: 2024,
        description: 'Agricultural field segmentation from satellite imagery.',
        link: 'https://solafune.com/competitions/d91572d9-1680-4b9e-b372-25e71093f81a',
      },
      {
        title: 'Bronze Medal',
        organization: 'ITU AI/ML 5G Challenge',
        year: 2025,
        description: 'Telecommunications ML competition on Zindi platform.',
        link: 'https://zindi.africa/zc/3zHdXke',
      },
      {
        title: 'Bronze Medal',
        organization: 'Lacuna Solar Survey Challenge',
        year: 2023,
        description: 'Solar energy prediction from satellite data.',
        link: 'https://zindi.africa/zc/kjHxjwV',
      },
      {
        title: 'Bronze Medal',
        organization: 'IBM Skills Build Hydropower Climate Optimisation Challenge',
        year: 2024,
        description: 'Forecast climate and operational effects on load generation for micro-hydropower plants in off-grid communities.',
        link: 'https://zindi.africa/zc/zdHxjjn',
      },
    ],
  },
  // Academic Awards
  {
    category: 'academic',
    items: [
      {
        title: 'Youth Laptop Award',
        organization: 'Government of Pakistan',
        year: 2023,
        description: 'Issued by PM Shehbaz Sharif for academic excellence.',
        link: 'https://www.linkedin.com/in/zulqarnainalipk/details/honors/',
      },
      {
        title: '1st Position',
        organization: 'Tech Quest 2024 – Winner, IUB',
        year: 2024,
        description: 'First place in university-wide data science olympiad.',
        link: 'https://www.linkedin.com/posts/zulqarnainalipk_%F0%9D%90%96%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%A5-%F0%9D%90%B0%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%A5-%F0%9D%90%B0%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%A5-%F0%9D%90%86%F0%9D%90%AE%F0%9D%90%9E%F0%9D%90%AC-activity-7255239660669415424-Io7o?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELXOJQBtClsBYVTF4rZ3173uNbWSh7mnN4',
      },
      {
        title: ' Position Holder Grant',
        organization: 'Department of data-science ,IUB',
        year: 2024,
        description: 'Second place in competitive programming contest at IUB.',
        link: 'https://www.linkedin.com/in/zulqarnainalipk/details/honors/',
      },
    ],
  },
  // Research Awards
  {
    category: 'research',
    items: [
      {
        title: 'Emerging Researcher Award',
        organization: 'Data Science Department, IUB',
        year: 2025,
        description: 'Recognized for outstanding contributions to data science research and innovation.',
        link: 'https://www.linkedin.com/posts/zulqarnainalipk_ai-machinelearning-medicalai-activity-7335672263825903616-IDRH',
      },
    ],
  },
]

// Certifications
export const certifications = [
  {
    title: 'Google Business Intelligence Specialization',
    issuer: 'Google',
    link: 'https://www.linkedin.com/in/zulqarnainalipk/details/certifications/',
  },
  {
    title: 'IBM Data Science Specialization',
    issuer: 'IBM',
    link: 'https://www.linkedin.com/in/zulqarnainalipk/details/certifications/',
  },
  {
    title: 'IBM AI Enterprise Workflow Specialization',
    issuer: 'IBM',
    link: 'https://www.linkedin.com/in/zulqarnainalipk/details/certifications/',
  },
  {
    title: 'Applied Data Science Lab',
    issuer: 'WorldQuant University',
    link: 'https://www.linkedin.com/in/zulqarnainalipk/details/certifications/',
  },
  {
    title: 'Applied AI Lab',
    issuer: 'WorldQuant University',
    link: 'https://www.linkedin.com/in/zulqarnainalipk/details/certifications/',
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    link: 'https://www.linkedin.com/in/zulqarnainalipk/details/certifications/',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University (Coursera)',
    link: 'https://www.linkedin.com/in/zulqarnainalipk/details/certifications/',
  },

]

// Volunteer Experience
interface Volunteer {
  title: string
  organization: string
  date: string
  description: string
}

export const volunteer: Volunteer[] = [
  {
    title: 'AI/ML Mentor',
    organization: 'topmate.io/zulqarnain_ali',
    date: '2023 - Present',
    description: 'Mentoring students in AI/ML concepts and helping them build their first ML models. Providing guidance on portfolio building and career development in the ML field.',

  },
  {
    title: 'Fundraising volunteer',
    organization: 'Itthad Business city',
    date: 'Jun 2023 - Oct 2023',
    description: 'I organized events and reached out to donors to secure vital funds. Additionally, I coordinated food distribution efforts, ensuring efficient delivery to the community..',

  },
]

// Topmate Reviews
export const topmateReviews = [
  {
    id: 1,
    reviewer: 'Ahmed Khan',
    role: 'Data Science Student',
    review: 'Zulqarnain helped me understand neural networks from scratch. His patience and structured approach made complex concepts easy to grasp. Highly recommended for ML mentorship!',
    rating: 5,
    date: '2024',
  },
  {
    id: 2,
    reviewer: 'Sarah Chen',
    role: 'Software Engineer',
    review: 'Got excellent guidance on building my first ML project. Zulqarnain provided valuable insights on model selection and optimization techniques that improved my model performance significantly.',
    rating: 5,
    date: '2024',
  },
  {
    id: 3,
    reviewer: 'Mohammad Ali',
    role: 'Researcher',
    review: 'His expertise in computer vision helped me complete my research project on time. Great mentor who truly cares about his mentees success.',
    rating: 5,
    date: '2025',
  },
  {
    id: 4,
    reviewer: 'Fatima Begum',
    role: 'ML Enthusiast',
    review: 'Amazing mentorship session! Learned practical tips for Kaggle competitions and portfolio building. Very knowledgeable and supportive.',
    rating: 5,
    date: '2025',
  },
  {
    id: 5,
    reviewer: 'Omar Farooq',
    role: 'Computer Science Student',
    review: 'Helped me land my first internship by guiding me through interview preparation and project showcase. Grateful for his mentorship!',
    rating: 5,
    date: '2025',
  },
]

// Social Links
export const socialLinks = {
  github: 'https://github.com/zulqarnainalipk',
  linkedin: 'https://linkedin.com/in/zulqarnainalipk',
  kaggle: 'https://www.kaggle.com/johndoe2011',
  instagram: 'www.instagram.com/zulqarnain_a_li',
  linktree: 'https://linktree.com/zulqarnainalipk',
  email: 'mailto:zulqarnain445ali@gmail.com',
  phone: 'tel:+923367917487',
}

// Contact Info
export const contactInfo = {
  email: 'zulqarnain445ali@gmail.com',
  phone: '+92 336 7917487',
  location: 'Bahawalpur, Pakistan',
  linkedin: 'linkedin.com/in/zulqarnainalipk',
  github: 'github.com/zulqarnainalipk',
}
