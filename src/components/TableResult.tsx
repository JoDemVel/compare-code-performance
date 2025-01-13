import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableResultProps {
  titles: string[];
  data: any[];
}

export const TableResult = ({ titles, data }: TableResultProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {titles.map((title) => (
            <TableHead key={title} className="text-center">
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: { [key: string]: string | number }, index: number) => (
          <TableRow key={index} className="text-center">
            {titles.map((title) => (
              <TableCell key={title}>{row[title]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
