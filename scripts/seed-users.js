import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

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

const seedUsers = [
  {
    displayName: 'Rahman',
    email: 'rahman@mangashelf.com',
    password: 'rahman123',
    bio: 'Manga enthusiast and collector. Love action and adventure series!'
  },
  {
    displayName: 'Rivai',
    email: 'rivai@mangashelf.com',
    password: 'rivai123',
    bio: 'Passionate manga reader. Into shonen and mystery genres.'
  }
];

const createUser = async (userData) => {
  try {
    console.log(`\n📝 Creating user: ${userData.displayName}...`);
    
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    await updateProfile(userCredential.user, { 
      displayName: userData.displayName 
    });

    const userProfile = {
      uid: userCredential.user.uid,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: null,
      role: 'user',
      bio: userData.bio,
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
    
    console.log(`✅ User created successfully!`);
    console.log(`   Username: ${userData.displayName}`);
    console.log(`   Email: ${userData.email}`);
    console.log(`   Password: ${userData.password}`);
    console.log(`   UID: ${userCredential.user.uid}`);
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`ℹ️  User ${userData.displayName} already exists!`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Password: ${userData.password}`);
      return { success: true, existing: true };
    } else {
      console.error(`❌ Error creating user ${userData.displayName}:`, error.message);
      return { success: false, error: error.message };
    }
  }
};

const seedAllUsers = async () => {
  console.log('🌱 Starting user seeding process...');
  console.log('================================');
  
  for (const userData of seedUsers) {
    await createUser(userData);
  }
  
  console.log('\n================================');
  console.log('✅ User seeding completed!');
  console.log('\n📋 Login Credentials:');
  console.log('--------------------------------');
  seedUsers.forEach(user => {
    console.log(`Username: ${user.displayName}`);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);
    console.log('--------------------------------');
  });
  
  process.exit(0);
};

seedAllUsers().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
