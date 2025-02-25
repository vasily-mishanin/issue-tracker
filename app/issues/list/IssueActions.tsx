import IssueStatusFilter from '@/app/issues/list/issueStatusFilter';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

const IssueActions = () => {
  return (
    <Flex justify={'between'}>
      <IssueStatusFilter />
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  );
};
export default IssueActions;
