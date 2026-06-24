'use client'

import { useState } from 'react'
import styled from 'styled-components'

const navItems = [
  { label: 'Dashboard', icon: '⊞' },
  { label: 'Records', icon: '◫' },
  { label: 'Users', icon: '👤' },
  { label: 'Reports', icon: '📊' },
  { label: 'Settings', icon: '⚙️' },
]

const SidebarWrapper = styled.div<{ $dark: boolean }>`
  display: flex;
  flex-direction: column;
  width: 192px;
  min-height: 100vh;
  background: ${p => p.$dark ? '#1a3a2a' : '#f4f7f0'};
  border-right: ${p => p.$dark ? 'none' : '1px solid #d0dcc8'};
`

const LogoArea = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  border-bottom: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.1)' : '#d0dcc8'};
`

const LogoIcon = styled.div`
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

const LogoTitle = styled.div<{ $dark: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${p => p.$dark ? '#c8d96a' : '#1a3a2a'};
`

const LogoSub = styled.div<{ $dark: boolean }>`
  font-size: 10px;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.4)' : '#7a9070'};
`

const Nav = styled.nav`
  flex: 1;
  padding: 12px 0;
`

const NavButton = styled.button<{ $active: boolean; $dark: boolean }>`
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

const ThemeArea = styled.div<{ $dark: boolean }>`
  padding: 12px 16px;
  border-top: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.1)' : '#d0dcc8'};
`

const ThemeButton = styled.button<{ $dark: boolean }>`
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

const UserArea = styled.div<{ $dark: boolean }>`
  padding: 16px;
  border-top: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.1)' : '#d0dcc8'};
  display: flex;
  align-items: center;
  gap: 8px;
`

const UserAvatar = styled.div`
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

const UserName = styled.div<{ $dark: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${p => p.$dark ? '#fff' : '#1a3a2a'};
`

const UserRole = styled.div<{ $dark: boolean }>`
  font-size: 10px;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.4)' : '#7a9070'};
`

export default function Sidebar() {
  const [active, setActive] = useState('Records')
  const [dark, setDark] = useState(true)

  return (
    <SidebarWrapper $dark={dark}>
      <LogoArea $dark={dark}>
        <LogoIcon>G</LogoIcon>
        <div>
          <LogoTitle $dark={dark}>GreenShield</LogoTitle>
          <LogoSub $dark={dark}>Secure. Reliable.</LogoSub>
        </div>
      </LogoArea>
      <Nav>
        {navItems.map(item => (
          <NavButton
            key={item.label}
            $active={active === item.label}
            $dark={dark}
            onClick={() => setActive(item.label)}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavButton>
        ))}
      </Nav>
      <ThemeArea $dark={dark}>
        <ThemeButton $dark={dark} onClick={() => setDark(!dark)}>
          {dark ? '☀ Light theme' : '🌙 Dark theme'}
        </ThemeButton>
      </ThemeArea>
      <UserArea $dark={dark}>
        <UserAvatar>A</UserAvatar>
        <div>
          <UserName $dark={dark}>Admin User</UserName>
          <UserRole $dark={dark}>Administrator</UserRole>
        </div>
      </UserArea>
    </SidebarWrapper>
  )
}