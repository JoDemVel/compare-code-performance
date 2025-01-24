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
  data: unknown[];
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
        {(data as { [key: string]: string | number }[]).map((row, index) => (
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
