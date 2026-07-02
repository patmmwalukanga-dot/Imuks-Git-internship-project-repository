'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

export default function Navbar() {
  return (
    // Set the background color to the deep green (#01381e)
    <AppBar position="static" sx={{ backgroundColor: '#01381e', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontFamily: 'sans-serif',
              fontWeight: 700,
              // Set the branding text to the light accent (#Dee2b1)
              color: '#Dee2b1',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            TrackerApp
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Set the button text colors to the light accent (#Dee2b1) */}
            <Button sx={{ color: '#Dee2b1', fontWeight: 600 }} component={Link} href="/">
              Home
            </Button>
            <Button sx={{ color: '#Dee2b1', fontWeight: 600 }} component={Link} href="/dashboard">
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
