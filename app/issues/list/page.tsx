import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { IssueStatusBadge, Link } from '../../components';
import NextLink from 'next/link';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';
//import { delay } from '../utils/delay';

type Props = {
  searchParams: {
    page: string;
    status: Status;
    orderBy: keyof Issue;
    order: 'asc' | 'desc';
  };
};

const validStatuses = Object.values(Status);
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

const ISSUES_PER_PAGE = 5;

async function IssuesPage({ searchParams }: Props) {
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns.map((col) => col.value).includes(searchParams.orderBy)
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
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.value} className={col.className}>
                {/* <NextLink href={`/issues/list?orderBy=${col.value}`}>
                  {col.label}
                </NextLink> */}
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: col.value,
                      order: searchParams.order === 'asc' ? 'desc' : 'asc',
                    },
                  }}
                >
                  {col.label}
                  {col.value === searchParams.orderBy &&
                    searchParams.order === 'asc' && (
                      <ArrowUpIcon className='inline' />
                    )}
                  {col.value === searchParams.orderBy &&
                    searchParams.order === 'desc' && (
                      <ArrowDownIcon className='inline' />
                    )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pageIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        itemsCount={issuesCount}
        pageSize={ISSUES_PER_PAGE}
      />
    </div>
  );
}

export const dynamic = 'force-dynamic'; // to always get last state from DB (no aggresive caching)
// OR
//export const revalidate = 0;
// export const revalidate = 60; // 60 seconds
export default IssuesPage;
