import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { delay } from '@/app/utils/delay';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import authOptions from '@/app/auth/auth-options';
import { getServerSession } from 'next-auth/next';
import AssigneeSelect from './AssigneeSelect';

type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  if (typeof parseInt(params.id) !== 'number') {
    notFound();
  }

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

  //await delay(2000);

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap='4' direction={'column'}>
            <AssigneeSelect />
            <EditIssueButton issue={issue} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
