import React from 'react';

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) => {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  const containerStyles = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    background: isDark
      ? `rgba(0, 0, 0, ${backgroundOpacity})`
      : `rgba(255, 255, 255, ${backgroundOpacity})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation})`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
    border: isDark
      ? `1px solid rgba(255, 255, 255, 0.12)`
      : `1px solid rgba(0, 0, 0, 0.08)`,
    boxShadow: isDark
      ? `0 0 2px 1px rgba(255, 255, 255, 0.06) inset,
         0 0 10px 4px rgba(255, 255, 255, 0.03) inset,
         0px 4px 16px rgba(17, 17, 26, 0.08),
         0px 8px 24px rgba(17, 17, 26, 0.06),
         0px 16px 56px rgba(17, 17, 26, 0.05)`
      : `0 0 2px 1px rgba(0, 0, 0, 0.04) inset,
         0 0 10px 4px rgba(0, 0, 0, 0.02) inset,
         0px 4px 16px rgba(17, 17, 26, 0.06),
         0px 8px 24px rgba(17, 17, 26, 0.05),
         0px 16px 56px rgba(17, 17, 26, 0.04)`,
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden transition-opacity duration-300 ease-out ${className}`}
      style={containerStyles}
    >
      <div className="w-full h-full flex flex-col p-2 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
