'use client'

import Sidebar from './sidebar'
import RecordsTable from './records-table'
import RecordModal from './record-modal'
import { useDataManagementPage } from './hooks'
import {
  Layout,
  Main,
  Header,
  PageTitle,
  PageSub,
  Controls,
  RoleSelect,
  AddButton,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  SearchInput,
  LoadingText,
} from './styles'
import {
  PAGE_TITLE,
  PAGE_SUBTITLE,
  ADD_ASSET_BUTTON,
  SEARCH_PLACEHOLDER,
  LOADING_ASSETS,
  STAT_TOTAL_ASSETS,
  STAT_ACTIVE,
  STAT_PENDING,
} from './constants'

export default function DataManagementPage() {
  const {
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editRecord,
    setEditRecord,
    userRole,
    setUserRole,
    loading,
    filtered,
    handleSave,
    handleDelete,
    handleEdit,
    total,
    active,
    pending,
  } = useDataManagementPage()

  return (
    <Layout>
      <Sidebar />
      <Main>
        <Header>
          <div>
            <PageTitle>{PAGE_TITLE}</PageTitle>
            <PageSub>{PAGE_SUBTITLE}</PageSub>
          </div>
          <Controls>
            <RoleSelect value={userRole} onChange={e => setUserRole(e.target.value)}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Viewer</option>
            </RoleSelect>
            {(userRole === 'Admin' || userRole === 'Manager') && (
              <AddButton onClick={() => { setEditRecord(null); setIsModalOpen(true) }}>
                {ADD_ASSET_BUTTON}
              </AddButton>
            )}
          </Controls>
        </Header>
        <StatsGrid>
          <StatCard>
            <StatLabel>{STAT_TOTAL_ASSETS}</StatLabel>
            <StatValue>{total}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>{STAT_ACTIVE}</StatLabel>
            <StatValue color="#3b6d11">{active}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>{STAT_PENDING}</StatLabel>
            <StatValue color="#854f0b">{pending}</StatValue>
          </StatCard>
        </StatsGrid>
        <SearchInput
          placeholder={SEARCH_PLACEHOLDER}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {loading ? (
          <LoadingText>{LOADING_ASSETS}</LoadingText>
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