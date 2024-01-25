import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof parseInt(params.id) !== 'number') {
    notFound();
  }

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap='4' my='3'>
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>

      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
