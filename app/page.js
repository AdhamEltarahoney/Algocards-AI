'use client'
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from "@mui/material";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import Head from "next/head";
import getstripe from "@/utils/get-stripe";
import { loadStripe } from '@stripe/stripe-js';

export default function Home() {
  const { isSignedIn } = useAuth();

  // Generalized handleSubmit to accept different plans (basic/pro)
  const handleCheckout = async(plan) => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan })  // Pass the selected plan (basic or pro)
    });

    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getstripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  // Handle getting started depending on user auth status
  const handleGetStarted = () => {
    if (isSignedIn) {
      window.location.href = 'http://localhost:3000/generate';  // Redirect to generate page if signed in
    } else {
      window.location.href = 'http://localhost:3000/sign-in';   // Redirect to sign-in page if not signed in
    }
  };

  return (
    <>
      <Head>
        <title>Algocards AI</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* AppBar with navigation */}
      <AppBar position="static" sx={{ backgroundColor: '#1e3a8a', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Algocards AI
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Main container with blue background for the entire page */}
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          backgroundColor: '#1e3a8a',
          minHeight: '100vh',
          padding: '0',   // Remove padding
          margin: '0',    // Remove margin
          color: '#fff',
        }}
      >
        {/* Welcome Section */}
        <Box sx={{ textAlign: 'center', my: 0, py: 8 }}> {/* Set `my` to 0 */}
          <Typography variant="h2" gutterBottom>
            Welcome to Algocards AI!
          </Typography>
          <Typography variant="h5" color="white" gutterBottom>
            The easiest way to make flashcards from your text
          </Typography>
        
          <Button
            variant="contained"
            sx={{ 
              mt: 4, 
              backgroundColor: '#43a047',  // Green color
              color: 'white',  // White text
              '&:hover': { backgroundColor: '#388e3c' }  // Darker green on hover
            }}
            onClick={handleGetStarted}
          >
            GET STARTED
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ fontWeight: 'bold', fontSize: '2.5rem', letterSpacing: '0.05em', color: '#ffffff' }}
          >
            Features
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #d1d5db',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: '700', color: '#1e3a8a' }}>
                    Easy Text Input
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontSize: '1rem', color: '#4b5563' }}>
                    Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #d1d5db',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: '700', color: '#1e3a8a' }}>
                    Smart Flashcards
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontSize: '1rem', color: '#4b5563' }}>
                    Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #d1d5db',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: '700', color: '#1e3a8a' }}>
                    Accessible Anywhere
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontSize: '1rem', color: '#4b5563' }}>
                    Access your flashcards from any device, at any time. Study on the go with ease.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ textAlign: 'center', my: 8, backgroundColor: '#1e3a8a', py: 4 }}> {/* Ensure background covers the entire section */}
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ fontWeight: 'bold', fontSize: '2.5rem', letterSpacing: '0.05em', color: '#ffffff' }}
          >
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #d1d5db',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: '700', color: '#1e3a8a' }}>
                    Basic Plan
                  </Typography>
                  <Typography variant="h5" component="h3" sx={{ color: '#1e3a8a' }}>
                    $5 / month
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontSize: '1rem', color: '#4b5563' }}>
                    Enjoy basic features with limited flashcards.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, backgroundColor: '#1e3a8a', '&:hover': { backgroundColor: '#3748A5' } }}
                    onClick={() => handleCheckout('basic')}
                  >
                    Get Basic
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #d1d5db',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: '700', color: '#1e3a8a' }}>
                    Pro Plan
                  </Typography>
                  <Typography variant="h5" component="h3" sx={{ color: '#1e3a8a' }}>
                    $10 / month
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontSize: '1rem', color: '#4b5563' }}>
                    Enjoy unlimited flashcards and storage.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, backgroundColor: '#1e3a8a', '&:hover': { backgroundColor: '#3748A5' } }}
                    onClick={() => handleCheckout('pro')}
                  >
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
