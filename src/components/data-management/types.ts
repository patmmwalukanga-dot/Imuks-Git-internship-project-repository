export interface Record {
  id: string
  name: string
  category: string
  description: string
  status: string
  role: string
  email: string
  createdAt: string
}

export type RecordModalForm = Omit<Record, 'id' | 'createdAt'> & { id?: string }

export interface RecordModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (record: RecordModalForm) => void
  editRecord?: RecordModalForm | null
}

export interface RecordsTableProps {
  records: Record[]
  onEdit: (record: Record) => void
  onDelete: (id: string) => void
  userRole: string
}
