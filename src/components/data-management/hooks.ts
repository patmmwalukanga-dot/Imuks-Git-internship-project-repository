import { useState, useEffect, useMemo } from 'react'
import { Record, RecordModalForm } from './types'
import {
  API_ENDPOINTS,
  DELETE_CONFIRM_MESSAGE,
  ERROR_NAME_REQUIRED,
  ERROR_EMAIL_REQUIRED,
  ERROR_EMAIL_INVALID,
  ERROR_DESCRIPTION_REQUIRED,
} from './constants'

export function useDataManagementPage() {
  const [records, setRecords] = useState<Record[]>([])
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editRecord, setEditRecord] = useState<Record | null>(null)
  const [userRole, setUserRole] = useState('Admin')
  const [loading, setLoading] = useState(true)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return records.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    )
  }, [search, records])

  useEffect(() => {
    fetchRecords()
  }, [])

  async function fetchRecords() {
    setLoading(true)
    const res = await fetch(API_ENDPOINTS.RECORDS)
    const data = await res.json()
    const recordsArray = Array.isArray(data) ? data : []
    setRecords(recordsArray)
    setLoading(false)
  }

  async function handleSave(form: RecordModalForm) {
    if (editRecord) {
      await fetch(API_ENDPOINTS.RECORDS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editRecord.id }),
      })
    } else {
      await fetch(API_ENDPOINTS.RECORDS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    setIsModalOpen(false)
    setEditRecord(null)
    fetchRecords()
  }

  async function handleDelete(id: string) {
    if (!confirm(DELETE_CONFIRM_MESSAGE)) return
    await fetch(API_ENDPOINTS.RECORDS, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
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

  return {
    records,
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
  }
}

export function useRecordModal({
  isOpen,
  editRecord,
  onSave,
}: {
  isOpen: boolean
  editRecord?: RecordModalForm | null
  onSave: (record: RecordModalForm) => void
}) {
  const [form, setForm] = useState<RecordModalForm>({
    name: '',
    category: 'Security',
    description: '',
    status: 'Active',
    role: 'Viewer',
    email: '',
  })
  const [errors, setErrors] = useState<Partial<RecordModalForm>>({})

  useEffect(() => {
    const timer = setTimeout(() => {
      if (editRecord) {
        setForm({ ...editRecord })
      } else {
        setForm({
          name: '',
          category: 'Security',
          description: '',
          status: 'Active',
          role: 'Viewer',
          email: '',
        })
      }
      setErrors({})
    }, 0)
    return () => clearTimeout(timer)
  }, [isOpen, editRecord])

  function validate() {
    const newErrors: Partial<RecordModalForm> = {}
    if (!form.name.trim()) newErrors.name = ERROR_NAME_REQUIRED
    if (!form.email.trim()) newErrors.email = ERROR_EMAIL_REQUIRED
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = ERROR_EMAIL_INVALID
    if (!form.description.trim()) newErrors.description = ERROR_DESCRIPTION_REQUIRED
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (validate()) onSave(form)
  }

  return {
    form,
    setForm,
    errors,
    handleSubmit,
  }
}

export function useRecordsTable({ userRole }: { userRole: string }) {
  const canEdit = userRole === 'Admin' || userRole === 'Manager'
  return { canEdit }
}

export function useSidebar() {
  const [active, setActive] = useState('Records')
  const [dark, setDark] = useState(true)

  return {
    active,
    setActive,
    dark,
    setDark,
  }
}
