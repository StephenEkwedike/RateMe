import { FC } from 'react';

/**
 * Site footer
 */
const Footer: FC = () => {
  return (
    <footer className="container mx-auto text-center py-8">
      <p className="text-sm text-gray-500">© {new Date().getFullYear()} RateMe. All rights reserved.</p>
    </footer>
  );
};

export default Footer;