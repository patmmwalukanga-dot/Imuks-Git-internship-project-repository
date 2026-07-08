import styled from 'styled-components'

// Page styled components
export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f4f7f0;
`

export const Main = styled.main`
  flex: 1;
  padding: 24px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #1a3a2a;
  margin: 0;
`

export const PageSub = styled.p`
  font-size: 13px;
  color: #7a9070;
  margin: 4px 0 0;
`

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const RoleSelect = styled.select`
  border: 1px solid #d0dcc8;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  background: #fff;
  color: #1a3a2a;
  outline: none;
`

export const AddButton = styled.button`
  background: #1a3a2a;
  color: #c8d96a;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`

export const StatCard = styled.div`
  background: #fff;
  border: 1px solid #d0dcc8;
  border-radius: 12px;
  padding: 16px;
`

export const StatLabel = styled.p`
  font-size: 12px;
  color: #7a9070;
  margin: 0 0 4px;
`

export const StatValue = styled.p<{ color?: string }>`
  font-size: 24px;
  font-weight: 500;
  color: ${p => p.color || '#1a3a2a'};
  margin: 0;
`

export const SearchInput = styled.input`
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

export const LoadingText = styled.div`
  text-align: center;
  padding: 48px;
  color: #7a9070;
  font-size: 13px;
`

// RecordModal styled components
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

export const Modal = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d0dcc8;
  padding: 24px;
  width: 100%;
  max-width: 440px;
  margin: 0 16px;
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ModalTitle = styled.h2`
  font-size: 15px;
  font-weight: 500;
  color: #1a3a2a;
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #7a9070;
  cursor: pointer;
  &:hover { color: #1a3a2a; }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`

export const FormGroup = styled.div`
  margin-bottom: 12px;
`

export const Label = styled.label`
  font-size: 11px;
  color: #7a9070;
  display: block;
  margin-bottom: 4px;
`

export const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  border: 1px solid ${p => p.$error ? '#ef4444' : '#d0dcc8'};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  background: #f4f7f0;
  color: #1a3a2a;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #1a3a2a; }
`

export const Select = styled.select`
  width: 100%;
  border: 1px solid #d0dcc8;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  background: #f4f7f0;
  color: #1a3a2a;
  outline: none;
  box-sizing: border-box;
`

export const Textarea = styled.textarea<{ $error?: boolean }>`
  width: 100%;
  border: 1px solid ${p => p.$error ? '#ef4444' : '#d0dcc8'};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  background: #f4f7f0;
  color: #1a3a2a;
  outline: none;
  resize: none;
  box-sizing: border-box;
`

export const ErrorText = styled.p`
  font-size: 11px;
  color: #ef4444;
  margin: 4px 0 0;
`

export const Footer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
`

export const CancelButton = styled.button`
  border: 1px solid #d0dcc8;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  color: #7a9070;
  background: none;
  cursor: pointer;
  &:hover { background: #f4f7f0; }
`

export const SaveButton = styled.button`
  background: #1a3a2a;
  color: #c8d96a;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 13px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`

// RecordsTable styled components
export const TableWrapper = styled.div`
  border: 1px solid #d0dcc8;
  border-radius: 12px;
  overflow: hidden;
`

export const Table = styled.table`
  width: 100%;
  font-size: 13px;
  border-collapse: collapse;
`

export const Thead = styled.thead`
  background: #1a3a2a;
`

export const Th = styled.th`
  text-align: left;
  padding: 10px 14px;
  color: #c8d96a;
  font-weight: 500;
  font-size: 12px;
`

export const Tr = styled.tr<{ even?: boolean }>`
  background: ${p => p.even ? '#fff' : '#f9faf7'};
  &:hover td { background: #f0f5eb; }
`

export const Td = styled.td`
  padding: 10px 14px;
  border-bottom: 1px solid #e8eed4;
  color: #2c3e28;
`

export const Badge = styled.span<{ status: string }>`
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

export const Actions = styled.div`
  display: flex;
  gap: 6px;
`

export const ActionButton = styled.button<{ danger?: boolean }>`
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

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #7a9070;
  font-size: 13px;
`

// Sidebar styled components
export const SidebarWrapper = styled.div<{ $dark: boolean }>`
  display: flex;
  flex-direction: column;
  width: 192px;
  min-height: 100vh;
  background: ${p => p.$dark ? '#1a3a2a' : '#f4f7f0'};
  border-right: ${p => p.$dark ? 'none' : '1px solid #d0dcc8'};
`

export const LogoArea = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  border-bottom: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.1)' : '#d0dcc8'};
`

export const LogoIcon = styled.div`
  width: 28px;
  height: 28px;
  background: #c8d96a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: #1a3a2a;
`

export const LogoTitle = styled.div<{ $dark: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${p => p.$dark ? '#c8d96a' : '#1a3a2a'};
`

export const LogoSub = styled.div<{ $dark: boolean }>`
  font-size: 10px;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.4)' : '#7a9070'};
`

export const Nav = styled.nav`
  flex: 1;
  padding: 12px 0;
`

export const NavButton = styled.button<{ $active: boolean; $dark: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${p => p.$active ? '8px 14px' : '8px 16px'};
  font-size: 13px;
  text-align: left;
  border: none;
  border-left: ${p => p.$active ? '2px solid' : '2px solid transparent'};
  border-left-color: ${p => p.$active ? (p.$dark ? '#c8d96a' : '#1a3a2a') : 'transparent'};
  cursor: pointer;
  background: ${p => p.$active
    ? p.$dark ? 'rgba(200,217,106,0.15)' : '#e2edda'
    : 'transparent'};
  color: ${p => p.$active
    ? p.$dark ? '#c8d96a' : '#1a3a2a'
    : p.$dark ? 'rgba(255,255,255,0.55)' : '#4a6a40'};
  font-weight: ${p => p.$active && !p.$dark ? '500' : 'normal'};
  &:hover {
    color: ${p => p.$dark ? 'rgba(255,255,255,0.8)' : '#1a3a2a'};
    background: ${p => !p.$active && !p.$dark ? '#e2edda' : ''};
  }
`

export const ThemeArea = styled.div<{ $dark: boolean }>`
  padding: 12px 16px;
  border-top: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.1)' : '#d0dcc8'};
`

export const ThemeButton = styled.button<{ $dark: boolean }>`
  width: 100%;
  font-size: 12px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.2)' : '#d0dcc8'};
  background: transparent;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.5)' : '#7a9070'};
  cursor: pointer;
  &:hover {
    color: ${p => p.$dark ? 'rgba(255,255,255,0.8)' : '#1a3a2a'};
  }
`

export const UserArea = styled.div<{ $dark: boolean }>`
  padding: 16px;
  border-top: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.1)' : '#d0dcc8'};
  display: flex;
  align-items: center;
  gap: 8px;
`

export const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(200,217,106,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c8d96a;
  font-size: 12px;
`

export const UserName = styled.div<{ $dark: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${p => p.$dark ? '#fff' : '#1a3a2a'};
`

export const UserRole = styled.div<{ $dark: boolean }>`
  font-size: 10px;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.4)' : '#7a9070'};
`
