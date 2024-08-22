// import { SignedIn, SignIn } from "@clerk/nextjs";
// import { AppBar, Button, Container, Toolbar, Typography, Box} from "@mui/material";
// import Link from 'next/link'; // Import Link from next/link

// export default function SignUpPage() {
//   return (
//     <Container maxWidth="sm">
//       <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Algocards AI
//           </Typography>
          
//           <Link href="/login" passHref>
//             <Button color="inherit">
//               Log in
//             </Button>
//           </Link>

//           <Link href="/signup" passHref>
//             <Button color="inherit">
//               Sign up
//             </Button>
//           </Link>
//         </Toolbar>
//       </AppBar>
//       <Box
//         display = "flex"
//         flexDirection = "column"
//         alignItems = "center"
//         justifyContent = "center"
//       > 
//         <Typography variant="h4" component="h1" gutterBottom>
//           Sign in
//         </Typography>
//         <SignIn/>
//       </Box>



//     </Container>
//   );
// }
import { SignedIn, SignIn } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box } from "@mui/material";
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: "#3f51b5", 
          padding: '1rem', 
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', 
          height: '80px' 
        }}>
        <Toolbar>
          <Typography 
            variant="h5" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold', 
              letterSpacing: '0.5px',
              color: '#FFFFFF' // Set title color to white
            }}>
            Algocards AI
          </Typography>
          
          <Link href="/sign-in" passHref>
            <Button sx={{ color: '#FFFFFF', fontWeight: 'bold', '&:hover': { color: '#FFD700' } }}>
              Log in
            </Button>
          </Link>

          <Link href="/sign-up" passHref>
            <Button sx={{ color: '#FFFFFF', fontWeight: 'bold', '&:hover': { color: '#FFD700' } }}>
              Sign up
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        sx={{ mt: -8, mb: 4 }}
      > 
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
}
