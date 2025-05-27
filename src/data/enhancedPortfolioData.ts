// Enhanced Portfolio Data Structure with Complete Project Information

export interface EnhancedProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  technologies: string[];
  metrics: {
    [key: string]: string | number;
  };
  github?: string;
  demo?: string;
  kaggle?: string;
  image: string;
  category: 'AutoML' | 'Healthcare' | 'Computer Vision' | 'Remote Sensing' | 'NLP' | 'Audio Processing' | 'Privacy';
  featured: boolean;
  impact: string;
  duration: string;
  keyAchievements: string[];
  relatedSkills: string[];
}

export interface EnhancedSkillCategory {
  id: string;
  name: string;
  skills: string[];
  color: string;
  icon: string;
  proficiency: number; // 0-100
  connections: string[]; // IDs of connected skill categories
  position: [number, number, number]; // 3D position for neural network
}

export interface CertificationTier {
  tier: number;
  title: string;
  certifications: {
    title: string;
    issuer: string;
    image: string;
    credentialId?: string;
    skills: string[];
    impactLevel: 'high' | 'medium' | 'low';
  }[];
}

// Enhanced Projects Data
export const enhancedProjects: EnhancedProjectItem[] = [
  {
    id: "zeffy-automl",
    title: "Zeffy: Advanced AutoML Pipeline",
    subtitle: "Revolutionary ML Automation Framework",
    description: "Python-based AutoML framework automating 90% of traditional ML workflows with hybrid architectures and reproducible experiments.",
    longDescription: [
      "Revolutionary Python-based AutoML framework that democratizes machine learning by automating the entire ML lifecycle from data ingestion to deployment",
      "Integrates cutting-edge techniques including automated feature engineering, neural architecture search, and advanced ensemble methods",
      "YAML/JSON configuration system for reproducible experiments with modular design enabling custom component integration",
      "Supports hybrid architectures combining traditional ML and deep learning with capabilities for leveraging pretrained models"
    ],
    technologies: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "YAML", "JSON", "MLOps", "Docker"],
    metrics: {
      automation: "90%",
      timeReduction: "70%",
      architectures: "Hybrid ML+DL",
      models: "Traditional + Deep Learning"
    },
    github: "https://github.com/zulqarnainalipk/Zeffy",
    image: "/images/project1.png",
    category: "AutoML",
    featured: true,
    impact: "Reduces model development time by 70% while maintaining state-of-the-art performance",
    duration: "Apr 2025 - May 2025",
    keyAchievements: [
      "Automated 90% of ML workflow tasks",
      "70% reduction in development time",
      "Modular and extensible architecture",
      "Production-ready deployment capabilities"
    ],
    relatedSkills: ["Python", "Machine Learning", "Deep Learning", "MLOps", "AutoML"]
  },
  {
    id: "sepsis-guard",
    title: "SepsisGuard: Pediatric Sepsis Early Detection",
    subtitle: "Clinical-Grade Healthcare AI System",
    description: "ML system providing 6-hour early sepsis detection in PICUs with 0.983 AUC performance, addressing critical healthcare challenges.",
    longDescription: [
      "Clinical-grade machine learning system that predicts pediatric sepsis onset 6 hours before clinical diagnosis in Pediatric Intensive Care Units (PICUs)",
      "Developed using retrospective data from Hospital Sant Joan de Déu's PICU, integrating vital signs, medication records, lab results, and patient demographics",
      "Pipeline specifically addresses ICU data challenges like irregular sampling (30%+ missing lab values) through automated temporal alignment and feature engineering",
      "Emphasizes clinical applicability through transparent feature importance analysis using Random Forest's native impurity-based metrics"
    ],
    technologies: ["Python", "Scikit-learn", "Random Forest", "Clinical Data Processing", "Feature Engineering"],
    metrics: {
      auc: "0.983",
      earlyDetection: "6 hours",
      missingData: "30%+",
      mortalityReduction: "8% hourly"
    },
    github: "https://github.com/zulqarnainalipk/SepsisGuard",
    image: "/images/sepsis_detection_project.jpg",
    category: "Healthcare",
    featured: true,
    impact: "Enables 6-hour early detection helping reduce treatment delays linked to 8% hourly mortality increases",
    duration: "Feb 2025",
    keyAchievements: [
      "0.983 AUC validation performance",
      "6-hour early detection capability",
      "Robust handling of 30%+ missing data",
      "Interpretable predictions for clinical trust"
    ],
    relatedSkills: ["Machine Learning", "Healthcare AI", "Data Engineering", "Clinical Analytics"]
  },
  {
    id: "vision-validate",
    title: "VisionValidate: Autonomous Driving Scene Classifier",
    subtitle: "Real vs Fake Scene Authentication",
    description: "Deep learning system ensuring data authenticity in autonomous vehicle training pipelines using transformer architectures.",
    longDescription: [
      "Deep learning system ensuring data authenticity in autonomous vehicle training pipelines by distinguishing real vs synthetic driving scenes",
      "Uses advanced transformer-based architectures, augmentations, and training techniques to prevent model degradation from simulated data contamination",
      "Built with CNN-based models and transfer learning using fine-tuned pre-trained models (VGG16, ResNet) for enhanced performance",
      "Designed for real-time validation in autonomous vehicle systems to avoid incorrect decision-making from manipulated data"
    ],
    technologies: ["CNN", "Transfer Learning", "VGG16", "ResNet", "Computer Vision", "PyTorch", "Data Augmentation"],
    metrics: {
      architecture: "Transformer-based",
      models: "VGG16, ResNet",
      application: "Real-time validation",
      accuracy: "High performance"
    },
    github: "https://github.com/zulqarnainalipk/VisionValidate",
    image: "/images/project3.png",
    category: "Computer Vision",
    featured: false,
    impact: "Enhances autonomous vehicle safety through validated training data quality assurance",
    duration: "Jan 2025",
    keyAchievements: [
      "Binary classification with high accuracy",
      "Transfer learning implementation",
      "Real-time processing capabilities",
      "Safety-critical system integration"
    ],
    relatedSkills: ["Computer Vision", "Deep Learning", "Transfer Learning", "Autonomous Systems"]
  },
  {
    id: "harassment-detector",
    title: "Harassment Detection System",
    subtitle: "AI-Powered Safety Monitoring",
    description: "Computer vision system for automated harassment detection using ResNet50, providing real-time monitoring for public safety.",
    longDescription: [
      "Computer vision system for automated harassment detection using ResNet50 architecture providing real-time monitoring capabilities",
      "Classifies images into Victim, Perpetrator, and Unwanted Touching categories for comprehensive harassment identification",
      "Leverages object detection and classification techniques to identify instances of harassment from images in real-world environments",
      "Designed to assist authorities, organizations, and monitoring systems in taking swift action for safer public spaces"
    ],
    technologies: ["ResNet50", "Image Classification", "Object Detection", "Computer Vision", "Deep Learning"],
    metrics: {
      categories: "3 classes",
      processing: "Real-time",
      architecture: "ResNet50",
      application: "Public safety"
    },
    image: "/images/project2.jpg",
    category: "Computer Vision",
    featured: false,
    impact: "Contributes to safer public environments through automated harassment detection and prevention",
    duration: "Dec 2024",
    keyAchievements: [
      "Multi-class detection system",
      "Real-time processing capabilities",
      "Privacy-preserving design",
      "Scalable monitoring solution"
    ],
    relatedSkills: ["Computer Vision", "Object Detection", "Public Safety AI", "Social Impact"]
  },
  {
    id: "aod-estimation",
    title: "Aerosol Optical Depth Estimation",
    subtitle: "Satellite-Based Environmental Monitoring",
    description: "Environmental monitoring system combining Sentinel-2 imagery with AERONET data, achieving 0.964 Pearson correlation for air quality assessment.",
    longDescription: [
      "Comprehensive pipeline to estimate Aerosol Optical Depth (AOD) by combining Sentinel-2 satellite imagery with ground-based AERONET data",
      "Uses Sentinel-2's high-resolution, multispectral images containing 13 bands capturing data across visible, near-infrared, and shortwave infrared spectra",
      "Developed novel CatBoost-based approach with Pearson correlation of 0.9640 ± 0.0460, outperforming traditional methods",
      "Optimized cloud-masking algorithms reducing preprocessing time by 45% for global-scale aerosol monitoring"
    ],
    technologies: ["Sentinel-2", "Remote Sensing", "CatBoost", "AERONET", "Geospatial Analysis", "Python"],
    metrics: {
      correlation: "0.964",
      bands: "13 spectral",
      preprocessing: "45% faster",
      coverage: "Global scale"
    },
    github: "https://github.com/zulqarnainalipk/Aerosol-Optical-Depth-Estimation",
    image: "/images/aerosol_depth_project.jpg",
    category: "Remote Sensing",
    featured: true,
    impact: "Supports climate research and public health monitoring through advanced environmental analysis",
    duration: "Jul 2024 - Sep 2024",
    keyAchievements: [
      "Pearson correlation of 0.964",
      "45% faster preprocessing",
      "Published research methodology",
      "Global environmental monitoring"
    ],
    relatedSkills: ["Remote Sensing", "Environmental AI", "Satellite Data", "Climate Science"]
  },
  {
    id: "agricultural-segmentation",
    title: "Agricultural Land Segmentation",
    subtitle: "Precision Agriculture Solution",
    description: "Instance segmentation on satellite imagery for automated field boundary detection and crop monitoring in precision agriculture.",
    longDescription: [
      "Applied advanced instance segmentation techniques to high-resolution satellite images of agricultural lands for precision agriculture",
      "Identifies distinct field boundaries and analyzes spatial distribution of crops for improved accuracy in detecting field areas",
      "Integrates Sentinel-2 satellite imagery with GIS tools for geographic data visualization and comprehensive analysis",
      "Supports precision agriculture by helping farmers and agronomists monitor crop health and optimize resource use"
    ],
    technologies: ["Instance Segmentation", "Sentinel-2", "OpenCV", "TensorFlow", "PyTorch", "GIS", "Remote Sensing"],
    metrics: {
      technique: "Instance Segmentation",
      resolution: "High-resolution",
      tools: "GIS integration",
      application: "Precision Agriculture"
    },
    github: "https://github.com/zulqarnainalipk/Field-Area-Segmentation",
    image: "/images/project_fallback.png",
    category: "Remote Sensing",
    featured: false,
    impact: "Optimizes agricultural resource use and crop management through automated field detection",
    duration: "Jun 2024 - Aug 2024",
    keyAchievements: [
      "Accurate field boundary detection",
      "Crop monitoring capabilities",
      "GIS integration for analysis",
      "Sustainable farming support"
    ],
    relatedSkills: ["Instance Segmentation", "Agricultural AI", "Satellite Imagery", "Precision Agriculture"]
  },
  {
    id: "birdclef-audio",
    title: "BirdCLEF: Audio Species Identification",
    subtitle: "Biodiversity Conservation Through AI",
    description: "Kaggle bronze medal solution for automated bird species identification from audio data supporting conservation efforts.",
    longDescription: [
      "Developed automated techniques to identify understudied Indian bird species by their calls using machine learning for biodiversity conservation",
      "Kaggle Competition Bronze Medal winning solution processing continuous audio data and recognizing bird species from vocalizations",
      "Created reliable classifiers functioning effectively with limited training data using spectral analysis and feature extraction",
      "Supports conservation efforts in the Western Ghats, India, including initiatives by V. V. Robin's Lab at IISER Tirupati"
    ],
    technologies: ["Audio Processing", "Spectral Analysis", "Feature Extraction", "Machine Learning", "Signal Processing"],
    metrics: {
      achievement: "Bronze Medal",
      platform: "Kaggle",
      species: "Indian birds",
      application: "Conservation"
    },
    kaggle: "https://www.kaggle.com/code/zulqarnainalipk/birdclef-2024-species-identification-from-audio",
    image: "/images/project_fallback.png",
    category: "Audio Processing",
    featured: false,
    impact: "Supports biodiversity monitoring and conservation efforts in the Western Ghats ecosystem",
    duration: "Apr 2024 - Jun 2024",
    keyAchievements: [
      "Kaggle Competition Bronze Medal",
      "Species identification from audio",
      "Limited training data optimization",
      "Conservation impact application"
    ],
    relatedSkills: ["Audio Processing", "Conservation AI", "Spectral Analysis", "Biodiversity"]
  },
  {
    id: "pii-detection",
    title: "PII Data Detection System",
    subtitle: "Privacy-Preserving Data Analytics",
    description: "NLP system for automated PII detection ensuring FERPA, GDPR, and CCPA compliance with 95% accuracy and 10k+ records/minute processing.",
    longDescription: [
      "Privacy-preserving NLP system for automated detection and removal of personally identifiable information from educational datasets",
      "Ensures compliance with privacy regulations including FERPA, GDPR, and CCPA while maintaining analytical value of data",
      "Leverages advanced machine learning, natural language processing, and data anonymization methods for robust privacy protection",
      "Processes over 10,000 records per minute with 95% accuracy in PII detection and automated anonymization capabilities"
    ],
    technologies: ["NLP", "Data Privacy", "Machine Learning", "Regex", "Data Anonymization", "GDPR", "FERPA"],
    metrics: {
      accuracy: "95%",
      processing: "10k+ records/min",
      compliance: "FERPA, GDPR, CCPA",
      automation: "Full pipeline"
    },
    github: "https://github.com/zulqarnainalipk/PII-Data-Detection",
    image: "/images/pii_detection_project.png",
    category: "Privacy",
    featured: true,
    impact: "Enables compliant educational data analysis while protecting individual privacy rights",
    duration: "Jan 2024 - Mar 2024",
    keyAchievements: [
      "95% PII detection accuracy",
      "Multi-regulation compliance",
      "High-throughput processing",
      "Automated anonymization"
    ],
    relatedSkills: ["NLP", "Data Privacy", "Compliance", "Educational Technology"]
  }
];

