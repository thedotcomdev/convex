import React from 'react';
import './VisuallyHidden.scss';

export interface VisuallyHiddenProps {
  /** The content to be hidden visually */
  children?: React.ReactNode;
}

export const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return <span className='visually-hidden'>{children}</span>;
};
