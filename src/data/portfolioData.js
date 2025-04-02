const portfolioData = {
  personalInfo: {
    name: "JOHN DOE",
    title: "Full-Stack Developer & React.js Specialist",
    location: "San Francisco, California, USA",
    about: "Results-driven Web Developer with expertise in modern web technologies. Passionate about creating efficient, scalable applications with excellent user experiences.",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe"
  },
  
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "Jan 2023 - Present",
      responsibilities: [
        "Led development of enterprise dashboards using React.js, Redux, and Material UI.",
        "Implemented CI/CD pipelines reducing deployment time by 40%.",
        "Mentored junior developers and conducted code reviews for quality assurance."
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations Co.",
      period: "May 2021 - Dec 2022",
      responsibilities: [
        "Built responsive web applications using MERN stack and RESTful APIs.",
        "Collaborated in agile teams to deliver features on schedule.",
        "Optimized database queries and frontend rendering for improved performance."
      ]
    }
  ],
  
  projects: [
    {
      title: "E-commerce Platform",
      type: "Web Application",
      description: [
        "Developed a full-featured online shopping platform with user authentication.",
        "Implemented cart, checkout, and payment gateway integration.",
        "Added responsive design and product recommendation system."
      ],
      tech: ['React.js', 'Node.js', 'MongoDB'],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Content Management System",
      type: "Enterprise Solution",
      description: [
        "Built custom CMS with role-based access control and document versioning.",
        "Integrated rich text editors and media library management.",
        "Implemented search functionality with filtering and sorting capabilities."
      ],
      tech: ['Next.js', 'Express', 'PostgreSQL'],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Task Management Dashboard",
      type: "Productivity Tool",
      description: [
        "Created intuitive task management interface with drag-and-drop functionality.",
        "Implemented real-time updates using WebSockets and data synchronization.",
        "Added analytics dashboard for productivity tracking and reporting."
      ],
      tech: ['React.js', 'Firebase', 'Redux', 'Chart.js'],
      gradient: "from-blue-500 to-purple-600",
      fullWidth: true
    }
  ],
  
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Technology",
      period: "2019 - 2021",
      grade: "GPA: 3.8/4.0"
    },
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "State University",
      period: "2015 - 2019",
      grade: "GPA: 3.7/4.0"
    }
  ],
  
  achievements: [
    "Won first place in the Regional Hackathon for innovative solution in healthcare.",
    "Published technical article on frontend optimization techniques with 10,000+ views.",
    "Open source contributor to popular JavaScript library with over 5,000 stars on GitHub."
  ],
  
  skills: {
    frontend: ['JavaScript', 'React.js', 'Next.js', 'HTML5', 'CSS3', 'JSX', 'Tailwind CSS', 'Shadcn'],
    backend: ['Node.js', 'Express.js', 'Python (Flask)', 'REST APIs'],
    databases: ['MongoDB', 'SQL', 'Firebase'],
    programmingLanguages: ['Python', 'Java (OOPs)', 'C', 'JavaScript'],
    tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'WordPress', 'Vercel']
  }
};

export default portfolioData;
