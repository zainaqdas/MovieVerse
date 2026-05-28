"use client"
import { useRef, useEffect } from 'react';
import Hls from 'hls.js';

interface HLSPlayerProps {
  url: string;
  startAtSeconds?: number;
  controls?: boolean;
  ondataloaded?: (loaded: boolean) => void;
  speed?: number;
}

const HLSPlayer = ({ url, startAtSeconds, controls, ondataloaded, speed }: HLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on('hlsManifestParsed' as any, () => {
        if (startAtSeconds) {
          video.currentTime = startAtSeconds;
        }
        video.play().catch(() => {});
      });

      hlsRef.current = hls;
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For browsers that support HLS natively
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        if (startAtSeconds) {
          video.currentTime = startAtSeconds;
        }
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url, startAtSeconds]);

  return (
    <video
      ref={videoRef}
      controls={controls || false}
      autoPlay={!controls}
      muted={!controls}
      preload={!controls ? "auto" : "metadata"}
      onCanPlay={() => ondataloaded?.(true)}
      onLoadStart={(event) => {
        event.currentTarget.playbackRate = speed || 1;
      }}
      className="w-full h-full object-cover"
    />
  );
};

export default HLSPlayer;
