import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadPDF(pdfBuffer: Buffer, userId: string): Promise<string> {
  try {
    const fileName = `resumes/${userId}/${uuidv4()}.pdf`;
    const fileRef = ref(storage, fileName);

    // Upload the PDF buffer
    await uploadBytes(fileRef, pdfBuffer);

    // Get the download URL
    const url = await getDownloadURL(fileRef);

    return url;
  } catch (error) {
    console.error('PDF Upload Error:', error);
    throw new Error('Failed to upload PDF');
  }
}

export async function uploadFile(content: string, userId: string): Promise<string> {
  try {
    // Convert content to PDF or DOCX format here
    // For now, we'll just store it as a text file
    const buffer = Buffer.from(content);
    
    const fileName = `resumes/${userId}/${Date.now()}.txt`;
    const fileRef = ref(storage, fileName);
    
    await uploadBytes(fileRef, buffer);
    const downloadUrl = await getDownloadURL(fileRef);
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function downloadFile(fileUrl: string): Promise<Buffer> {
  try {
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

export async function deleteResume(userId: string, fileName: string): Promise<void> {
  try {
    const fileRef = ref(storage, `resumes/${userId}/${fileName}`);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('PDF Deletion Error:', error);
    throw new Error('Failed to delete PDF');
  }
}

export async function listUserResumes(userId: string): Promise<string[]> {
  try {
    const listRef = ref(storage, `resumes/${userId}/`);
    const { items } = await listAll(listRef);

    return Promise.all(items.map(item => getDownloadURL(item)));
  } catch (error) {
    console.error('Resume Listing Error:', error);
    throw new Error('Failed to list resumes');
  }
}
