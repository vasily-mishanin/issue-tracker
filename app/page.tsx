import { Suspense } from 'react';
import IssuesSummary from './IssuesSummary';
import LatestIssues from './LatestIssues';
import { Spinner } from './components';
import IssuesChart from './components/IssuesChart';
import { Flex, Grid } from '@radix-ui/themes';
import { prisma } from '@/prisma/client';

export default async function Home() {
  const openIssues =
    (await prisma?.issue.count({
      where: { status: 'OPEN' },
    })) ?? 0;

  const inProgressIssues =
    (await prisma?.issue.count({
      where: { status: 'IN_PROGRESS' },
    })) ?? 0;

  const closedIssues =
    (await prisma?.issue.count({
      where: { status: 'CLOSED' },
    })) ?? 0;

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='8'>
      <Suspense fallback={<Spinner />}>
        <Flex direction='column' gap='4'>
          <IssuesChart
            open={openIssues}
            closed={closedIssues}
            inProgress={inProgressIssues}
          />
          <IssuesSummary
            open={openIssues}
            closed={closedIssues}
            inProgress={inProgressIssues}
          />
        </Flex>

        <Flex direction='column'>
          <LatestIssues />
        </Flex>
      </Suspense>
    </Grid>
  );
}
