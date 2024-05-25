'use client';
import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UNASSIGNED = 'Unassigned';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  //const [users, setUsers] = useState<User[]>([]);

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       const { data } = await axios.get<User[]>('/api/users');
  //       setUsers(data);
  //     };

  //     fetchUsers();
  //   }, []);

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || UNASSIGNED} // not string but element with "value"
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId !== UNASSIGNED ? userId : null,
        });
      }}
    >
      <Select.Trigger placeholder='Assign...'></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={UNASSIGNED}>{UNASSIGNED}</Select.Item>
          {users && users.length
            ? users.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))
            : null}
          <Select.Item value='1'>Mosh Hamedani (hardcoded)</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
export default AssigneeSelect;
