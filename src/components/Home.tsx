import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiScissors, FiDroplet, FiPlay, FiCheckCircle, FiStar, FiEye, FiHeart } from 'react-icons/fi';
import Header from './Header';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animateElements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .scroll-animate-header'
    );
    
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    { 
      title: 'Precision Editing', 
      icon: FiScissors, 
      desc: 'Craft the perfect narrative arc with meticulous attention to pacing, rhythm, and emotional resonance.',
      features: ['Story Structure', 'Rhythm & Pacing', 'Seamless Transitions']
    },
    { 
      title: 'Cinematic Color', 
      icon: FiDroplet, 
      desc: 'Transform raw footage into visual poetry through expertly crafted color grading and mood creation.',
      features: ['Color Correction', 'Mood Enhancement', 'Visual Consistency']
    },
    { 
      title: 'VFX & Motion', 
      icon: FiPlay, 
      desc: 'Bring impossible visions to life with seamless visual effects and dynamic motion graphics.',
      features: ['Visual Effects', 'Motion Graphics', 'Compositing']
    },
    { 
      title: 'Flawless Delivery', 
      icon: FiCheckCircle, 
      desc: 'Ensure your content reaches audiences in perfect quality across all platforms and formats.',
      features: ['Multi-Format Export', 'Quality Assurance', 'Platform Optimization']
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: FiStar },
    { number: '50M+', label: 'Views Generated', icon: FiEye },
    { number: '100%', label: 'Client Satisfaction', icon: FiHeart },
  ];

  return (
    <main className="min-h-screen bg-white text-black font-worksans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Video */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1950&q=80"
          >
            <source src="https://cdn.pixabay.com/video/2019/07/15/25323-349094716_large.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black/80"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
            Crafting Stories with
            <span className="block mt-2 text-accent drop-shadow-lg">
              Precision
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            A boutique post-production studio where every frame is meticulously crafted 
            and every story elevated with uncompromising artistry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/work" 
              className="bg-accent hover:bg-purple-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View Our Work
            </Link>
            <Link 
              to="/start-project" 
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-md font-medium transition-all duration-300 backdrop-blur-sm bg-white/10"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 scroll-animate-header">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Creators
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and the trust our clients place in us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 scroll-animate-scale"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 scroll-animate-header">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every project tells a story. Our role is to help you tell yours with clarity, 
              creativity, and technical excellence that stands the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12 scroll-animate-header">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              What We Craft
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-xl text-gray-300">
              From raw footage to polished story—our services cover every aspect of post-production.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 scroll-animate"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{service.desc}</p>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs text-gray-400">
                      <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate-header">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Meet the Team
              </h2>
              <div className="w-16 h-1 bg-accent mb-6"></div>
              <p className="text-gray-700 mb-6">
                Mercer & Loom is a collective of passionate creatives who live and breathe storytelling. Our team combines decades of experience with fresh perspectives, ensuring every project receives the attention it deserves.
              </p>
              <p className="text-gray-700 mb-8">
                From award-winning editors to color grading specialists, from VFX artists to motion graphics designers—we're united by one mission: to elevate your story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/team" 
                  className="bg-accent hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                >
                  Meet Our Team
                </Link>
                <Link 
                  to="/portfolio" 
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-md font-medium transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
            <div className="scroll-animate-right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=80"
                  alt="Mercer & Loom creative team at work"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold">5+</div>
                    <div className="text-xs">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 text-white py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12 scroll-animate-header">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Create Together
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-xl text-gray-300">
              Ready to bring your vision to life? We're here to help you tell your story.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-800 rounded-lg scroll-animate-left">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <FiHeart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">hello@mercerloom.com</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-lg scroll-animate-right">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <FiStar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex justify-center space-x-4 mt-4">
                {[
                  { label: 'Instagram', href: '#' },
                  { label: 'LinkedIn', href: '#' },
                  { label: 'Vimeo', href: '#' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center border-t border-gray-800 pt-8 scroll-animate">
            <p className="text-gray-400 mb-4">© 2025 Mercer & Loom. Crafting stories with precision.</p>
            <div className="flex justify-center items-center space-x-3">
              <img 
                src="/ML_logo.svg" 
                alt="Mercer & Loom Logo" 
                className="w-6 h-6 opacity-70 brightness-0 invert"
              />
              <span className="text-gray-500 text-sm uppercase tracking-wide">Mercer & Loom</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
