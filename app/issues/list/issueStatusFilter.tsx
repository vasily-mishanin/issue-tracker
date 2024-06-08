'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export type FilterStatus = { label: string; value?: Status };

const statuses: FilterStatus[] = [
  { label: 'All' },
  { label: 'Open', value: Status.OPEN },
  { label: 'In progress', value: Status.IN_PROGRESS },
  { label: 'Closed', value: Status.CLOSED },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  const navigateToFiltered = (value: Status) => {
    const query = value ? `?status=${value}` : '';
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root onValueChange={navigateToFiltered}>
      <Select.Trigger placeholder='Filter by status..' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
export default IssueStatusFilter;
