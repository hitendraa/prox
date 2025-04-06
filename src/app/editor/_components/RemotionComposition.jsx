import { AbsoluteFill, Sequence, useVideoConfig, useCurrentFrame, Audio } from "remotion";
import { AudioTracks } from "@/app/_data/AudioTracks";

const getEasing = (type, t) => {
  switch (type) {
    case 'easeInSine':
      return 1 - Math.cos((t * Math.PI) / 2);
    case 'easeOutSine':
      return Math.sin((t * Math.PI) / 2);
    case 'easeInOutSine':
      return -(Math.cos(Math.PI * t) - 1) / 2;
    case 'easeInQuad':
      return t * t;
    case 'easeOutQuad':
      return 1 - (1 - t) * (1 - t);
    case 'easeInOutQuad':
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    case 'easeInCubic':
      return t * t * t;
    case 'easeOutCubic':
      return 1 - Math.pow(1 - t, 3);
    case 'easeInOutCubic':
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    case 'easeInElastic':
      return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
    case 'easeOutElastic':
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    case 'easeInOutElastic':
      return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 
        ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2
        : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2 + 1;
    default:
      return t; // linear
  }
};

function RemotionComposition({ frameList, audioTrack, audioVolume = 1 }) {
  let trackFrame = 0;
  const { width, height, fps } = useVideoConfig();
  const currentFrame = useCurrentFrame();

  const getBackgroundStyle = (background) => {
    if (!background) return { backgroundColor: "#000000" };

    switch (background.type) {
      case "color":
        return { backgroundColor: background.color || "#000000" };
      case "gradient":
        return {
          background: `linear-gradient(45deg, ${background.gradientStart || "#000000"}, ${background.gradientEnd || "#000000"})`,
        };
      case "image":
        return {
          backgroundImage: `url(${background.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      default:
        return { backgroundColor: "#000000" };
    }
  };

  const getAnimationStyle = (startFrame, frame) => {
    if (!frame.animation || frame.animation === 'none') {
      return { opacity: 1 };
    }

    const delayFrames = (frame.animationDelay || 0) * fps;
    const durationFrames = (frame.animationDuration || 1) * fps;
    const relativeFrame = currentFrame - startFrame - delayFrames;
    const intensity = frame.animationIntensity || 1;
    
    if (relativeFrame < 0) {
      return getInitialState(frame.animation);
    }
    
    if (relativeFrame >= durationFrames) {
      return { opacity: 1, transform: 'none' };
    }
    
    const progress = getEasing(
      frame.animationTiming || 'easeOutCubic',
      Math.min(relativeFrame / durationFrames, 1)
    );

    switch (frame.animation) {
      case 'fadeIn':
        return { opacity: progress };
      case 'fadeInUp':
        return {
          opacity: progress,
          transform: `translateY(${(1 - progress) * 50}px)`
        };
      case 'fadeInDown':
        return {
          opacity: progress,
          transform: `translateY(${(progress - 1) * 50}px)`
        };
      case 'fadeInScale':
        return {
          opacity: progress,
          transform: `scale(${0.5 + (progress * 0.5)})`
        };
      case 'slideFromLeft':
        return { transform: `translateX(${(progress - 1) * width}px)` };
      case 'slideFromRight':
        return { transform: `translateX(${(1 - progress) * width}px)` };
      case 'slideFromTop':
        return { transform: `translateY(${(progress - 1) * height}px)` };
      case 'slideFromBottom':
        return { transform: `translateY(${(1 - progress) * height}px)` };
      case 'scaleUp':
        return { 
          transform: `scale(${progress})`,
          opacity: progress 
        };
      case 'scaleDown':
        return { 
          transform: `scale(${2 - progress})`,
          opacity: progress 
        };
      case 'scalePop':
        const popScale = progress < 0.7 
          ? 1 + Math.sin(progress * Math.PI) * 0.3 
          : 1;
        return { 
          transform: `scale(${popScale})`,
          opacity: progress 
        };
      case 'rotateIn':
        return { 
          transform: `rotate(${(1 - progress) * 360}deg)`,
          opacity: progress 
        };
      case 'rotateInScale':
        return { 
          transform: `rotate(${(1 - progress) * 360}deg) scale(${progress})`,
          opacity: progress 
        };
      case 'rotateInFade':
        return { 
          transform: `rotate(${(1 - progress) * 180}deg)`,
          opacity: progress 
        };
      case 'bounce':
        const bounceHeight = Math.sin(progress * Math.PI * (2 + intensity)) * (1 - progress) * 50 * intensity;
        return { 
          transform: `translateY(${bounceHeight}px)`,
          opacity: Math.min(progress * 2, 1)
        };
      case 'elastic':
        const elasticX = Math.sin(progress * Math.PI * (3 + intensity)) * (1 - progress) * 30 * intensity;
        const elasticScale = 1 + Math.sin(progress * Math.PI * 2) * 0.1;
        return { 
          transform: `translateX(${elasticX}px) scale(${elasticScale})`,
          opacity: Math.min(progress * 2, 1)
        };
      case 'wave':
        const waveY = Math.sin(progress * Math.PI * (3 + intensity)) * 20 * intensity;
        const waveRotate = Math.sin(progress * Math.PI * (2 + intensity)) * 10 * intensity;
        return { 
          transform: `translateY(${waveY}px) rotate(${waveRotate}deg)`,
          opacity: Math.min(progress * 2, 1)
        };
      case 'glitch':
        if (progress > 0.95) return { opacity: 1 };
        const glitchX = Math.random() * 10 * intensity * (progress < 0.5 ? 1 : (1 - progress));
        const glitchY = Math.random() * 10 * intensity * (progress < 0.5 ? 1 : (1 - progress));
        const glitchOpacity = Math.random() * 0.1 + 0.9;
        return { 
          transform: `translate(${glitchX}px, ${glitchY}px)`,
          opacity: glitchOpacity
        };
      case 'typewriter':
        if (!frame.text) return { opacity: 1 };
        const typingProgress = Math.floor(progress * frame.text.length);
        const visibleText = frame.text.slice(0, typingProgress);
        const speed = frame.typingSpeed || 1;
        return {
          clipPath: `inset(0 ${100 - (progress * 100)}% 0 0)`,
          opacity: 1,
          animation: `cursor ${0.5 / speed}s step-end infinite`
        };
      default:
        return { opacity: 1 };
    }
  };

  const getInitialState = (animation) => {
    switch (animation) {
      case 'fadeIn':
      case 'fadeInUp':
      case 'fadeInDown':
      case 'fadeInScale':
        return { opacity: 0 };
      case 'slideFromLeft':
        return { transform: `translateX(${-width}px)` };
      case 'slideFromRight':
        return { transform: `translateX(${width}px)` };
      case 'slideFromTop':
        return { transform: `translateY(${-height}px)` };
      case 'slideFromBottom':
        return { transform: `translateY(${height}px)` };
      case 'scaleUp':
      case 'scalePop':
        return { transform: 'scale(0)', opacity: 0 };
      case 'scaleDown':
        return { transform: 'scale(2)', opacity: 0 };
      case 'rotateIn':
      case 'rotateInScale':
      case 'rotateInFade':
        return { transform: 'rotate(360deg)', opacity: 0 };
      case 'typewriter':
        return { clipPath: 'inset(0 100% 0 0)' };
      default:
        return { opacity: 1 };
    }
  };

  const getAudioForFrame = (frame) => {
    if (!frame.audioTrack) return null;
    const audioTrack = AudioTracks.find(track => track.id === frame.audioTrack);
    if (!audioTrack) return null;

    return (
      <Audio
        src={audioTrack.src}
        volume={frame.audioVolume || 1}
      />
    );
  };

  const getGlobalAudio = () => {
    if (!audioTrack || audioTrack === "none") return null;
    const track = AudioTracks.find(t => t.id === audioTrack);
    if (!track) return null;

    return (
      <Audio
        src={track.src}
        volume={audioVolume}
      />
    );
  };

  return (
    <AbsoluteFill>
      {getGlobalAudio()}
      {frameList.map((frame, index) => {
        const fromFrame = index === 0 ? 0 : trackFrame;
        trackFrame = trackFrame + frame.duration * fps;
        const duration = frame.duration * fps;

        return (
          <Sequence key={index} from={fromFrame} durationInFrames={duration}>
            {getAudioForFrame(frame)}
            <AbsoluteFill
              style={{
                ...getBackgroundStyle(frame.background),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  color: frame?.textColor || "#ffffff",
                  fontSize: `${frame?.fontSize || 32}px`,
                  margin: 0,
                  padding: "0 20px",
                  fontFamily: frame?.fontFamily === 'default' ? 'var(--font-sans)' : frame?.fontFamily,
                  ...getAnimationStyle(fromFrame, frame),
                }}
              >
                {frame.text}
              </h2>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}

export default RemotionComposition;
