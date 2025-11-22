import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  profile: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    website: 'alexmorgan.dev',
    title: 'Senior Software Engineer',
    summary: 'Results-oriented software engineer with 6+ years of experience in full-stack development. Proven track record of delivering scalable web applications and leading cross-functional teams. Expertise in React, Node.js, and cloud infrastructure.',
  },
  experience: [
    {
      id: '1',
      company: 'TechFlow Solutions',
      position: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: '• Led a team of 5 developers in migrating a legacy monolithic application to a micro-frontend architecture, improving deployment frequency by 40%.\n• Optimized application performance, reducing load times by 1.5 seconds and increasing user retention by 15%.\n• Mentored junior developers and implemented strict code review guidelines.',
    },
    {
      id: '2',
      company: 'Creative Web Agency',
      position: 'Web Developer',
      location: 'Austin, TX',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: '• Developed responsive websites for over 20 diverse clients using HTML, CSS, and JavaScript.\n• Collaborated with designers to implement pixel-perfect user interfaces ensuring cross-browser compatibility.\n• Integrated third-party APIs and payment gateways to support e-commerce functionality.',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. Computer Science',
      location: 'Austin, TX',
      graduationDate: '2018-05',
    },
  ],
  skills: [
    { id: '1', name: 'React / TypeScript', level: 'Expert' },
    { id: '2', name: 'Node.js', level: 'Advanced' },
    { id: '3', name: 'Tailwind CSS', level: 'Expert' },
    { id: '4', name: 'AWS', level: 'Intermediate' },
    { id: '5', name: 'GraphQL', level: 'Advanced' },
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Dashboard',
      link: 'github.com/alexmorgan/dashboard',
      description: 'Built a real-time analytics dashboard using React, D3.js, and WebSocket integration. Used by 500+ internal stakeholders.'
    },
    {
      id: '2',
      name: 'Task Manager App',
      link: 'taskapp.io',
      description: 'Developed a collaborative task management tool with offline support using IndexedDB and Service Workers.'
    }
  ],
  certificates: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022'
    },
    {
      id: '2',
      name: 'Google Project Management',
      issuer: 'Coursera',
      date: '2021'
    }
  ]
};