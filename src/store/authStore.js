import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const useAuthStore = create((set, get) => ({
  user: null,
  userProfile: null,
  loading: true,
  error: null,

  initAuth: async () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          const userProfile = await get().fetchUserProfile(firebaseUser.uid);
          set({ 
            user: firebaseUser, 
            userProfile,
            loading: false 
          });
        } else {
          set({ user: null, userProfile: null, loading: false });
        }
        resolve();
      });
    });
  },

  fetchUserProfile: async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await get().fetchUserProfile(userCredential.user.uid);
      set({ user: userCredential.user, userProfile, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  loginWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (!userDoc.exists()) {
        await get().createUserProfile(userCredential.user, {
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        });
      }
      
      const userProfile = await get().fetchUserProfile(userCredential.user.uid);
      set({ user: userCredential.user, userProfile, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  register: async (email, password, displayName) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, { displayName });
      await get().createUserProfile(userCredential.user, { displayName });
      
      const userProfile = await get().fetchUserProfile(userCredential.user.uid);
      set({ user: userCredential.user, userProfile, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  createUserProfile: async (user, additionalData = {}) => {
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: additionalData.displayName || user.displayName || 'Anonymous',
      photoURL: additionalData.photoURL || user.photoURL || null,
      role: 'user',
      bio: '',
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

    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userProfile;
  },

  updateUserProfile: async (updates) => {
    try {
      const { user, userProfile } = get();
      if (!user || !userProfile) return { success: false, error: 'Not authenticated' };

      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'users', user.uid), updatedData);
      
      const updatedProfile = { ...userProfile, ...updatedData };
      set({ userProfile: updatedProfile });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, userProfile: null, loading: false, error: null });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}));

export default useAuthStore;
