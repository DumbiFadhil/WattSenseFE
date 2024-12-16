import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const DataTable = ({ data }) => {
  if (!data || !data.csv_data) return null

  const headers = Object.keys(data.csv_data)
  const rows = data.csv_data[headers[0]].map((_, idx) => {
    return headers.map((header) => data.csv_data[header][idx])
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, idx) => (
            <TableHead key={idx}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {row.map((cell, cellIdx) => (
              <TableCell key={cellIdx}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DataTable