// Enhanced Skills Structure for Neural Network Visualization
export const enhancedSkillCategories: EnhancedSkillCategory[] = [
  {
    id: "programming",
    name: "Programming Languages",
    skills: ["Python", "C++", "SQL", "JavaScript", "HTML", "R", "MATLAB"],
    color: "#34D399",
    icon: "Code",
    proficiency: 95,
    connections: ["ml-ai", "data-engineering"],
    position: [-2, 0, 0]
  },
  {
    id: "ml-ai",
    name: "Machine Learning & AI",
    skills: ["Deep Learning", "Transfer Learning", "NLP", "Computer Vision", "AutoML", "Neural Networks"],
    color: "#60A5FA",
    icon: "Brain",
    proficiency: 92,
    connections: ["programming", "frameworks", "data-science"],
    position: [0, 1, 0]
  },
  {
    id: "frameworks",
    name: "ML Frameworks",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Keras", "Pandas", "NumPy"],
    color: "#F472B6",
    icon: "Cpu",
    proficiency: 90,
    connections: ["ml-ai", "programming"],
    position: [2, 0, 0]
  },
  {
    id: "data-science",
    name: "Data Science",
    skills: ["Data Analysis", "Statistical Analysis", "Feature Engineering", "Data Visualization", "EDA"],
    color: "#FBBF24",
    icon: "BarChart",
    proficiency: 88,
    connections: ["ml-ai", "data-engineering", "remote-sensing"],
    position: [0, -1, 1]
  },
  {
    id: "data-engineering",
    name: "Data Engineering",
    skills: ["ETL Pipelines", "Data Cleaning", "Database Management", "Big Data", "Apache Spark"],
    color: "#A78BFA",
    icon: "Database",
    proficiency: 85,
    connections: ["programming", "cloud-devops", "data-science"],
    position: [-1, -1, 0]
  },
  {
    id: "remote-sensing",
    name: "Remote Sensing & GIS",
    skills: ["Sentinel-2", "Satellite Data", "GIS", "Geospatial Analysis", "Earth Observation"],
    color: "#10B981",
    icon: "Globe",
    proficiency: 82,
    connections: ["data-science", "computer-vision"],
    position: [1, 0, -1]
  },
  {
    id: "computer-vision",
    name: "Computer Vision",
    skills: ["Image Processing", "Object Detection", "Instance Segmentation", "OpenCV", "Image Classification"],
    color: "#EF4444",
    icon: "Eye",
    proficiency: 87,
    connections: ["ml-ai", "remote-sensing"],
    position: [0, 1, -1]
  },
  {
    id: "cloud-devops",
    name: "Cloud & MLOps",
    skills: ["AWS", "Docker", "MLflow", "API Development", "Model Deployment", "Kubernetes"],
    color: "#8B5CF6",
    icon: "Cloud",
    proficiency: 75,
    connections: ["data-engineering", "programming"],
    position: [-2, 0, 1]
  }
];

