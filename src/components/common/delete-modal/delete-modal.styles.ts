import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 350px;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`