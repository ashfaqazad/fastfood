import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 2000, // Increase the zIndex to ensure it is above the Navbar
  height: '90%',
  width: '90%',
  overflow: 'auto', // Add this line to handle overflow
  boxShadow: '0 4px 8px rgba(255, 255, 255, 0.5)' // White shadow
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 2000 // Match the zIndex with the modal
}

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div className='text-white' style={OVERLAY_STYLES} />
      <div className='text-white' style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "10px" }} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}