// Enhanced Certifications with Tiers
export const certificationTiers: CertificationTier[] = [
  {
    tier: 1,
    title: "Specializations & Advanced Certifications",
    certifications: [
      {
        title: "IBM Data Science Specialization",
        issuer: "IBM",
        image: "/images/ibm_data_science_cert.png",
        skills: ["Data Science", "Python", "Machine Learning", "Data Visualization"],
        impactLevel: "high"
      },
      {
        title: "IBM AI Enterprise Workflow Specialization",
        issuer: "IBM",
        image: "/images/ibm_ai_workflow_cert.png",
        skills: ["AI Workflow", "Enterprise AI", "Model Deployment", "MLOps"],
        impactLevel: "high"
      },
      {
        title: "Advanced Data Science with IBM Specialization",
        issuer: "IBM",
        image: "/images/ibm_advanced_ds_cert.png",
        skills: ["Advanced Analytics", "Deep Learning", "Big Data", "AI"],
        impactLevel: "high"
      },
      {
        title: "Machine Learning Specialization",
        issuer: "Stanford/Coursera",
        image: "/images/ibm_data_science_cert.png",
        skills: ["Machine Learning", "Supervised Learning", "Unsupervised Learning", "Recommender Systems"],
        impactLevel: "high"
      },
      {
        title: "Deep Learning Specialization",
        issuer: "DeepLearning.AI",
        image: "/images/ibm_advanced_ds_cert.png",
        skills: ["Neural Networks", "Deep Learning", "CNNs", "RNNs", "Transformers"],
        impactLevel: "high"
      },
      {
        title: "Applied Data Science Lab",
        issuer: "WorldQuant University",
        image: "/images/wq_ads_lab_cert.png",
        skills: ["Applied Data Science", "ETL Pipelines", "Visualization", "Analytics"],
        impactLevel: "high"
      },
      {
        title: "Applied AI Lab: Deep Learning for Computer Vision",
        issuer: "WorldQuant University",
        image: "/images/wq_ads_lab_cert.png",
        credentialId: "https://www.credly.com/go/6KXFxh9K",
        skills: ["Computer Vision", "Deep Learning", "PyTorch", "Image Processing"],
        impactLevel: "high"
      }
    ]
  },
  {
    tier: 2,
    title: "Professional Certifications",
    certifications: [
      {
        title: "TensorFlow Developer Certificate",
        issuer: "Google",
        image: "/images/ibm_data_science_cert.png",
        skills: ["TensorFlow", "Deep Learning", "Neural Networks", "Model Deployment"],
        impactLevel: "high"
      },
      {
        title: "AWS Machine Learning Specialty",
        issuer: "Amazon Web Services",
        image: "/images/ibm_advanced_ds_cert.png",
        skills: ["AWS", "Cloud ML", "Data Engineering", "Model Deployment"],
        impactLevel: "high"
      },
      {
        title: "Google Cloud Professional Data Engineer",
        issuer: "Google Cloud",
        image: "/images/ibm_data_science_cert.png",
        skills: ["GCP", "Data Engineering", "BigQuery", "DataFlow"],
        impactLevel: "high"
      },
      {
        title: "Microsoft Azure AI Engineer Associate",
        issuer: "Microsoft",
        image: "/images/wq_ads_lab_cert.png",
        skills: ["Azure", "AI Services", "Cognitive Services", "Bot Framework"],
        impactLevel: "high"
      }
    ]
  },
  {
    tier: 3,
    title: "Platform-Specific & Technical Certifications",
    certifications: [
      {
        title: "Google Business Intelligence Specialization",
        issuer: "Google",
        image: "/images/ibm_data_science_cert.png",
        skills: ["Business Intelligence", "Data Visualization", "Dashboards"],
        impactLevel: "medium"
      },
      {
        title: "Kaggle Learn: Python",
        issuer: "Kaggle",
        image: "/images/ibm_data_science_cert.png",
        skills: ["Python", "Data Science", "Programming"],
        impactLevel: "medium"
      },
      {
        title: "Kaggle Learn: Machine Learning",
        issuer: "Kaggle",
        image: "/images/ibm_advanced_ds_cert.png",
        skills: ["Machine Learning", "Feature Engineering", "Model Selection"],
        impactLevel: "medium"
      },
      {
        title: "Kaggle Learn: Deep Learning",
        issuer: "Kaggle",
        image: "/images/ibm_data_science_cert.png",
        skills: ["Deep Learning", "PyTorch", "Computer Vision", "NLP"],
        impactLevel: "medium"
      },
      {
        title: "IEEE Computer Society: AI Ethics",
        issuer: "IEEE",
        image: "/images/wq_ads_lab_cert.png",
        skills: ["AI Ethics", "Responsible AI", "Fairness", "Transparency"],
        impactLevel: "medium"
      }
    ]
  }
];

