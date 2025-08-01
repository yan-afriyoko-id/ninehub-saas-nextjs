import Image from 'next/image';

interface ImageCardProps {
  title: string;
  imageUrl: string;
  alt: string;
  description?: string;
  onClick?: () => void;
  showOverlay?: boolean;
}

export default function ImageCard({ 
  title, 
  imageUrl, 
  alt, 
  description, 
  onClick, 
  showOverlay = false 
}: ImageCardProps) {
  return (
    <div 
      className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden cursor-pointer hover:border-gray-600 transition-colors"
      onClick={onClick}
    >
      <div className="relative">
        <Image 
          src={imageUrl} 
          alt={alt}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-lg font-semibold">{title}</h3>
              {description && (
                <p className="text-sm text-gray-300 mt-1">{description}</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>
    </div>
  );
} 