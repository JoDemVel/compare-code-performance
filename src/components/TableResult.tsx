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
  data: Record<string, string | number>[];
}

export const TableResult = ({ titles, data }: TableResultProps) => {
  return (
    <Table className="table-auto">
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
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="text-center">
              {titles.map((title) => (
                <TableCell key={`${rowIndex}-${title}`}>
                  {row[title] !== undefined ? row[title] : '-'}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={titles.length} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
