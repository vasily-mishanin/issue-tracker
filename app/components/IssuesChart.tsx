'use client';

import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};

const IssuesChart = ({ open, closed, inProgress }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In-Progress', value: inProgress },
    { label: 'Issues', value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey={'label'} />
          <YAxis />
          <Bar
            dataKey={'value'}
            barSize={60}
            style={{ fill: 'var(--accent-9)' }} // from Radix UI theme
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
export default IssuesChart;
