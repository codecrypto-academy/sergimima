import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md relative text-white">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
