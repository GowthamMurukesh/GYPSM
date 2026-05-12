export async function convertImageFileToWebP(file: File, quality = 0.86): Promise<File> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file.');
  }

  if (file.type === 'image/webp') {
    return file;
  }

  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Could not read this image.'));
      img.src = imageUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Image conversion is not supported in this browser.');
    }

    context.drawImage(image, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error('Could not convert image to WebP.'))),
        'image/webp',
        quality
      );
    });

    const filename = `${file.name.replace(/\.[^/.]+$/, '')}.webp`;
    return new File([blob], filename, { type: 'image/webp', lastModified: Date.now() });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export function isYouTubeUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, '');
    return host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com';
  } catch {
    return false;
  }
}

export function getYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] || null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname.startsWith('/embed/')) {
        return url.pathname.split('/').filter(Boolean)[1] || null;
      }
      if (url.pathname.startsWith('/shorts/')) {
        return url.pathname.split('/').filter(Boolean)[1] || null;
      }
      return url.searchParams.get('v');
    }

    return null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(value: string): string | null {
  const videoId = getYouTubeVideoId(value);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}
