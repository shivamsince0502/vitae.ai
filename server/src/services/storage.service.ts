import { storage } from '../config/firebase-admin';
import { v4 as uuidv4 } from 'uuid';

export async function uploadPDF(pdfBuffer: Buffer, userId: string): Promise<string> {
  try {
    const bucket = storage.bucket();
    const fileName = `resumes/${userId}/${uuidv4()}.pdf`;
    const file = bucket.file(fileName);

    // Upload the PDF buffer
    await file.save(pdfBuffer, {
      metadata: {
        contentType: 'application/pdf',
      },
    });

    // Get a signed URL that expires in 1 hour
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 3600000, // 1 hour
    });

    return url;
  } catch (error) {
    console.error('PDF Upload Error:', error);
    throw new Error('Failed to upload PDF');
  }
}

export async function deleteResume(userId: string, fileName: string): Promise<void> {
  try {
    const bucket = storage.bucket();
    const file = bucket.file(`resumes/${userId}/${fileName}`);
    
    await file.delete();
  } catch (error) {
    console.error('PDF Deletion Error:', error);
    throw new Error('Failed to delete PDF');
  }
}

export async function listUserResumes(userId: string): Promise<string[]> {
  try {
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles({
      prefix: `resumes/${userId}/`,
    });

    return files.map(file => file.name);
  } catch (error) {
    console.error('Resume Listing Error:', error);
    throw new Error('Failed to list resumes');
  }
}
