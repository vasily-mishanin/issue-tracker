'use client';
import Link from 'next/link';
import { FaBugs } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {
  const currentPath = usePathname();
  const session = useSession();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <FaBugs />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li
            key={link.href}
          >
            <Link  className={classnames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:ext-zinc-800 transition-colors': true,
            })} href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        <ul>
          {session.status === "authenticated" && <li><Link href="/api/auth/signout">Log out</Link></li>}
          {session.status === "unauthenticated" && <li><Link href="/api/auth/signin">Sign in</Link></li>}
        </ul>
      </Box>
    </nav>
  );
};
export default NavBar;
