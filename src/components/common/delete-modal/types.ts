export type DeleteModalProps = {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  title?: string
  description?: string
}