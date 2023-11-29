import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const renderWithPortal = (component: ReactNode) => {
  return createPortal(component, document.body) as JSX.Element;
};