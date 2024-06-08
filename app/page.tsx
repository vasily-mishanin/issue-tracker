import Pagination from './components/Pagination';

export default function Home() {
  return (
    <div>
      <Pagination currentPage={3} itemsCount={100} pageSize={10} />
    </div>
  );
}
