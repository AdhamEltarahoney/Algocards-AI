
// }
'use client'
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import getstripe from "@/utils/get-stripe";
import { loadStripe } from '@stripe/stripe-js';


export default function Home() {

  const handleSubmit = async() =>{
    const checkoutSession = await fetch ('/api/checkout_session',{
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000', // Replace with your actual domain
      },
    })
    const checkoutSessionJson = await checkoutSession.json()
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getstripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }
 


  return (
    <>
      <Head>
        <title>Algocards AI</title> 
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Algocards AI</Typography>
          <SignedOut>
            <Button color="inherit" href = "/sign-in">Login </Button>
            <Button color="inherit" href = "/sign-up">Sign Up </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", my: 8 }}>
          <Typography variant="h2" gutterBottom>Welcome to Algocards AI!</Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 4 }}>
            Get Started
          </Button>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Easy Text Input
                  </Typography>
                  <Typography color="textSecondary">
                    Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    Smart Flashcards
                  </Typography>
                  <Typography color="textSecondary">
                    Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    Accessible Anywhere
                  </Typography>
                  <Typography color="textSecondary">
                    Access your flashcards from any device, at any time. Study on the go with ease.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>Pricing</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    Basic Plan
                  </Typography>
                  <Typography variant="h5" component="h3">
                     $5 / month
                  </Typography>
                  <Typography color="textSecondary">
                    Enjoy basic features with limited flashcards.
                  </Typography>
                  <Button variant="contained" color="primary" sx={{mt: 2}}>
                    Get Started
                  </Button> 
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    Pro plan
                  </Typography>
                  <Typography variant="h5" component="h3">
                     $10 / month
                  </Typography>
                  <Typography color="textSecondary">
                    Enjoy unlimited flashcards and storage.
                  </Typography>
                  <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>
                    Get Pro
                  </Button> 
                </CardContent>
              </Card>
            </Grid>
            
          </Grid>
        </Box>
      </Container>
    </>
  );
}
