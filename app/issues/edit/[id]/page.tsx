import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { prisma } from '@/prisma/client';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

type Props = {
  params: { id: string };
};

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma?.issue.findUnique({ where: { id: +params.id } });

  if (!issue) {
    return notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
