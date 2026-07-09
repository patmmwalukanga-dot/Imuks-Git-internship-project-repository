"use client";

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { NAV_ITEMS, NAVBAR_CONSTRAINTS } from './navbar-constants';
import { useNavbar } from './navbar-hooks';

export default function Navbar() {
  const { currentPathname } = useNavbar();
  const configStyles = NAVBAR_CONSTRAINTS.styles;

  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        backgroundColor: configStyles.backgroundColor,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingX: 2
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: configStyles.height }}>
        
        {/* Logo / Brand Name */}
        <Box sx={{ flexShrink: 0 }}>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Typography 
              variant="h6" 
              component="span"
              sx={{ fontWeight: 'bold', letterSpacing: '0.1em', color: '#ffffff' }}
            >
              IMUKS
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: configStyles.gap }}>
          {NAV_ITEMS.map((item) => {
            const isActive = currentPathname === item.href;
            
            return (
              <Link 
                key={item.href}
                href={item.href} 
                style={{ 
                  color: '#ffffff', 
                  textDecoration: 'none', 
                  fontWeight: isActive ? 700 : 500 
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </Box>

      </Toolbar>
    </AppBar>
  );
}