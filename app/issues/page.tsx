import { Button } from '@radix-ui/themes';
import Link from 'next/link';

function IssuesPage() {
  return (
    <div>
      <Button>
        <Link href='/issues/new'>NewIssue</Link>
      </Button>
    </div>
  );
}
export default IssuesPage;
