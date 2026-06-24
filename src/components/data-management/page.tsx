'use client'

import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Sidebar from './sidebar'
import RecordsTable from './records-table'
import RecordModal from './record-modal'

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

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f4f7f0;
`

const Main = styled.main`
  flex: 1;
  padding: 24px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #1a3a2a;
  margin: 0;
`

const PageSub = styled.p`
  font-size: 13px;
  color: #7a9070;
  margin: 4px 0 0;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const RoleSelect = styled.select`
  border: 1px solid #d0dcc8;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  background: #fff;
  color: #1a3a2a;
  outline: none;
`

const AddButton = styled.button`
  background: #1a3a2a;
  color: #c8d96a;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`

const StatCard = styled.div`
  background: #fff;
  border: 1px solid #d0dcc8;
  border-radius: 12px;
  padding: 16px;
`

const StatLabel = styled.p`
  font-size: 12px;
  color: #7a9070;
  margin: 0 0 4px;
`

const StatValue = styled.p<{ color?: string }>`
  font-size: 24px;
  font-weight: 500;
  color: ${p => p.color || '#1a3a2a'};
  margin: 0;
`

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #d0dcc8;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  background: #fff;
  color: #1a3a2a;
  outline: none;
  margin-bottom: 16px;
  box-sizing: border-box;
  &:focus { border-color: #1a3a2a; }
`

const LoadingText = styled.div`
  text-align: center;
  padding: 48px;
  color: #7a9070;
  font-size: 13px;
`

export default function DataManagementPage() {
  const [records, setRecords] = useState<Record[]>([])
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editRecord, setEditRecord] = useState<Record | null>(null)
  const [userRole, setUserRole] = useState('Admin')
  const [loading, setLoading] = useState(true)
  const filtered = useMemo(() => {
  const q = search.toLowerCase()
  return records.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q)
  )
}, [search, records])

  useEffect(() => {
    fetchRecords()
  }, [])

  async function fetchRecords() {
    setLoading(true)
    const res = await fetch('/api/records')
    const data = await res.json()
    const recordsArray = Array.isArray(data) ? data : []
    setRecords(recordsArray)
    setLoading(false)
  }

  async function handleSave(form: Omit<Record, 'id' | 'createdAt'>) {
    if (editRecord) {
      await fetch('/api/records', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editRecord.id })
      })
    } else {
      await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
    }
    setIsModalOpen(false)
    setEditRecord(null)
    fetchRecords()
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this asset?')) return
    await fetch('/api/records', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchRecords()
  }

  function handleEdit(record: Record) {
    setEditRecord(record)
    setIsModalOpen(true)
  }

  const total = records.length
  const active = records.filter(r => r.status === 'Active').length
  const pending = records.filter(r => r.status === 'Pending').length

  return (
    <Layout>
      <Sidebar />
      <Main>
        <Header>
          <div>
            <PageTitle>Asset records</PageTitle>
            <PageSub>Manage all system assets</PageSub>
          </div>
          <Controls>
            <RoleSelect value={userRole} onChange={e => setUserRole(e.target.value)}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Viewer</option>
            </RoleSelect>
            {(userRole === 'Admin' || userRole === 'Manager') && (
              <AddButton onClick={() => { setEditRecord(null); setIsModalOpen(true) }}>
                + Add asset
              </AddButton>
            )}
          </Controls>
        </Header>
        <StatsGrid>
          <StatCard>
            <StatLabel>Total assets</StatLabel>
            <StatValue>{total}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Active</StatLabel>
            <StatValue color="#3b6d11">{active}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Pending</StatLabel>
            <StatValue color="#854f0b">{pending}</StatValue>
          </StatCard>
        </StatsGrid>
        <SearchInput
          placeholder="Search by name, category or status..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {loading ? (
          <LoadingText>Loading assets...</LoadingText>
        ) : (
          <RecordsTable
            records={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
            userRole={userRole}
          />
        )}
      </Main>
      <RecordModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditRecord(null) }}
        onSave={handleSave}
        editRecord={editRecord}
      />
    </Layout>
  )
}