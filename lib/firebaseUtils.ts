import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, PageContent, Service, MediaItem, SiteContent } from './types';
import { sampleServices, samplePages } from './sampleData';
import {
  mergeSiteContent,
  defaultSiteContent,
  SITE_CONTENT_COLLECTION,
  SITE_CONTENT_DOC_ID,
} from './siteDefaults';

// User Management
export async function createUserProfile(
  uid: string,
  email: string,
  displayName: string,
  role: 'admin' | 'editor' | 'viewer' = 'viewer'
): Promise<UserProfile> {
  const userProfile: Omit<UserProfile, 'id'> = {
    email,
    displayName,
    role,
    createdAt: new Date(),
  };

  await setDoc(doc(db, 'users', uid), {
    ...userProfile,
    createdAt: Timestamp.now(),
  });

  return { id: uid, ...userProfile };
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    return null;
  }

  const data = userDoc.data();
  return {
    id: uid,
    email: data.email,
    displayName: data.displayName,
    role: data.role,
    createdAt: data.createdAt?.toDate?.() || new Date(),
    lastLogin: data.lastLogin?.toDate?.(),
    avatar: data.avatar,
  };
}

export async function updateUserRole(
  uid: string,
  role: 'admin' | 'editor' | 'viewer'
): Promise<void> {
  await updateDoc(doc(db, 'users', uid), { role });
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    email: doc.data().email,
    displayName: doc.data().displayName,
    role: doc.data().role,
    createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    lastLogin: doc.data().lastLogin?.toDate?.(),
    avatar: doc.data().avatar,
  }));
}

// Page Content Management
export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  try {
    const q = query(
      collection(db, 'pages'),
      where('slug', '==', slug),
      where('published', '==', true)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    } as PageContent;
  } catch (error) {
    // Fallback to sample data if Firebase is not configured
    const samplePage = samplePages.find(p => p.slug === slug);
    return samplePage as PageContent || null;
  }
}

export async function getAllPages(includeUnpublished = false): Promise<PageContent[]> {
  let q;
  if (includeUnpublished) {
    q = query(collection(db, 'pages'));
  } else {
    q = query(collection(db, 'pages'), where('published', '==', true));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
  })) as PageContent[];
}

export async function savePageContent(
  slug: string,
  content: Omit<PageContent, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const pagesRef = collection(db, 'pages');
  const q = query(pagesRef, where('slug', '==', slug));
  const snapshot = await getDocs(q);

  const pageData: Omit<PageContent, 'id' | 'createdAt' | 'updatedAt'> & {
    createdAt?: Timestamp;
    updatedAt: Timestamp;
  } = {
    ...content,
    updatedAt: Timestamp.now(),
  };

  if (snapshot.empty) {
    // Create new page
    pageData['createdAt'] = Timestamp.now();
    const docRef = doc(pagesRef);
    await setDoc(docRef, pageData);
    return docRef.id;
  } else {
    // Update existing page
    await updateDoc(snapshot.docs[0].ref, pageData);
    return snapshot.docs[0].id;
  }
}

// Services Management
export async function getAllServices(includeUnpublished = false): Promise<Service[]> {
  try {
    let q;
    if (includeUnpublished) {
      q = query(collection(db, 'services'));
    } else {
      q = query(collection(db, 'services'), where('published', '==', true));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as Service[];
  } catch (error) {
    // Fallback to sample data if Firebase is not configured
    console.log('[v0] Using sample service data');
    return sampleServices as Service[];
  }
}

export async function saveService(
  id: string | undefined,
  service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'> & {
    createdAt?: Timestamp;
    updatedAt: Timestamp;
  } = {
    ...service,
    updatedAt: Timestamp.now(),
  };

  if (!id) {
    // Create new service
    serviceData['createdAt'] = Timestamp.now();
    const docRef = doc(collection(db, 'services'));
    await setDoc(docRef, serviceData);
    return docRef.id;
  } else {
    // Update existing service
    await updateDoc(doc(db, 'services', id), serviceData);
    return id;
  }
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, 'services', id));
}

// Media Management
export async function getMediaItems(
  type?: 'image' | 'video'
): Promise<MediaItem[]> {
  let q;
  if (type) {
    q = query(collection(db, 'media'), where('type', '==', type));
  } else {
    q = query(collection(db, 'media'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    uploadedAt: doc.data().uploadedAt?.toDate?.() || new Date(),
  })) as MediaItem[];
}

export async function saveMediaItem(mediaItem: Omit<MediaItem, 'id'>): Promise<string> {
  const docRef = doc(collection(db, 'media'));
  await setDoc(docRef, {
    ...mediaItem,
    uploadedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function deleteMediaItem(id: string): Promise<void> {
  await deleteDoc(doc(db, 'media', id));
}

// Site-wide copy (Firestore: siteContent/main)
const siteContentDocRef = () => doc(db, SITE_CONTENT_COLLECTION, SITE_CONTENT_DOC_ID);

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const snap = await getDoc(siteContentDocRef());
    if (!snap.exists()) return defaultSiteContent;
    return mergeSiteContent(snap.data() as Record<string, unknown>);
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteSection<K extends keyof SiteContent>(
  section: K,
  data: SiteContent[K],
  userId: string
): Promise<void> {
  await setDoc(
    siteContentDocRef(),
    {
      [section]: data,
      updatedAt: Timestamp.now(),
      updatedBy: userId,
    },
    { merge: true }
  );
}

/** Admin: load page by slug including drafts (no published filter). */
export async function getPageBySlugForEdit(slug: string): Promise<PageContent | null> {
  try {
    const q = query(collection(db, 'pages'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    const raw = d.data();
    return {
      id: d.id,
      ...raw,
      createdAt: raw.createdAt?.toDate?.() || new Date(),
      updatedAt: raw.updatedAt?.toDate?.() || new Date(),
    } as PageContent;
  } catch {
    return null;
  }
}
