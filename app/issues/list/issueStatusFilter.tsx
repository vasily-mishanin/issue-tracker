'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

export type FilterStatus = { label: string; value?: Status };

const statuses: FilterStatus[] = [
  { label: 'All' },
  { label: 'Open', value: Status.OPEN },
  { label: 'In progress', value: Status.IN_PROGRESS },
  { label: 'Closed', value: Status.CLOSED },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToFiltered = (status: Status) => {
    console.log('navigateToFiltered');
    const queryParams = new URLSearchParams();
    if (status) {
      queryParams.append('status', status);
    }
    if (searchParams.get('orderBy')) {
      queryParams.append('orderBy', searchParams.get('orderBy')!);
    }
    if (searchParams.get('order')) {
      queryParams.append('order', searchParams.get('order')!);
    }

    console.log(queryParams);
    router.push(`/issues/list${queryParams.size ? '?' + queryParams : ''}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status') ?? 'all'}
      onValueChange={navigateToFiltered}
    >
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
