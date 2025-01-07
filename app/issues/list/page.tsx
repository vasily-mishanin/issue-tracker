import { prisma } from '@/prisma/client';
import IssueActions from './IssueActions';
import Pagination from '@/app/components/Pagination';
import IssuesTable from '../_components/IssuesTable';
import { Issue, Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
//import { delay } from '../utils/delay';

export type Column = { label: string; value: keyof Issue; className?: string };

export type IssueQuery = {
  page: string;
  status: Status;
  orderBy: keyof Issue;
  order: 'asc' | 'desc';
};

type Props = {
  searchParams: IssueQuery;
};

const validStatuses = Object.values(Status);
const ISSUES_PER_PAGE = 5;

const columns: Column[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

const columnNames = columns.map((col) => col.value);

async function IssuesPage({ searchParams }: Props) {
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.order }
    : undefined;

  const page = parseInt(searchParams.page) || 1;

  const pageIssues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * ISSUES_PER_PAGE,
    take: ISSUES_PER_PAGE,
  });

  const issuesCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction='column' gap='5'>
      <IssueActions />
      <IssuesTable
        columns={columns}
        searchParams={searchParams}
        issues={pageIssues}
      />
      <Pagination
        currentPage={page}
        itemsCount={issuesCount}
        pageSize={ISSUES_PER_PAGE}
      />
    </Flex>
  );
}

export const dynamic = 'force-dynamic'; // to always get last state from DB (no aggresive caching)
// OR
//export const revalidate = 0;
// export const revalidate = 60; // 60 seconds
export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issues Tracker - Issue List',
  description: 'View all project issues',
};
