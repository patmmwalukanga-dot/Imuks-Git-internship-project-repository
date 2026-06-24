'use client'

import styled from 'styled-components'

type Record = {
  id: string
  name: string
  category: string
  description: string
  status: string
  role: string
  email: string
  createdAt: string
}

type Props = {
  records: Record[]
  onEdit: (record: Record) => void
  onDelete: (id: string) => void
  userRole: string
}

const TableWrapper = styled.div`
  border: 1px solid #d0dcc8;
  border-radius: 12px;
  overflow: hidden;
`

const Table = styled.table`
  width: 100%;
  font-size: 13px;
  border-collapse: collapse;
`

const Thead = styled.thead`
  background: #1a3a2a;
`

const Th = styled.th`
  text-align: left;
  padding: 10px 14px;
  color: #c8d96a;
  font-weight: 500;
  font-size: 12px;
`

const Tr = styled.tr<{ even?: boolean }>`
  background: ${p => p.even ? '#fff' : '#f9faf7'};
  &:hover td { background: #f0f5eb; }
`

const Td = styled.td`
  padding: 10px 14px;
  border-bottom: 1px solid #e8eed4;
  color: #2c3e28;
`

const Badge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 500;
  background: ${p =>
    p.status === 'Active' ? '#eaf3de' :
    p.status === 'Pending' ? '#faeeda' : '#f1efe8'};
  color: ${p =>
    p.status === 'Active' ? '#3b6d11' :
    p.status === 'Pending' ? '#854f0b' : '#5f5e5a'};
`

const Actions = styled.div`
  display: flex;
  gap: 6px;
`

const ActionButton = styled.button<{ danger?: boolean }>`
  border: 1px solid #d0dcc8;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 11px;
  cursor: pointer;
  background: none;
  color: ${p => p.danger ? '#ef4444' : '#1a3a2a'};
  &:hover {
    background: ${p => p.danger ? '#fef2f2' : '#e2edda'};
    border-color: ${p => p.danger ? '#ef4444' : '#1a3a2a'};
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #7a9070;
  font-size: 13px;
`

export default function RecordsTable({ records, onEdit, onDelete, userRole }: Props) {
  const canEdit = userRole === 'Admin' || userRole === 'Manager'

  if (records.length === 0) {
    return <EmptyState>No assets found. Click "Add asset" to create one.</EmptyState>
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
                    <ActionButton onClick={() => onEdit(record)}>Edit</ActionButton>
                    <ActionButton danger onClick={() => onDelete(record.id)}>Delete</ActionButton>
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