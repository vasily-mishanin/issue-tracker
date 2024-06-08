import Pagination from './components/Pagination';

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <Pagination
        currentPage={+searchParams.page || 1}
        itemsCount={100}
        pageSize={10}
      />
    </div>
  );
}
