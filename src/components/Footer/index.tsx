import React from "react";

// Footer Component

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-9 mt-9">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Sheertex. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://twitter.com" className="text-blue-500 hover:text-blue-400 ml-2">
            Twitter
          </a>
          ,
          <a href="https://facebook.com" className="text-blue-600 hover:text-blue-500 ml-2">
            Facebook
          </a>
          ,
          <a href="https://instagram.com" className="text-blue-600 hover:text-pink-500 ml-2">
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
