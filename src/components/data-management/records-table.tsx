'use client'

import { RecordsTableProps } from './types'
import { useRecordsTable } from './hooks'
import {
  TableWrapper,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Badge,
  Actions,
  ActionButton,
  EmptyState,
} from './styles'
import {
  BUTTON_EDIT,
  BUTTON_DELETE,
  EMPTY_STATE_MESSAGE,
} from './constants'

export default function RecordsTable({ records, onEdit, onDelete, userRole }: RecordsTableProps) {
  const { canEdit } = useRecordsTable({ userRole })

  if (records.length === 0) {
    return <EmptyState>{EMPTY_STATE_MESSAGE}</EmptyState>
  }

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Status</Th>
            <Th>Role</Th>
            <Th>Email</Th>
            <Th>Created</Th>
            {canEdit && <Th>Actions</Th>}
          </tr>
        </Thead>
        <tbody>
          {records.map((record, index) => (
            <Tr key={record.id} even={index % 2 === 0}>
              <Td style={{ fontWeight: 500 }}>{record.name}</Td>
              <Td style={{ color: '#7a9070' }}>{record.category}</Td>
              <Td>
                <Badge status={record.status}>{record.status}</Badge>
              </Td>
              <Td style={{ color: '#7a9070' }}>{record.role}</Td>
              <Td style={{ color: '#7a9070' }}>{record.email}</Td>
              <Td style={{ color: '#7a9070' }}>{record.createdAt}</Td>
              {canEdit && (
                <Td>
                  <Actions>
                    <ActionButton onClick={() => onEdit(record)}>{BUTTON_EDIT}</ActionButton>
                    <ActionButton danger onClick={() => onDelete(record.id)}>{BUTTON_DELETE}</ActionButton>
                  </Actions>
                </Td>
              )}
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  )
}