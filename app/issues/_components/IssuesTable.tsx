import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { IssueStatusBadge, Link } from '../../components';
import { Column, IssueQuery } from '../list/page';

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
  columns: Column[];
};

const IssuesTable = ({ searchParams, issues, columns }: Props) => {
  return (
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
        {issues.map((issue) => (
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
  );
};
export default IssuesTable;
