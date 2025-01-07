import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};

const IssuesSummary = ({ open, closed, inProgress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'Issues In-Progress', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex mb='8' gap='4'>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction='column' gap='2'>
            <Link href={`/issues/list?status=${container.status}`}>
              {container.label}
            </Link>
          </Flex>
          <Text size='5' className='text-bold'>
            {container.value}
          </Text>
        </Card>
      ))}
    </Flex>
  );
};
export default IssuesSummary;
