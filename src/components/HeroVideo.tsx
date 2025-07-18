import React from 'react';

interface HeroVideoProps {
  className?: string;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ className = '' }) => {
  return (
    <video
      className={`absolute inset-0 w-full h-full object-cover brightness-50 ${className}`}
      autoPlay
      muted
      loop
      playsInline
      onError={(e) => {
        // If video fails to load, hide the video element and show fallback
        const target = e.target as HTMLVideoElement;
        target.style.display = 'none';
        const fallbackImg = target.nextElementSibling as HTMLImageElement;
        if (fallbackImg) {
          fallbackImg.style.display = 'block';
        }
      }}
    >
      {/* Try multiple video sources */}
      <source src="https://cdn.pixabay.com/video/2019/07/15/25323-349094716_large.mp4" type="video/mp4" />
      <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
      
      {/* Fallback image - hidden by default, shown if video fails */}
      <img
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1950&q=80"
        alt="Post-production workspace"
        style={{ display: 'none' }}
      />
    </video>
  );
};

export default HeroVideo;
