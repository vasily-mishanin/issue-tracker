import { Flex, Card, Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const LoadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>
      {/* <Heading>{issue.title}</Heading>  */}
      <Skeleton width='4rem' />
      <Flex gap='4' my='3' mb='4'>
        {/* <IssueStatusBadge status={issue.status} />  */}
        <Skeleton width='7rem' />
        {/* <p>{issue.createdAt.toDateString()}</p> */}
        <Skeleton width='5rem' />
      </Flex>

      <Card className='prose'>
        {/* <ReactMarkdown>{issue.description}</ReactMarkdown> */}
        <Skeleton width='15rem' count={4} />
      </Card>
    </Box>
  );
};
export default LoadingIssueDetailsPage;
