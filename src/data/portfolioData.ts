export interface PersonalInfo {
  name: string;
  position: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  quote: string;
  profileImage: string;
}

export interface ProfessionalSummary {
  summary: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Skills {
  programming: string[];
  ml_ai: string[];
  frameworks: string[];
  data_engineering: string[];
  cloud_devops: string[];
}

export interface ProjectItem {
  title: string;
  description: string[];
  image: string;
  keyPoints?: string[]; // For additional details or metrics
}

export interface AchievementItem {
  title: string;
  issuer: string;
  year?: string;
  image: string;
  type: 'award' | 'medal' | 'star';
}

export interface PublicationItem {
  title: string;
  description: string[];
  image: string;
  type: 'paper' | 'book';
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  image: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  image: string;
  credentialId?: string;
  skills: string[];
  category: 'specialization' | 'course' | 'competition' | 'workshop';
}

export interface LabExperienceItem {
  title: string;
  institution: string;
  description: string[];
}

export interface VolunteeringItem {
  role: string;
  organization: string;
  duration: string;
  description: string[];
}


export interface PortfolioData {
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  experience: ExperienceItem[];
  skills: Skills;
  projects: ProjectItem[];
  achievements: AchievementItem[];
  publications: PublicationItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  labExperience?: LabExperienceItem[];
  volunteering?: VolunteeringItem[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Zulqarnain Ali",
    position: "Machine Learning Engineer & Data Scientist",
    location: "Bahawalpur, Punjab, Pakistan",
    phone: "+92 3367917487",
    email: "Zulqarnain445ali@gmail.com",
    linkedin: "zulqarnainalipk", // Prefix with https://linkedin.com/in/ in the component
    quote: "Transforming cutting-edge research into scalable, production-ready AI solutions",
    profileImage: "/images/profile_picture.png",
  },
  professionalSummary: {
    summary: "Results-driven Machine Learning Engineer specializing in healthcare AI and remote sensing, with multiple competition wins (Kaggle, Zindi) and peer-reviewed publications. Expert in deploying scalable ML solutions (PyTorch, TensorFlow) that deliver measurable business impact, including 40% faster inference times and 30%+ performance improvements over baseline solutions.",
  },
  experience: [
    {
      title: "Machine Learning Engineer",
      company: "Freelance",
      duration: "2023 - Present",
      description: [
        "Engineered custom machine learning models achieving 30%+ performance improvements over baseline solutions for diverse client requirements.",
        "Optimized model training pipelines reducing inference time by 40% through efficient data preprocessing and hyperparameter tuning.",
        "Implemented transfer learning techniques with pre-trained models accelerating development cycles by 60%.",
      ],
    },
    {
      title: "Database Operations Manager",
      company: "PRIME HONDA",
      duration: "Jun 2023 - Oct 2023",
      description: [
        "Spearheaded database restructuring initiative resulting in 25% improved data retrieval speed and 15% reduction in storage requirements.",
        "Implemented automated data validation protocols reducing error rates by 35% while ensuring accuracy and security.",
      ],
    },
  ],
  skills: {
    programming: ["Python", "C++", "SQL", "JavaScript", "HTML"],
    ml_ai: ["Deep Learning", "Transfer Learning", "NLP", "Computer Vision", "Model Deployment"],
    frameworks: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Sentinel-2"],
    data_engineering: ["ETL Pipelines", "Data Cleaning", "Feature Engineering", "Database Management"],
    cloud_devops: ["API Development", "Model Serving", "Performance Optimization"],
  },
  projects: [
    {
      title: "SepsisGuard: Early Detection of Pediatric Sepsis",
      description: [
        "ML solution for pediatric sepsis prediction with 6-hour early detection.",
        "0.983 AUC accuracy, reducing ICU mortality risks.",
        "Real-time risk scoring system for pediatric intensive care units.",
      ],
      image: "/images/sepsis_detection_project.jpg",
      keyPoints: ["0.983 AUC", "6-hour early detection", "Real-time scoring"]
    },
    {
      title: "Aerosol Optical Depth Estimation",
      description: [
        "Data pipeline combining Sentinel-2 satellite imagery with AERONET ground data.",
        "Achieved Pearson correlation of 0.964.",
        "Optimized cloud-masking algorithms reducing preprocessing time by 45%.",
      ],
      image: "/images/aerosol_depth_project.jpg",
      keyPoints: ["Pearson r = 0.964", "Sentinel-2 & AERONET", "45% faster preprocessing"]
    },
    {
      title: "PII Data Detection System",
      description: [
        "GDPR-compliant PII detection system with 95% accuracy.",
        "Automated data anonymization for 10,000+ records/minute.",
        "Compliance framework for FERPA, GDPR, and CCPA regulations.",
      ],
      image: "/images/pii_detection_project.png",
      keyPoints: ["95% Accuracy", "10k+ records/min", "GDPR/FERPA/CCPA"]
    },
  ],
  achievements: [
    { title: "Winner 1st Place", issuer: "TechQuest 2024 Data Science Competition (IUB BWP)", image: "/images/techquest_winner.jpg", type: 'award' },
    { title: "Bronze Medal", issuer: "BirdCLEF 2024 (Kaggle)", image: "/images/bronze_medal.png", type: 'medal' },
    { title: "Bronze Medal", issuer: "RSNA 2024 (Kaggle)", image: "/images/bronze_medal.png", type: 'medal' },
    { title: "GREEN Star", issuer: "Aerosol Optical Depth Estimation Competition (Solafune, Inc.)", image: "/images/green_star_award.jpg", type: 'star' },
    { title: "Gold Medal", issuer: "CGIAR Root Volume Estimation Competition (Zindi)", image: "/images/zindi_gold_medal.jpg", type: 'medal' },
    { title: "Bronze Medal", issuer: "ITU AI/ML in 5G Challenge (Zindi)", image: "/images/bronze_medal.png", type: 'medal' },
    { title: "Youth Laptop Award", issuer: "PM Shehbaz Sharif (Government of Pakistan)", image: "/images/pm_laptop_award.png", type: 'award' },
  ],
  publications: [
    {
      title: "A CatBoost-Based Approach for Aerosol Optical Depth Estimation Using Multi-Spectral Sentinel-2 Data",
      description: [
        "Pioneered novel AOD estimation method with Pearson r = 0.9640 ± 0.0460.",
        "Outperformed traditional methods for air quality assessment.",
      ],
      image: "/images/aod_paper_cover.webp",
      type: 'paper',
    },
    {
      title: "Cryptocurrency & Decentralization",
      description: [
        "Comprehensive guide explaining blockchain concepts.",
        "Analyzed Bitcoin and Ethereum implications for banking and supply chain.",
      ],
      image: "/images/crypto_book_cover.png",
      type: 'book',
    },
  ],
  education: [
    {
      degree: "Bachelor's Degree in Data Science",
      institution: "The Islamia University of Bahawalpur",
      duration: "2022 - 2026",
      image: "/images/iub_logo.png",
    },
    {
      degree: "Intermediate Pre-Engineering",
      institution: "The Lead College Fort Abbas",
      duration: "2020 - 2022",
      image: "/images/lead_college_logo.png",
    },
  ],
  certifications: [
    // Specializations
    { 
      title: "IBM Data Science Specialization", 
      issuer: "Coursera/IBM", 
      image: "/images/ibm_data_science_cert.png",
      credentialId: "4ZQ7NP9G5HEY",
      skills: ["Data Science", "Data Analysis"],
      category: "specialization"
    },
    { 
      title: "IBM AI Enterprise Workflow Specialization", 
      issuer: "IBM", 
      image: "/images/ibm_ai_workflow_cert.png",
      credentialId: "8A8DH8T4MWGM",
      skills: ["AI Systems", "ML Workflows"],
      category: "specialization"
    },
    { 
      title: "Google Business Intelligence Specialization", 
      issuer: "Google", 
      image: "/images/ibm_data_science_cert.png",
      credentialId: "VL48G9HYPZM3",
      skills: ["SQL", "BI Tools", "Data Modeling"],
      category: "specialization"
    },
    
    // Individual Courses
    { 
      title: "Machine Learning with Python (with Honors)", 
      issuer: "Coursera", 
      image: "/images/ibm_advanced_ds_cert.png",
      credentialId: "EZFXDNUD4WYT",
      skills: ["Machine Learning", "AI", "Data Science"],
      category: "course"
    },
    { 
      title: "Supervised Machine Learning: Regression and Classification", 
      issuer: "DeepLearning.AI/Stanford", 
      image: "/images/ibm_data_science_cert.png",
      credentialId: "2L23PGSLXULH",
      skills: ["ML", "Classification", "Regression"],
      category: "course"
    },
    { 
      title: "Understanding Research Methods", 
      issuer: "SOAS University of London", 
      image: "/images/wq_ads_lab_cert.png",
      credentialId: "Y941TVF49ZIS",
      skills: ["Research Design", "Qualitative & Quantitative"],
      category: "course"
    },
    { 
      title: "Data Visualization with Python", 
      issuer: "Coursera", 
      image: "/images/ibm_data_science_cert.png",
      credentialId: "J6YL7Y3T4E5V",
      skills: ["Visualization", "Matplotlib", "Seaborn"],
      category: "course"
    },
    { 
      title: "Data Analysis with Python", 
      issuer: "Coursera", 
      image: "/images/ibm_advanced_ds_cert.png",
      credentialId: "PTLPUA7K5Q86",
      skills: ["Pandas", "Numpy", "EDA"],
      category: "course"
    },
    { 
      title: "Calculus for ML and Data Science", 
      issuer: "DeepLearning.AI", 
      image: "/images/ibm_data_science_cert.png",
      credentialId: "S55JYQZ2UZTN",
      skills: ["Mathematics for ML"],
      category: "course"
    },
    { 
      title: "Linear Algebra for ML and Data Science", 
      issuer: "DeepLearning.AI", 
      image: "/images/wq_ads_lab_cert.png",
      credentialId: "JCND9MGTCVHS",
      skills: ["Linear Algebra", "Vectors", "Matrices"],
      category: "course"
    },
    { 
      title: "Databases and SQL for Data Science", 
      issuer: "IBM/Coursera", 
      image: "/images/ibm_advanced_ds_cert.png",
      credentialId: "P7TEKPJQN2MY",
      skills: ["SQL", "IBM Db2"],
      category: "course"
    },
    { 
      title: "Introduction to Deep Learning with PyTorch", 
      issuer: "DataCamp", 
      image: "/images/ibm_data_science_cert.png",
      skills: ["Deep Learning", "PyTorch"],
      category: "course"
    },
    
    // Labs and Workshops
    { 
      title: "Applied AI Lab: Deep Learning for Computer Vision", 
      issuer: "WorldQuant University", 
      image: "/images/wq_ads_lab_cert.png",
      skills: ["Computer Vision", "Deep Learning"],
      category: "workshop"
    },
    { 
      title: "Applied Data Science Lab", 
      issuer: "WorldQuant University", 
      image: "/images/wq_ads_lab_cert.png",
      skills: ["Data Science", "SQL", "Data Management"],
      category: "workshop"
    },
    { 
      title: "Summer Analytics 2024", 
      issuer: "IIT Guwahati", 
      image: "/images/ibm_data_science_cert.png",
      skills: ["ML Algorithms", "Model Tuning"],
      category: "workshop"
    },
    
    // Competition Awards
    { 
      title: "Certificate of Achievement – BRONZE Star Recipient", 
      issuer: "Solafune Inc.", 
      image: "/images/bronze_medal.png",
      skills: ["ML", "Segmentation", "Neural Networks"],
      category: "competition"
    },
    { 
      title: "Certificate of Achievement – GREEN Star Recipient", 
      issuer: "Solafune Inc.", 
      image: "/images/green_star_award.jpg",
      skills: ["ML", "Climate Modeling", "Data Analysis"],
      category: "competition"
    },
    { 
      title: "BirdCLEF 2024 Bronze Medal", 
      issuer: "Kaggle", 
      image: "/images/bronze_medal.png",
      skills: ["ML Competitions", "Modeling"],
      category: "competition"
    },
    { 
      title: "Home Credit - Credit Risk Model Stability (Bronze)", 
      issuer: "Kaggle", 
      image: "/images/bronze_medal.png",
      skills: ["Credit Risk", "Data Science"],
      category: "competition"
    },
    { 
      title: "RSNA 2024 Bronze Medal – Lumbar Spine Classification", 
      issuer: "Kaggle", 
      image: "/images/bronze_medal.png",
      skills: ["Medical Imaging", "CV", "ML"],
      category: "competition"
    },
  ],
  labExperience: [
    {
      title: "Applied Data Science Lab",
      institution: "WorldQuant University",
      description: [
        "Executed 8 end-to-end projects encompassing data access, ETL pipelines, and model building.",
        "Developed visualization dashboards with 95% comprehension rate.",
      ],
    },
    {
      title: "Applied AI Lab",
      institution: "WorldQuant University",
      description: [
        "Completed 6 advanced projects utilizing PyTorch for image classification, object detection, and generative modeling.",
        "Built and fine-tuned neural network architectures with transfer learning.",
      ],
    },
  ],
  volunteering: [
    {
      role: "Fundraising Coordinator",
      organization: "Itthad Business City",
      duration: "Jun 2023 - Oct 2023",
      description: [
        "Orchestrated fundraising events generating 40% increase in donations.",
        "Coordinated food distribution logistics for 500+ community members weekly.",
      ],
    },
  ]
};
