'use client'

import { RecordModalProps } from './types'
import { useRecordModal } from './hooks'
import {
  Overlay,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Grid,
  FormGroup,
  Label,
  Input,
  Select,
  Textarea,
  ErrorText,
  Footer,
  CancelButton,
  SaveButton,
} from './styles'
import {
  MODAL_TITLE_EDIT,
  MODAL_TITLE_ADD,
  CLOSE_ICON,
  FIELD_LABEL_NAME,
  FIELD_LABEL_CATEGORY,
  FIELD_LABEL_DESCRIPTION,
  FIELD_LABEL_STATUS,
  FIELD_LABEL_ROLE,
  FIELD_LABEL_EMAIL,
  PLACEHOLDER_NAME,
  PLACEHOLDER_DESCRIPTION,
  PLACEHOLDER_EMAIL,
  BUTTON_CANCEL,
  BUTTON_SAVE_ASSET,
} from './constants'

export default function RecordModal({ isOpen, onClose, onSave, editRecord }: RecordModalProps) {
  const { form, setForm, errors, handleSubmit } = useRecordModal({
    isOpen,
    editRecord,
    onSave,
  })

  if (!isOpen) return null

  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <ModalTitle>{editRecord ? MODAL_TITLE_EDIT : MODAL_TITLE_ADD}</ModalTitle>
          <CloseButton onClick={onClose}>{CLOSE_ICON}</CloseButton>
        </ModalHeader>
        <Grid>
          <FormGroup>
            <Label>{FIELD_LABEL_NAME}</Label>
            <Input
              $error={!!errors.name}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder={PLACEHOLDER_NAME}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label>{FIELD_LABEL_CATEGORY}</Label>
            <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option>Security</option>
              <option>Compliance</option>
              <option>Operations</option>
            </Select>
          </FormGroup>
        </Grid>
        <FormGroup>
          <Label>{FIELD_LABEL_DESCRIPTION}</Label>
          <Textarea
            $error={!!errors.description}
            rows={2}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder={PLACEHOLDER_DESCRIPTION}
          />
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
        </FormGroup>
        <Grid>
          <FormGroup>
            <Label>{FIELD_LABEL_STATUS}</Label>
            <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>{FIELD_LABEL_ROLE}</Label>
            <Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Viewer</option>
            </Select>
          </FormGroup>
        </Grid>
        <FormGroup>
          <Label>{FIELD_LABEL_EMAIL}</Label>
          <Input
            $error={!!errors.email}
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder={PLACEHOLDER_EMAIL}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </FormGroup>
        <Footer>
          <CancelButton onClick={onClose}>{BUTTON_CANCEL}</CancelButton>
          <SaveButton onClick={handleSubmit}>{BUTTON_SAVE_ASSET}</SaveButton>
        </Footer>
      </Modal>
    </Overlay>
  )
}