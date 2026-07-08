'use client'

import { useSidebar } from './hooks'
import {
  SidebarWrapper,
  LogoArea,
  LogoIcon,
  LogoTitle,
  LogoSub,
  Nav,
  NavButton,
  ThemeArea,
  ThemeButton,
  UserArea,
  UserAvatar,
  UserName,
  UserRole,
} from './styles'
import {
  LOGO_ICON_TEXT,
  LOGO_TITLE,
  LOGO_SUBTITLE,
  NAV_ITEMS,
  BUTTON_LIGHT_THEME,
  BUTTON_DARK_THEME,
  USER_AVATAR_TEXT,
  USER_NAME,
  USER_ROLE,
} from './constants'

export default function Sidebar() {
  const { active, setActive, dark, setDark } = useSidebar()

  return (
    <SidebarWrapper $dark={dark}>
      <LogoArea $dark={dark}>
        <LogoIcon>{LOGO_ICON_TEXT}</LogoIcon>
        <div>
          <LogoTitle $dark={dark}>{LOGO_TITLE}</LogoTitle>
          <LogoSub $dark={dark}>{LOGO_SUBTITLE}</LogoSub>
        </div>
      </LogoArea>
      <Nav>
        {NAV_ITEMS.map(item => (
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
          {dark ? BUTTON_LIGHT_THEME : BUTTON_DARK_THEME}
        </ThemeButton>
      </ThemeArea>
      <UserArea $dark={dark}>
        <UserAvatar>{USER_AVATAR_TEXT}</UserAvatar>
        <div>
          <UserName $dark={dark}>{USER_NAME}</UserName>
          <UserRole $dark={dark}>{USER_ROLE}</UserRole>
        </div>
      </UserArea>
    </SidebarWrapper>
  )
}