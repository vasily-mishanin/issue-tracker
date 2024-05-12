'use client';
import Link from 'next/link';
import { FaBugs } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';

const NavBar = () => {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between' gap='4'>
          <Flex align='center' gap='8'>
            <Link href='/'>
              <FaBugs />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const session = useSession();

  if (session.status === 'loading') {
    return null;
  }

  if (session.status === 'unauthenticated') {
    return (
      <Link className='nav-link cursor-pointer' href='/api/auth/signin'>
        Sign in
      </Link>
    );
  }

  return (
    <Box>
      <ul>
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                className='cursor-pointer'
                src={session!.data!.user!.image!}
                fallback='?'
                size='4'
                radius='full'
                referrerPolicy='no-referrer'
              />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size='2'>{session!.data!.user?.email}</Text>
              </DropdownMenu.Label>

              <DropdownMenu.Item>
                <Link href='/api/auth/signout'>Log out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>
      </ul>
    </Box>
  );
};

export const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
