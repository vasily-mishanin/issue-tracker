'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

export type FilterStatus = { label: string; value?: Status };

const statuses: FilterStatus[] = [
  { label: 'All' },
  { label: 'Open', value: Status.OPEN },
  { label: 'In progress', value: Status.IN_PROGRESS },
  { label: 'Closed', value: Status.CLOSED },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
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
