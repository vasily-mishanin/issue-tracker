import { Suspense } from 'react';
import IssuesSummary from './IssuesSummary';
import LatestIssues from './LatestIssues';
import { Spinner } from './components';
import IssuesChart from './components/IssuesChart';

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
    <div>
      <Suspense fallback={<Spinner />}>
        <IssuesSummary
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues}
        />
        <IssuesChart
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues}
        />
      </Suspense>
      <LatestIssues />
    </div>
  );
}
