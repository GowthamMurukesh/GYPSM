import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Unsubscribe,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { createUserProfile } from './firebaseUtils';
import { UserProfile } from './types';

const bootstrapAdminEmail = process.env.NEXT_PUBLIC_INITIAL_ADMIN_EMAIL?.trim().toLowerCase();

function getInitialRole(email: string): 'admin' | 'viewer' {
  return bootstrapAdminEmail && email.trim().toLowerCase() === bootstrapAdminEmail
    ? 'admin'
    : 'viewer';
}

async function ensureBootstrapAdminProfile(firebaseUser: User): Promise<UserProfile | null> {
  const email = firebaseUser.email || '';

  if (!email || getInitialRole(email) !== 'admin') {
    return null;
  }

  const profile: UserProfile = {
    id: firebaseUser.uid,
    email,
    displayName: firebaseUser.displayName || email,
    role: 'admin',
    createdAt: new Date(),
    lastLogin: new Date(),
  };

  await setDoc(
    doc(db, 'users', firebaseUser.uid),
    {
      email: profile.email,
      displayName: profile.displayName,
      role: profile.role,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
    },
    { merge: true }
  );

  return profile;
}

function profileFromAuthUser(firebaseUser: User): UserProfile {
  const email = firebaseUser.email || '';
  return {
    id: firebaseUser.uid,
    email,
    displayName: firebaseUser.displayName || email || 'User',
    role: getInitialRole(email) as UserProfile['role'],
    createdAt: new Date(),
    lastLogin: new Date(),
  };
}

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  profileLoadError: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Unsubscribe;
}

export const useAuthStore = create<AuthState>((set) => {
  // Set persistence
  setPersistence(auth, browserLocalPersistence).catch(console.error);

  return {
    user: null,
    userProfile: null,
    loading: true,
    error: null,
    profileLoadError: null,

    login: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null });
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Login failed';
        set({ error: message });
        throw error;
      } finally {
        set({ loading: false });
      }
    },

    register: async (email: string, password: string, displayName: string) => {
      try {
        set({ loading: true, error: null });
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        if (displayName.trim()) {
          await updateProfile(credential.user, { displayName: displayName.trim() });
        }

        await createUserProfile(
          credential.user.uid,
          credential.user.email || email,
          displayName.trim() || credential.user.email || 'User',
          getInitialRole(credential.user.email || email)
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Registration failed';
        set({ error: message });
        throw error;
      } finally {
        set({ loading: false });
      }
    },

    logout: async () => {
      try {
        set({ loading: true, error: null });
        await signOut(auth);
        set({ user: null, userProfile: null, profileLoadError: null });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Logout failed';
        set({ error: message });
        throw error;
      } finally {
        set({ loading: false });
      }
    },

    initializeAuth: () => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          set({ user: firebaseUser, profileLoadError: null });

          try {
            const bootstrapProfile = await ensureBootstrapAdminProfile(firebaseUser);

            if (bootstrapProfile) {
              set({
                userProfile: bootstrapProfile,
                loading: false,
                profileLoadError: null,
              });
              return;
            }

            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              set({
                userProfile: {
                  id: firebaseUser.uid,
                  email: firebaseUser.email || '',
                  displayName: userData.displayName || firebaseUser.displayName || '',
                  role: userData.role || 'viewer',
                  createdAt: userData.createdAt?.toDate?.() || new Date(),
                  lastLogin: userData.lastLogin?.toDate?.() || new Date(),
                  avatar: userData.avatar,
                },
                loading: false,
                profileLoadError: null,
              });
            } else {
              set({
                userProfile: {
                  id: firebaseUser.uid,
                  email: firebaseUser.email || '',
                  displayName: firebaseUser.displayName || firebaseUser.email || 'User',
                  role: 'viewer',
                  createdAt: new Date(),
                  lastLogin: new Date(),
                },
                loading: false,
                profileLoadError: null,
              });
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            const message =
              error instanceof Error ? error.message : 'Could not load your account from the database.';
            set({
              loading: false,
              profileLoadError: message,
              userProfile: profileFromAuthUser(firebaseUser),
            });
          }
        } else {
          set({ user: null, userProfile: null, loading: false, profileLoadError: null });
        }
      });

      return unsubscribe;
    },
  };
});
