import React, { FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (symbol: string) => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Select Stock/Crypto</h2>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
        <div className="modal-buttons">
          <button onClick={() => onSelect('dogecoin')}>Dogecoin</button>
          <button onClick={() => onSelect('bitcoin')}>Bitcoin</button>
          <button onClick={() => onSelect('ethereum')}>Ethereum</button>
          <button onClick={() => onSelect('ripple')}>Ripple</button>
          <button onClick={() => onSelect('litecoin')}>Litecoin</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
