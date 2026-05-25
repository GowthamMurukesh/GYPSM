'use client';

import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getMediaItems, saveMediaItem, deleteMediaItem } from '@/lib/firebaseUtils';
import { MediaItem } from '@/lib/types';
import { useAuthStore } from '@/lib/authStore';
import { Upload, Trash2, Image as ImageIcon, Video, AlertCircle } from 'lucide-react';
import { getYouTubeEmbedUrl, isYouTubeUrl } from '@/lib/mediaUtils';

const CLOUDINARY_CLOUD_NAME = 'dakhek75d';
const CLOUDINARY_UPLOAD_PRESET = 'Gowtham';

export default function MediaPage() {
  const { userProfile, loading: authLoading } = useAuthStore();
  const isViewer = userProfile?.role === 'viewer';
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading) {
      fetchMedia();
    }
  }, [authLoading]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const data = await getMediaItems();
      setMedia(data);
    } catch (error) {
      console.error('Error fetching media:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to load media library';
      setMessage(`Error: ${errorMsg}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (isViewer) {
      setMessage('Viewer access is read-only. File uploads are disabled.');
      setMessageType('error');
      return;
    }

    if (!userProfile?.id) {
      setMessage('You must be logged in to upload files');
      setMessageType('error');
      return;
    }

    // Validate that all files are WebP
    const invalidFiles: string[] = [];
    const validFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== 'image/webp' && !file.name.toLowerCase().endsWith('.webp')) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    }

    if (invalidFiles.length > 0) {
      setMessage(`❌ Only WebP files are allowed. Invalid files: ${invalidFiles.join(', ')}`);
      setMessageType('error');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (validFiles.length === 0) {
      setMessage('No valid WebP files selected');
      setMessageType('error');
      return;
    }

    setUploading(true);
    setMessage(null);
    let uploadedCount = 0;
    let failedCount = 0;

    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];

        try {
          console.log(`Uploading to Cloudinary: ${file.name}`);

          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
          formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: 'POST', body: formData }
          );

          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData?.error?.message || 'Cloudinary upload failed');
          }

          const data = await response.json();
          const url: string = data.secure_url;
          console.log(`Cloudinary URL: ${url}`);

          const mediaItem: Omit<MediaItem, 'id'> = {
            filename: file.name,
            url,
            type: 'image',
            size: file.size,
            uploadedBy: userProfile.id,
            uploadedAt: new Date(),
            tags: [],
          };

          await saveMediaItem(mediaItem);
          console.log(`Media item saved successfully`);
          uploadedCount++;
        } catch (uploadError) {
          console.error(`Error uploading ${file.name}:`, uploadError);
          failedCount++;
        }
      }

      await fetchMedia();

      if (uploadedCount > 0) {
        setMessage(`✅ Successfully uploaded ${uploadedCount} image${uploadedCount > 1 ? 's' : ''}${failedCount > 0 ? ` (${failedCount} failed)` : ''}`);
        setMessageType('success');
      } else {
        setMessage('No images were uploaded');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      const errorMsg = error instanceof Error ? error.message : 'Error uploading images';
      setMessage(errorMsg);
      setMessageType('error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleYouTubeSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewer) {
      setMessage('Viewer access is read-only. You cannot add videos.');
      setMessageType('error');
      return;
    }
    setMessage(null);

    if (!isYouTubeUrl(youtubeUrl) || !getYouTubeEmbedUrl(youtubeUrl)) {
      setMessage('Please enter a valid YouTube video link.');
      setMessageType('error');
      return;
    }

    setUploading(true);
    try {
      const mediaItem: Omit<MediaItem, 'id'> = {
        filename: 'YouTube video',
        url: youtubeUrl.trim(),
        type: 'video',
        size: 0,
        uploadedBy: userProfile?.id || 'unknown',
        uploadedAt: new Date(),
        tags: [],
      };

      await saveMediaItem(mediaItem);
      setYoutubeUrl('');
      setMessage('YouTube video link added successfully!');
      setMessageType('success');
      await fetchMedia();
    } catch (error) {
      console.error('Error saving video:', error);
      const errorMsg = error instanceof Error ? error.message : 'Error saving YouTube link';
      setMessage(errorMsg);
      setMessageType('error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteMediaItem(id);
        setMedia(media.filter((m) => m.id !== id));
      } catch (error) {
        console.error('Error deleting media:', error);
      }
    }
  };

  const filteredMedia = media.filter((m) => {
    if (filter === 'all') return true;
    return m.type === filter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Media Library</h1>
        <p className="text-muted-foreground">Upload WebP images and save YouTube video links</p>
      </div>

      {message && (
        <Card className={`p-4 text-sm border flex items-center gap-3 ${
          messageType === 'error'
            ? 'border-red-300 bg-red-50 text-red-900'
            : messageType === 'success'
            ? 'border-green-300 bg-green-50 text-green-900'
            : 'border-accent/30 bg-accent/5'
        }`}>
          {messageType === 'error' && <AlertCircle className="h-4 w-4 flex-shrink-0" />}
          {message}
        </Card>
      )}

      {/* Upload Section */}
      <Card className="p-6 border-2 border-dashed border-border">
        <div className="text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Upload WebP Files</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Only WebP files are accepted. Please convert your images to WebP format before uploading.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".webp,image/webp"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || isViewer}
          >
            {uploading ? 'Uploading...' : isViewer ? 'Upload Disabled' : 'Select Files'}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <form onSubmit={handleYouTubeSave} className="flex flex-col sm:flex-row gap-3">
          <Input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste YouTube link"
            disabled={uploading || isViewer}
          />
          <Button type="submit" disabled={uploading || isViewer}>
            {isViewer ? 'Disabled' : 'Add YouTube Video'}
          </Button>
        </form>
      </Card>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'image', 'video'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && ` (${media.filter((m) => m.type === f).length})`}
          </Button>
        ))}
      </div>

      {/* Media Grid */}
      {authLoading ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Authenticating...</p>
        </Card>
      ) : loading ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading media...</p>
        </Card>
      ) : filteredMedia.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted relative group">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${item.url}`);
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ccc" width="100" height="100"/%3E%3Ctext x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23999"%3EImage failed to load%3C/text%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <iframe
                    src={getYouTubeEmbedUrl(item.url) || undefined}
                    title={item.filename}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!isViewer && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="bg-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  {item.type === 'image' ? (
                    <ImageIcon className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Video className="h-4 w-4 text-red-600" />
                  )}
                  <p className="text-xs font-medium truncate">{item.filename}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.type === 'image' ? `${(item.size / 1024 / 1024).toFixed(2)} MB` : 'YouTube link'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(item.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No media files yet</p>
        </Card>
      )}
    </div>
  );
}