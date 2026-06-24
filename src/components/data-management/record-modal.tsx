'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'

type Record = {
  id?: string
  name: string
  category: string
  description: string
  status: string
  role: string
  email: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (record: Record) => void
  editRecord?: Record | null
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

const Modal = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d0dcc8;
  padding: 24px;
  width: 100%;
  max-width: 440px;
  margin: 0 16px;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  font-size: 15px;
  font-weight: 500;
  color: #1a3a2a;
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #7a9070;
  cursor: pointer;
  &:hover { color: #1a3a2a; }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`

const FormGroup = styled.div`
  margin-bottom: 12px;
`

const Label = styled.label`
  font-size: 11px;
  color: #7a9070;
  display: block;
  margin-bottom: 4px;
`

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  border: 1px solid ${p => p.error ? '#ef4444' : '#d0dcc8'};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  background: #f4f7f0;
  color: #1a3a2a;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #1a3a2a; }
`

const Select = styled.select`
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

const Textarea = styled.textarea<{ error?: boolean }>`
  width: 100%;
  border: 1px solid ${p => p.error ? '#ef4444' : '#d0dcc8'};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  background: #f4f7f0;
  color: #1a3a2a;
  outline: none;
  resize: none;
  box-sizing: border-box;
`

const ErrorText = styled.p`
  font-size: 11px;
  color: #ef4444;
  margin: 4px 0 0;
`

const Footer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
`

const CancelButton = styled.button`
  border: 1px solid #d0dcc8;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  color: #7a9070;
  background: none;
  cursor: pointer;
  &:hover { background: #f4f7f0; }
`

const SaveButton = styled.button`
  background: #1a3a2a;
  color: #c8d96a;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 13px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`

export default function RecordModal({ isOpen, onClose, onSave, editRecord }: Props) {
  const [form, setForm] = useState<Record>({
    name: '', category: 'Security', description: '',
    status: 'Active', role: 'Viewer', email: ''
  })
  const [errors, setErrors] = useState<Partial<Record>>({})

  useEffect(() => {
  setTimeout(() => {
    if (editRecord) {
      setForm(editRecord as Record)
    } else {
      setForm({ name: '', category: 'Security', description: '', status: 'Active', role: 'Viewer', email: '' })
    }
    setErrors({})
  }, 0)
}, [editRecord, isOpen])

  function validate() {
    const newErrors: Partial<Record> = {}
    if (!form.name.trim()) newErrors.name = 'Asset name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (validate()) onSave(form)
  }

  if (!isOpen) return null

  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <ModalTitle>{editRecord ? 'Edit asset' : 'Add new asset'}</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <Grid>
          <FormGroup>
            <Label>Asset name *</Label>
            <Input
              error={!!errors.name}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Asset #1004"
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label>Category *</Label>
            <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option>Security</option>
              <option>Compliance</option>
              <option>Operations</option>
            </Select>
          </FormGroup>
        </Grid>
        <FormGroup>
          <Label>Description *</Label>
          <Textarea
            error={!!errors.description}
            rows={2}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Brief description..."
          />
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
        </FormGroup>
        <Grid>
          <FormGroup>
            <Label>Status *</Label>
            <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Assigned role</Label>
            <Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Viewer</option>
            </Select>
          </FormGroup>
        </Grid>
        <FormGroup>
          <Label>Email *</Label>
          <Input
            error={!!errors.email}
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="email@greenshield.com"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </FormGroup>
        <Footer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton onClick={handleSubmit}>Save asset</SaveButton>
        </Footer>
      </Modal>
    </Overlay>
  )
}