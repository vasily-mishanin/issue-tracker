import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

type Props = {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ itemsCount, pageSize, currentPage }: Props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount <= 1) return null;

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pagesCount}
      </Text>
      <Button color='gray' variant='soft' disabled={currentPage < 2}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage < 2}>
        <ChevronLeftIcon />
      </Button>

      <Button color='gray' variant='soft' disabled={currentPage >= pagesCount}>
        <ChevronRightIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage >= pagesCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
