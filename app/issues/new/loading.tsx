import { Box } from '@radix-ui/themes';
import { delay } from '@/app/utils/delay';
import { Skeleton } from '@/app/components';

const LoadingNewIssuePage = async () => {
  await delay(1000);

  return (
    <Box className='max-w-xl'>
      <Skeleton width='5rem' />
      <Skeleton width='10rem' count={4} />
    </Box>
  );
};
export default LoadingNewIssuePage;
