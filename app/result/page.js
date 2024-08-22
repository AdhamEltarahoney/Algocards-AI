// 'use client'
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useSearchParams } from 'next/navigation';
// import getstripe from '@/utils/get-stripe';
// import { CircularProgress, Container, Typography, Box } from '@mui/material';


// const ResultPage = ()=>{

//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const session_id = searchParams.get('session_id');   

//     const [loading, setLoading] = useState(true);
//     const [session, setSession] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCheckoutSession = async () => {
//             if (!session_id) return;
    
//             try {
//                 const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
//                 const sessionData = await res.json();
    
//                 if (res.ok) {
//                     setSession(sessionData);
//                 } else {
//                     setError(sessionData.error);
//                 }
//             } catch (err) {
//                 setError("An error occurred");
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchCheckoutSession();
//     }, [session_id]);

//     if (loading){
//         return <Container
//             maxWidth="100vw"
//             sx={{
//                 textAlign: 'center',
//                 mt: 4,
//             }}
//         >
//             <CircularProgress/>
//             <Typography variant="h5" color="textSecondary" gutterBottom>
//                 Loading...
//             </Typography>
//         </Container>
//     }
//     if (error) {
//         return (
//             <Container
//                 maxWidth="100vw"
//                 sx={{
//                     textAlign: 'center',
//                     mt: 4,
//                 }}
//             >
//                 <Typography variant="h5" color="error" gutterBottom>
//                     {error}
//                 </Typography>
//             </Container>
//         );
//     }     

//     return (
//         <Container
//             maxWidth="100vw"
//             sx={{
//                 textAlign: 'center',
//                 mt: 4,
//             }}
//         >
//             {session.payment_status === 'paid' ? (
//                 <>
//                     <Typography variant="h5" color="success" gutterBottom>
//                         Thank you for your purchase!
//                     </Typography>
//                     <Box>
//                         <Typography variant="h6">Session ID: {session_id}</Typography>
//                     </Box>
//                 </>
//             ) : (
//                 <>
//                     <Typography variant="h5" color="error" gutterBottom>
//                         Payment failed.
//                     </Typography>
//                     <Box>
//                         <Typography variant="h6">Payment unsuccessful. Please try again.</Typography>
//                     </Box>
//                 </>
//             )}
//         </Container>
//     );
    
    
// }

// export default ResultPage;
'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import getstripe from '@/utils/get-stripe';
import { CircularProgress, Container, Typography, Box } from '@mui/material';

const ResultPage = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');   

    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return;

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
                const sessionData = await res.json();

                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(sessionData.error);
                }
            } catch (err) {
                setError("An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutSession();
    }, [session_id]);

    if (loading) {
        return (
            <Container
                maxWidth="100vw"
                sx={{
                    textAlign: 'center',
                    mt: 4,
                }}
            >
                <CircularProgress/>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    Loading...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container
                maxWidth="100vw"
                sx={{
                    textAlign: 'center',
                    mt: 4,
                }}
            >
                <Typography variant="h5" color="error" gutterBottom>
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="100vw"
            sx={{
                textAlign: 'center',
                mt: 4,
            }}
        >
            {session.payment_status === 'paid' ? (
                <>
                    <Typography variant="h5" color="success" gutterBottom>
                        Thank you for your purchase!
                    </Typography>
                    <Box>
                        <Typography variant="h6">Session ID: {session_id}</Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h5" color="error" gutterBottom>
                        Payment failed.
                    </Typography>
                    <Box>
                        <Typography variant="h6">Payment unsuccessful. Please try again.</Typography>
                    </Box>
                </>
            )}
        </Container>
    );
}

export default ResultPage;
