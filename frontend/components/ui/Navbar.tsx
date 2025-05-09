import { FC } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

/**
 * Site navigation bar with mobile toggle (hamburger).
 */
const Navbar: FC = () => {
  // TODO: implement mobile menu state
  return (
    <nav className="container mx-auto flex items-center justify-between p-4">
      <Link href="/">
        <a className="text-xl font-bold">RateMe</a>
      </Link>
      <button className="md:hidden">
        <Menu size={24} />
      </button>
      <ul className="hidden md:flex md:space-x-6">
        <li>
          <Link href="/sign-up">
            <a>Sign Up</a>
          </Link>
        </li>
        <li>
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;