import React from 'react';
import './Modal.scss';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(
    <div className="layout">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot as HTMLElement,
  );
};
