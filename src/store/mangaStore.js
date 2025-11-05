import { create } from 'zustand';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where,
  orderBy,
  limit as firestoreLimit
} from 'firebase/firestore';
import { db } from '../config/firebase';

const useMangaStore = create((set, get) => ({
  mangas: [],
  userMangaList: [],
  selectedManga: null,
  loading: false,
  error: null,

  fetchAllMangas: async () => {
    try {
      set({ loading: true, error: null });
      const mangasRef = collection(db, 'mangas');
      const snapshot = await getDocs(mangasRef);
      const mangas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ mangas, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchMangaById: async (id) => {
    try {
      set({ loading: true, error: null });
      const mangaDoc = await getDoc(doc(db, 'mangas', id));
      if (mangaDoc.exists()) {
        const manga = { id: mangaDoc.id, ...mangaDoc.data() };
        set({ selectedManga: manga, loading: false });
        return manga;
      }
      set({ loading: false });
      return null;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  fetchUserMangaList: async (userId) => {
    try {
      set({ loading: true, error: null });
      const userMangaRef = collection(db, 'userManga');
      const q = query(userMangaRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const userMangaList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ userMangaList, loading: false });
      return userMangaList;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  },

  addManga: async (mangaData, userId) => {
    try {
      set({ loading: true, error: null });
      
      const newManga = {
        ...mangaData,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalReaders: 0,
        averageRating: 0
      };

      const docRef = await addDoc(collection(db, 'mangas'), newManga);
      const manga = { id: docRef.id, ...newManga };
      
      set(state => ({ 
        mangas: [...state.mangas, manga],
        loading: false 
      }));
      
      return { success: true, manga };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  updateManga: async (mangaId, updates) => {
    try {
      set({ loading: true, error: null });
      
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'mangas', mangaId), updatedData);
      
      set(state => ({
        mangas: state.mangas.map(m => 
          m.id === mangaId ? { ...m, ...updatedData } : m
        ),
        loading: false
      }));
      
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  deleteManga: async (mangaId) => {
    try {
      set({ loading: true, error: null });
      await deleteDoc(doc(db, 'mangas', mangaId));
      
      set(state => ({
        mangas: state.mangas.filter(m => m.id !== mangaId),
        loading: false
      }));
      
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  addToUserList: async (userId, mangaId, mangaData, status = 'planToRead') => {
    try {
      set({ loading: true, error: null });
      
      const userMangaRef = collection(db, 'userManga');
      const q = query(
        userMangaRef, 
        where('userId', '==', userId),
        where('mangaId', '==', mangaId)
      );
      const existing = await getDocs(q);
      
      if (!existing.empty) {
        return { success: false, error: 'Manga already in your list' };
      }

      const newUserManga = {
        userId,
        mangaId,
        mangaTitle: mangaData.title,
        mangaCover: mangaData.coverImage,
        status,
        currentChapter: 0,
        rating: 0,
        notes: '',
        startedAt: status === 'reading' ? new Date().toISOString() : null,
        completedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(userMangaRef, newUserManga);
      const userManga = { id: docRef.id, ...newUserManga };
      
      set(state => ({
        userMangaList: [...state.userMangaList, userManga],
        loading: false
      }));

      await get().updateMangaStats(mangaId);
      
      return { success: true, userManga };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  updateUserManga: async (userMangaId, updates) => {
    try {
      set({ loading: true, error: null });
      
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };

      if (updates.status === 'completed' && !updates.completedAt) {
        updatedData.completedAt = new Date().toISOString();
      }

      if (updates.status === 'reading' && !updates.startedAt) {
        updatedData.startedAt = new Date().toISOString();
      }

      await updateDoc(doc(db, 'userManga', userMangaId), updatedData);
      
      set(state => ({
        userMangaList: state.userMangaList.map(um => 
          um.id === userMangaId ? { ...um, ...updatedData } : um
        ),
        loading: false
      }));
      
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  removeFromUserList: async (userMangaId) => {
    try {
      set({ loading: true, error: null });
      await deleteDoc(doc(db, 'userManga', userMangaId));
      
      set(state => ({
        userMangaList: state.userMangaList.filter(um => um.id !== userMangaId),
        loading: false
      }));
      
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  updateMangaStats: async (mangaId) => {
    try {
      const userMangaRef = collection(db, 'userManga');
      const q = query(userMangaRef, where('mangaId', '==', mangaId));
      const snapshot = await getDocs(q);
      
      let totalRating = 0;
      let ratingCount = 0;
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.rating > 0) {
          totalRating += data.rating;
          ratingCount++;
        }
      });

      const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;
      
      await updateDoc(doc(db, 'mangas', mangaId), {
        totalReaders: snapshot.size,
        averageRating: parseFloat(averageRating.toFixed(1))
      });
    } catch (error) {
      console.error('Error updating manga stats:', error);
    }
  },

  searchMangas: (searchTerm, filters = {}) => {
    const { mangas } = get();
    let filtered = [...mangas];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(manga => 
        manga.title.toLowerCase().includes(term) ||
        manga.author?.toLowerCase().includes(term) ||
        manga.genres?.some(g => g.toLowerCase().includes(term))
      );
    }

    if (filters.genre) {
      filtered = filtered.filter(manga => 
        manga.genres?.includes(filters.genre)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(manga => manga.status === filters.status);
    }

    if (filters.year) {
      filtered = filtered.filter(manga => manga.year === filters.year);
    }

    return filtered;
  }
}));

export default useMangaStore;
