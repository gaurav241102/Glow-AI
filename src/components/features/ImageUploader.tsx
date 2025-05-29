import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import Button from '../ui/Button';

interface ImageUploaderProps {
  onImageCapture?: (file: File) => void;
  onImageUpload?: (file: File) => void;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  aspectRatio?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageCapture,
  onImageUpload,
  maxSize = 10, // 10MB default
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  aspectRatio = '1:1',
  className = '',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    validateAndProcessFile(file);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    
    validateAndProcessFile(file);
  };
  
  const validateAndProcessFile = (file: File) => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`File type not supported. Please upload: ${acceptedTypes.join(', ')}`);
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }
    
    // Clear previous errors
    setError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Call the appropriate callback
    handleImageUpload(file);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const result = await analyzeSkinImage(file);
      if (onImageUpload) {
        onImageUpload(result);
      }
    } catch (error) {
      console.error('Failed to analyze image:', error);
      setError('Failed to analyze image. Please try again.');
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const clearImage = () => {
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className={`w-full ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes.join(',')}
        className="hidden"
        aria-label="Upload image"
      />
      
      {previewUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-auto object-cover"
            style={{ aspectRatio }}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-600 hover:text-error-600 transition-colors"
            aria-label="Remove image"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={triggerFileInput}
          style={{ minHeight: '200px' }}
          role="button"
          tabIndex={0}
          aria-label="Drop image here or click to upload"
        >
          <div className="mb-4 text-gray-400">
            <Upload size={40} />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Drag & drop your image here
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Supported formats: {acceptedTypes.map(type => type.split('/')[1]).join(', ')}
          </p>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<Upload size={16} />}
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              Browse files
            </Button>
            {onImageCapture && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<Camera size={16} />}
                onClick={(e) => {
                  e.stopPropagation();
                  // This would trigger the camera in a real implementation
                  alert('Camera functionality would be implemented here');
                }}
              >
                Take photo
              </Button>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-error-600">{error}</p>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        Max file size: {maxSize}MB
      </p>
    </div>
  );
};

export default ImageUploader;