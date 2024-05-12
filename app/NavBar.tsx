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
  const currentPath = usePathname();
  const session = useSession();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <FaBugs />
            </Link>
            <ul className='flex space-x-6'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      'text-zinc-900': link.href === currentPath,
                      'text-zinc-500': link.href !== currentPath,
                      'hover:ext-zinc-800 transition-colors': true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            <ul>
              {session.status === 'authenticated' && (
                <li>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Avatar
                        className='cursor-pointer'
                        src={session.data.user!.image!}
                        fallback='?'
                        size='4'
                        radius='full'
                      />
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content>
                      <DropdownMenu.Label>
                        <Text size='2' className='cursor-pointer'>
                          {session.data.user?.email}
                        </Text>
                      </DropdownMenu.Label>

                      <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Log out</Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </li>
              )}
              {session.status === 'unauthenticated' && (
                <li>
                  <Link href='/api/auth/signin'>Sign in</Link>
                </li>
              )}
            </ul>
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};
export default NavBar;
