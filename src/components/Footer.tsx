const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com/yourpage' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/yourpage' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/yourcompany' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com/@yourchannel' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ...existing footer content... */}

        {/* Social Media Icons */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:scale-110 transform transition-transform duration-200 hover:opacity-80"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ...existing copyright... */}
      </div>
    </footer>
  );
};

export default Footer;