// Competition Achievements
export const competitionAchievements = [
  {
    title: "Winner 1st Place",
    competition: "TechQuest 2024 Data Science Competition",
    organizer: "IUB BWP",
    year: "2024",
    image: "/images/techquest_winner.jpg",
    type: "gold",
    description: "First place in university-level data science competition"
  },
  {
    title: "Bronze Medal",
    competition: "BirdCLEF 2024",
    organizer: "Kaggle",
    year: "2024",
    image: "/images/bronze_medal.png",
    type: "bronze",
    description: "Audio-based bird species identification challenge"
  },
  {
    title: "Bronze Medal",
    competition: "RSNA 2024",
    organizer: "Kaggle",
    year: "2024",
    image: "/images/bronze_medal.png",
    type: "bronze",
    description: "Medical imaging and radiology AI challenge"
  },
  {
    title: "GREEN Star",
    competition: "Aerosol Optical Depth Estimation",
    organizer: "Solafune, Inc.",
    year: "2024",
    image: "/images/green_star_award.jpg",
    type: "star",
    description: "Environmental monitoring satellite data competition"
  },
  {
    title: "Gold Medal",
    competition: "CGIAR Root Volume Estimation",
    organizer: "Zindi",
    year: "2024",
    image: "/images/zindi_gold_medal.jpg",
    type: "gold",
    description: "Agricultural AI for crop root system analysis"
  },
  {
    title: "Bronze Medal",
    competition: "ITU AI/ML in 5G Challenge",
    organizer: "Zindi",
    year: "2024",
    image: "/images/bronze_medal.png",
    type: "bronze",
    description: "Telecommunications and 5G network optimization"
  }
];

export default {
  enhancedProjects,
  enhancedSkillCategories,
  certificationTiers,
  competitionAchievements
};