import Link from 'next/link';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        backgroundColor: '#01381e', // Your brand deep green
        borderBottom: '1px solid rgba(222, 226, 177, 0.2)',
        paddingX: 2
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: 64 }}>
        
        {/* Logo / Brand Name */}
        <Box sx={{ flexShrink: 0 }}>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Typography 
              variant="h6" 
              component="span"
              sx={{ 
                fontWeight: 'bold', 
                letterSpacing: '0.1em', 
                color: '#Dee2b1' // Your brand cream-sage
              }}
            >
              IMUKS
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Link 
            href="/" 
            style={{ 
              color: '#Dee2b1', 
              textDecoration: 'none', 
              fontWeight: 500 
            }}
          >
            Home
          </Link>
          
          <Link 
            href="/about" 
            style={{ 
              color: '#Dee2b1', 
              textDecoration: 'none', 
              fontWeight: 500 
            }}
          >
            About
          </Link>
          
          <Link 
            href="/contact" 
            style={{ 
              color: '#Dee2b1', 
              textDecoration: 'none', 
              fontWeight: 500 
            }}
          >
            Contact
          </Link>
        </Box>

      </Toolbar>
    </AppBar>
  );
}