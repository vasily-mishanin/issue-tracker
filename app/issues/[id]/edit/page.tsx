import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

type Props = {
  params: { id: string };
};

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma?.issue.findUnique({ where: { id: +params.id } });

  if (!issue) {
    return notFound();
  }

  return <IssueForm issue={issue} />;
};
export default EditIssuePage;
