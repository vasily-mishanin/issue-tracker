import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof params.id) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
