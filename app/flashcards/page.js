'use client'
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

import { useSearchParams } from 'next/navigation';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebase';    
import { useRouter } from 'next/navigation';
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('id'); // 'search' is the name of the subcollection (like 'trees')

  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
        console.log("Search param ID:", search); // Debugging line

        if (!user || !search) return;

        // Correctly reference the subcollection
        const flashcardsRef = collection(db, 'users', user.id, search);
        const docs = await getDocs(flashcardsRef);

        const flashcards = [];
        docs.forEach((doc) => {
            flashcards.push({ id: doc.id, ...doc.data() });
        });
        setFlashcards(flashcards);
    }
    getFlashcards();
  }, [user, search]);

  if (!isLoaded  || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
      console.log("Navigating to flashcard ID:", id); // Debugging line
      router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container maxWidth={false} sx={{ width: '100vw' }}>
        <Typography variant="h1">Flashcards Preview</Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {flashcard.front}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {flashcard.back}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
  );
}
