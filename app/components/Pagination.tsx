'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ itemsCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pagesCount = Math.ceil(itemsCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString()); // change key=value to new ones
    router.push('?' + params.toString());
  };

  if (pagesCount <= 1) return null;

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pagesCount}
      </Text>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage < 2}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage < 2}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        color='gray'
        variant='soft'
        disabled={currentPage >= pagesCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage >= pagesCount}
        onClick={() => changePage(pagesCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
