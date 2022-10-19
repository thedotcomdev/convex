/// <reference types="react" />
import type { IconSource } from '../../types';
import './Icon.scss';
export interface IconProps {
    /** The SVG contents to display in the icon (icons should fit in a 16 × 16 pixel viewBox) */
    source: IconSource;
    /** Set the color for the SVG fill */
    color?: string;
    /** 16px, 20px, 24px */
    size?: 'small' | 'medium' | 'large';
    /** Descriptive text to be read to screenreaders */
    accessibilityLabel?: string;
}
export declare const Icon: ({ source, color, size, accessibilityLabel, }: IconProps) => JSX.Element;
export type { IconSource } from '../../types';
