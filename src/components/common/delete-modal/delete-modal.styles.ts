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

export const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d0dcc8;
  border-radius: 8px;
  background: #ffffff;
  color: #1a3a2a;
  cursor: pointer;

  &:hover {
    background: #f4f7f0;
  }
`

export const DeleteButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #b42318;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #912018;
  }
`