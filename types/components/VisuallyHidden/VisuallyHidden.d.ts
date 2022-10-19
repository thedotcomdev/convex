import React from 'react';
import './VisuallyHidden.scss';
export interface VisuallyHiddenProps {
    /** The content to be hidden visually */
    children?: React.ReactNode;
}
export declare const VisuallyHidden: ({ children }: VisuallyHiddenProps) => JSX.Element;
