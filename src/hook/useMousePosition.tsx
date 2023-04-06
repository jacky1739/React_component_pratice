import React, { useState, useEffect } from 'react'

const useMousePosition = () => {

  const [ positions, setPosition ] = useState({ x: 0, y: 0})
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY})
    }

    document.addEventListener('mousemove', updatePosition)
  }, [])
  return positions
}
export default useMousePosition