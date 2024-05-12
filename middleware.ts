// this logic will be executed when visiting matcher routes
// the logic is already implemented in next-auth/middleware
// user will be redirected to login page in case of unauthorized try to visit the matcher routes
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/issues/new', '/issues/edit/:id+'],
};
