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
  arrayUnion,
  arrayRemove,
  limit as firestoreLimit
} from 'firebase/firestore';
import { db } from '../config/firebase';

const useSocialStore = create((set, get) => ({
  activities: [],
  reviews: [],
  comments: {},
  friends: [],
  loading: false,
  error: null,

  fetchActivities: async (userId, includeFollowing = false) => {
    try {
      set({ loading: true, error: null });
      const activitiesRef = collection(db, 'activities');
      
      let q;
      if (includeFollowing && userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        const following = userDoc.data()?.following || [];
        const userIds = [userId, ...following];
        q = query(
          activitiesRef, 
          where('userId', 'in', userIds.slice(0, 10)),
          orderBy('createdAt', 'desc'),
          firestoreLimit(50)
        );
      } else if (userId) {
        q = query(
          activitiesRef, 
          where('userId', '==', userId),
          orderBy('createdAt', 'desc'),
          firestoreLimit(50)
        );
      } else {
        q = query(
          activitiesRef,
          orderBy('createdAt', 'desc'),
          firestoreLimit(50)
        );
      }
      
      const snapshot = await getDocs(q);
      const activities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ activities, loading: false });
      return activities;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  },

  fetchAllActivities: async () => {
    try {
      set({ loading: true, error: null });
      const activitiesRef = collection(db, 'activities');
      const q = query(
        activitiesRef,
        orderBy('createdAt', 'desc'),
        firestoreLimit(50)
      );
      
      const snapshot = await getDocs(q);
      const activities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ activities, loading: false });
      return activities;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  },

  createActivity: async (userId, userName, userPhoto, type, data) => {
    try {
      const newActivity = {
        userId,
        userName,
        userPhoto,
        type,
        ...data,
        likes: [],
        commentsCount: 0,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'activities'), newActivity);
      const activity = { id: docRef.id, ...newActivity };
      
      set(state => ({
        activities: [activity, ...state.activities]
      }));
      
      return { success: true, activity };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  likeActivity: async (activityId, userId) => {
    try {
      const activityRef = doc(db, 'activities', activityId);
      const activityDoc = await getDoc(activityRef);
      
      if (!activityDoc.exists()) return { success: false };
      
      const likes = activityDoc.data().likes || [];
      const isLiked = likes.includes(userId);
      
      if (isLiked) {
        await updateDoc(activityRef, {
          likes: arrayRemove(userId)
        });
      } else {
        await updateDoc(activityRef, {
          likes: arrayUnion(userId)
        });
      }
      
      set(state => ({
        activities: state.activities.map(a => {
          if (a.id === activityId) {
            const newLikes = isLiked 
              ? a.likes.filter(id => id !== userId)
              : [...(a.likes || []), userId];
            return { ...a, likes: newLikes };
          }
          return a;
        })
      }));
      
      return { success: true, isLiked: !isLiked };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  fetchReviews: async (mangaId) => {
    try {
      set({ loading: true, error: null });
      const reviewsRef = collection(db, 'reviews');
      const q = query(
        reviewsRef, 
        where('mangaId', '==', mangaId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ reviews, loading: false });
      return reviews;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  },

  addReview: async (userId, userName, userPhoto, mangaId, mangaTitle, rating, content) => {
    try {
      set({ loading: true, error: null });
      
      const reviewsRef = collection(db, 'reviews');
      const q = query(
        reviewsRef,
        where('userId', '==', userId),
        where('mangaId', '==', mangaId)
      );
      const existing = await getDocs(q);
      
      if (!existing.empty) {
        return { success: false, error: 'You already reviewed this manga' };
      }

      const newReview = {
        userId,
        userName,
        userPhoto,
        mangaId,
        mangaTitle,
        rating,
        content,
        likes: [],
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(reviewsRef, newReview);
      const review = { id: docRef.id, ...newReview };
      
      set(state => ({
        reviews: [review, ...state.reviews],
        loading: false
      }));

      await get().createActivity(userId, userName, userPhoto, 'review', {
        mangaId,
        mangaTitle,
        rating,
        reviewContent: content.substring(0, 200)
      });
      
      return { success: true, review };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  updateReview: async (reviewId, updates) => {
    try {
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'reviews', reviewId), updatedData);
      
      set(state => ({
        reviews: state.reviews.map(r => 
          r.id === reviewId ? { ...r, ...updatedData } : r
        )
      }));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteReview: async (reviewId) => {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
      
      set(state => ({
        reviews: state.reviews.filter(r => r.id !== reviewId)
      }));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  likeReview: async (reviewId, userId) => {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      const reviewDoc = await getDoc(reviewRef);
      
      if (!reviewDoc.exists()) return { success: false };
      
      const likes = reviewDoc.data().likes || [];
      const isLiked = likes.includes(userId);
      
      if (isLiked) {
        await updateDoc(reviewRef, {
          likes: arrayRemove(userId)
        });
      } else {
        await updateDoc(reviewRef, {
          likes: arrayUnion(userId)
        });
      }
      
      set(state => ({
        reviews: state.reviews.map(r => {
          if (r.id === reviewId) {
            const newLikes = isLiked 
              ? r.likes.filter(id => id !== userId)
              : [...(r.likes || []), userId];
            return { ...r, likes: newLikes };
          }
          return r;
        })
      }));
      
      return { success: true, isLiked: !isLiked };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  fetchComments: async (targetId, targetType) => {
    try {
      const commentsRef = collection(db, 'comments');
      const q = query(
        commentsRef,
        where('targetId', '==', targetId),
        where('targetType', '==', targetType),
        orderBy('createdAt', 'asc')
      );
      const snapshot = await getDocs(q);
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      set(state => ({
        comments: {
          ...state.comments,
          [`${targetType}_${targetId}`]: comments
        }
      }));
      
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },

  addComment: async (targetId, targetType, userId, userName, userPhoto, content) => {
    try {
      const newComment = {
        targetId,
        targetType,
        userId,
        userName,
        userPhoto,
        content,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'comments'), newComment);
      const comment = { id: docRef.id, ...newComment };
      
      const key = `${targetType}_${targetId}`;
      set(state => ({
        comments: {
          ...state.comments,
          [key]: [...(state.comments[key] || []), comment]
        }
      }));

      const targetRef = doc(db, targetType === 'activity' ? 'activities' : 'reviews', targetId);
      const targetDoc = await getDoc(targetRef);
      if (targetDoc.exists()) {
        await updateDoc(targetRef, {
          commentsCount: (targetDoc.data().commentsCount || 0) + 1
        });
      }
      
      return { success: true, comment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  followUser: async (currentUserId, targetUserId) => {
    try {
      await updateDoc(doc(db, 'users', currentUserId), {
        following: arrayUnion(targetUserId)
      });
      
      await updateDoc(doc(db, 'users', targetUserId), {
        followers: arrayUnion(currentUserId)
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  unfollowUser: async (currentUserId, targetUserId) => {
    try {
      await updateDoc(doc(db, 'users', currentUserId), {
        following: arrayRemove(targetUserId)
      });
      
      await updateDoc(doc(db, 'users', targetUserId), {
        followers: arrayRemove(currentUserId)
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  fetchFriends: async (userId) => {
    try {
      set({ loading: true, error: null });
      const userDoc = await getDoc(doc(db, 'users', userId));
      const following = userDoc.data()?.following || [];
      
      const friends = [];
      for (const friendId of following) {
        const friendDoc = await getDoc(doc(db, 'users', friendId));
        if (friendDoc.exists()) {
          friends.push({ id: friendDoc.id, ...friendDoc.data() });
        }
      }
      
      set({ friends, loading: false });
      return friends;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  }
}));

export default useSocialStore;
