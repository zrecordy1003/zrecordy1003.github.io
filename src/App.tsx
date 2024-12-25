import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [sealing, setSealing] = useState(false);
  const [sealingHover, setSealingHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [letterMove, setLetterMove] = useState(false);

  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Math.random(), // 唯一的 ID，用於識別軌跡點
        opacity: 1, // 初始透明度
      };

      // 新增軌跡點到列表
      setTrail((prev) => [...prev, newTrail]);

      // 在一段時間後逐漸減少透明度並移除
      setTimeout(() => {
        setTrail((prev) => prev.map((point) =>
          point.id === newTrail.id ? { ...point, opacity: 0 } : point
        ));
      }, 50);

      setTimeout(() => {
        setTrail((prev) => prev.filter((point) => point.id !== newTrail.id));
      }, 1000); // 1秒後移除軌跡點
    };

    // 綁定滑鼠移動事件
    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      // 清除事件監聽
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  if (sealing) {
    setTimeout(() => {
      setOpen(true);
    }, 500);
  }

  if (open) {
    setTimeout(() => {
      setLetterMove(true);
    }, 2000);
  }

  return (
    <div style={{ minWidth: '100vw', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      {trail.map((point) => (
        <div
          key={point.id}
          style={{
            position: 'absolute',
            top: point.y,
            left: point.x,
            width: '10px',
            height: '10px',
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '50%',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            opacity: point.opacity,
            transition: 'opacity 0.9s ease-out',
          }}
        />
      ))}
      <div className='envelope' style={{ animation: open ? 'envelopeMove' : 'initEnvelope 2s' }}>
        <div
          className={`sealingWax ${sealing ? 'clicked' : ''}${sealingHover ? 'mouseEnter' : ''}`}
          onClick={() => setSealing(true)}
        // onMouseEnter={() => setSealingHover(true)}
        // onMouseLeave={() => setSealingHover(false)}
        />
        {/* <div className={`sealingWax ${sealingHover ? 'mouseEnter' : ''}`} /> */}
        <div className='envelope-top' style={{ animationName: open ? 'envelopeOpen' : 'none', zIndex: letterMove ? '-2' : '1' }} />
        <div className='envelope-bottom' />
        <div className={`letter ${letterMove ? 'active' : ''}`} style={{ color: 'black' }} >  </div>
      </div>
    </div>
  )
}

export default App