import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  // Define link data for easy mapping
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '#' },
    { name: 'Companies', href: '/' },
    { name: 'About Us', href: '/about' },
  ];

  const resources = [
    { name: 'Blog', href: '#' },
    { name: 'Career Guide', href: '#' },
    { name: 'Resume Builder', href: '#' },
    { name: 'Help Center', href: '/help' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
  ];

  // Helper component for links
  const FooterLink = ({ href, children }) => (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  );

  return (
    <footer className="bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Brand Info and Social Icons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">OneDayJob</h2>
          <p className="text-gray-400 mb-6 max-w-md">
            Connecting talented professionals with the best job opportunities in one day.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                aria-label={link.label}
                className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-blue-600 transition-colors duration-200"
              >
                <link.icon className="text-white text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section: Links and Subscribe */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {quickLinks.map((link, index) => (
                <FooterLink key={index} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="flex flex-col space-y-2">
              {resources.map((link, index) => (
                <FooterLink key={index} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Empty column for spacing on larger screens (to align subscribe) */}
          <div className="hidden md:block"></div>

          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-3 text-sm">Get the latest job updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="p-2 flex-grow rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-r-md transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* Bottom Section: Copyright and Legal Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-3 sm:mb-0">
            © 2023 **OneDayJob**. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;