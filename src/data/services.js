import webImage from '../assets/images/service-web.jpg'
import wordpressImage from '../assets/images/service-wordpress.jpg'
import reactImage from '../assets/images/service-react.jpg'
import uiuxImage from '../assets/images/service-uiux.jpg'
import ecommerceImage from '../assets/images/service-ecommerce.jpg'
import systemsImage from '../assets/images/service-systems.jpg'

export const servicesIntro = {
  label: '04 / Capabilities',
  title: ['What', 'I do'],
  description: 'From high-performance websites to custom web applications, I combine design thinking and development to build digital products that are clear, fast and built to work.',
}

export const services = [
  { id: 1, number: '01', title: 'Web Development', shortTitle: 'Web', description: 'Modern, responsive and performance-focused websites built around strong design, clean implementation and real business requirements.', capabilities: ['Responsive Development', 'Business Websites', 'Landing Pages', 'Interactive Websites', 'Performance Optimization'], technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'GSAP', 'Tailwind CSS'], image: webImage, imageAlt: 'Editorial preview of a modern business website interface', cursorLabel: 'Explore' },
  { id: 2, number: '02', title: 'WordPress Development', shortTitle: 'WordPress', description: 'Flexible WordPress experiences ranging from professional business websites to custom WooCommerce stores and tailored site functionality.', capabilities: ['Custom WordPress Websites', 'Elementor Development', 'WooCommerce', 'Custom Functionality', 'Plugin Integration', 'Performance Optimization'], technologies: ['WordPress', 'WooCommerce', 'Elementor', 'PHP', 'JavaScript'], image: wordpressImage, imageAlt: 'Editorial preview of a content-rich commerce website', cursorLabel: 'Explore' },
  { id: 3, number: '03', title: 'React Applications', shortTitle: 'React', description: 'Interactive web applications and dashboards designed around clear workflows, reusable architecture and responsive user experiences.', capabilities: ['Web Applications', 'Admin Dashboards', 'Management Systems', 'API Integration', 'Responsive Interfaces', 'Reusable Components'], technologies: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'REST APIs'], image: reactImage, imageAlt: 'Editorial preview of a React project management application', cursorLabel: 'Explore' },
  { id: 4, number: '04', title: 'UI / UX Implementation', shortTitle: 'UI / UX', description: 'Turning interface concepts and design systems into polished, responsive and interaction-focused digital experiences.', capabilities: ['Figma to Development', 'Responsive UI', 'Design Systems', 'Micro Interactions', 'Interactive Prototypes', 'Interface Refinement'], technologies: ['Figma', 'HTML', 'CSS', 'React', 'GSAP', 'JavaScript'], image: uiuxImage, imageAlt: 'Editorial preview of a responsive interface design system', cursorLabel: 'Explore' },
  { id: 5, number: '05', title: 'E-commerce Development', shortTitle: 'E-commerce', description: 'User-focused online stores with clear shopping experiences, responsive interfaces and maintainable commerce workflows.', capabilities: ['WooCommerce Stores', 'Product Experiences', 'Checkout Customization', 'Payment Integration', 'Responsive Commerce', 'Performance Optimization'], technologies: ['WooCommerce', 'WordPress', 'PHP', 'JavaScript'], image: ecommerceImage, imageAlt: 'Editorial preview of a refined ecommerce storefront', cursorLabel: 'Explore' },
  { id: 6, number: '06', title: 'Custom Web Systems', shortTitle: 'Systems', description: 'Purpose-built digital systems for businesses that need more than a standard website — from internal portals to complete management platforms.', capabilities: ['Management Systems', 'Employee Portals', 'Attendance Systems', 'Task Management', 'Custom Dashboards', 'Business Automation'], technologies: ['React', 'Node.js', 'Express', 'MySQL', 'REST APIs'], image: systemsImage, imageAlt: 'Editorial preview of a custom business operations system', cursorLabel: 'Explore' },
]

export const capabilityMarquee = ['Design', 'Development', 'WordPress', 'React', 'E-commerce', 'Web Applications', 'UI / UX', 'Performance']
