import { useState } from 'react';

function PopupBox() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      style={{ position: 'relative' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            top: mousePosition.y + 10,
            left: mousePosition.x + 10,
            backgroundColor: '#fff',
            border: '1px solid #000',
            padding: '10px',
          }}
        >
          This is a popup box!
        </div>
      )}
    </div>
  );
}

export default PopupBox;