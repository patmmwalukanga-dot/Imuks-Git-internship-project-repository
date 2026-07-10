import { Overlay, ModalContainer, Actions } from './delete-modal.styles'
import { DeleteModalProps } from './types'

export default function DeleteModal({
  isOpen,
  onCancel,
  onConfirm,
  title = 'Confirm Delete',
  description = 'Are you sure you want to delete this item?',
}: DeleteModalProps) {
  if (!isOpen) return null

  return (
  <Overlay>
    <ModalContainer
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">{title}</h2>

      <p>{description}</p>

      <Actions>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </Actions>
    </ModalContainer>
  </Overlay>
)
}
