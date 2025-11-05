import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createDemoAccount = async () => {
  try {
    const demoEmail = 'demo@mangatracker.com';
    const demoPassword = 'demo123456';
    const displayName = 'Demo User';

    console.log('Creating demo account...');
    const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
    
    await updateProfile(userCredential.user, { displayName });

    const userProfile = {
      uid: userCredential.user.uid,
      email: demoEmail,
      displayName: displayName,
      photoURL: null,
      role: 'user',
      bio: 'This is a demo account for testing MangaTracker features. Feel free to explore!',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stats: {
        totalManga: 0,
        reading: 0,
        completed: 0,
        onHold: 0,
        dropped: 0,
        planToRead: 0
      },
      following: [],
      followers: []
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
    
    console.log('✅ Demo account created successfully!');
    console.log('Email:', demoEmail);
    console.log('Password:', demoPassword);
    console.log('UID:', userCredential.user.uid);
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️  Demo account already exists!');
      console.log('Email: demo@mangatracker.com');
      console.log('Password: demo123456');
    } else {
      console.error('❌ Error creating demo account:', error.message);
    }
    process.exit(1);
  }
};

createDemoAccount();
