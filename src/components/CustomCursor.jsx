import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPosition, setFollowerPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add a slight delay for the follower
      setTimeout(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const updatePointerStatus = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const isPointerElement = hoveredElement && 
        (hoveredElement.tagName === 'BUTTON' || 
         hoveredElement.tagName === 'A' || 
         window.getComputedStyle(hoveredElement).cursor === 'pointer');
      
      setIsPointer(isPointerElement);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousemove', updatePointerStatus);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousemove', updatePointerStatus);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position.x, position.y]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <div 
        className="custom-cursor" 
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: isPointer ? '30px' : '20px',
          height: isPointer ? '30px' : '20px',
          backgroundColor: isClicking ? '#ff00ff' : '#00ffff',
          borderRadius: '50%',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s'
        }}
      />
      <div 
        className="cursor-follower" 
        style={{ 
          transform: `translate(${followerPosition.x - 20}px, ${followerPosition.y - 20}px) scale(${isClicking ? 0.5 : 1})`,
          opacity: isClicking ? 0.3 : 0.5
        }}
      />
    </>
  );
};

export default CustomCursor;