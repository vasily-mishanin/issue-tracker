'use client';
import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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

  const { data: users, error, isLoading } = useUsers();

  const assignIssue = (userId: string) => {
    axios
      .patch(`/xapi/issues/${issue.id}`, {
        assignedToUserId: userId !== UNASSIGNED ? userId : null,
      })
      .catch((err) => {
        toast.error('Changes could not be saved');
      });
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || UNASSIGNED} // not string but element with "value"
        onValueChange={assignIssue}
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data), // thought: API endpoint is a contract with an outer world and should not be changed
    staleTime: 60 * 1000, // 60s depends on app requirements
    retry: 3,
  });

export default AssigneeSelect;
