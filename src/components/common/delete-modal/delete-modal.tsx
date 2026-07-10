import { Overlay, ModalContainer, Actions } from './delete-modal.styles'

type DeleteModalProps = {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function DeleteModal({
  isOpen,
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  if (!isOpen) return null

  return (
    <Overlay>
      <ModalContainer>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this item?</p>

        <Actions>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </Actions>
      </ModalContainer>
    </Overlay>
  )
}