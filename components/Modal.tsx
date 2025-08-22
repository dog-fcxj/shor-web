/**
 * @file Modal.tsx
 * A generic, reusable modal (or dialog) component. It provides a container
 * that overlays the main content and can be closed by clicking the background
 * or a close button.
 */

import React from 'react';

/**
 * Props for the Modal component.
 */
interface ModalProps {
  /** Determines whether the modal is visible or not. */
  isOpen: boolean;
  /** Callback function that is invoked when the modal should be closed. */
  onClose: () => void;
  /** The content to be displayed inside the modal. */
  children: React.ReactNode;
}

/**
 * A reusable modal component that displays content in a centered overlay.
 * @param {ModalProps} props - The props for the component.
 */
function Modal({ isOpen, onClose, children }: ModalProps) {
  // Don't render anything if the modal is not open.
  if (!isOpen) return null;

  return (
    // The full-screen overlay that captures clicks to close the modal.
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* The modal content container. stopPropagation prevents clicks inside from closing it. */}
      <div
        className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full max-w-2xl p-6 sm:p-8 relative transform transition-all duration-300 ease-out scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
      {/* Simple CSS animation for the modal entrance. */}
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Modal;
