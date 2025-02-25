import authOptions from '@/app/auth/auth-options';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PATCH };
