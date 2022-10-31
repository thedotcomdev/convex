import React from 'react';

import type { IconSource } from '../../types';
import { classNames } from '../../utils/css';
import { ColorType } from '../Color';
import { VisuallyHidden } from '../VisuallyHidden';

import './Icon.scss';
import { IconName, IconsByName, Placeholder } from './icons';

export interface IconProps {
  /** The SVG contents to display in the icon (icons should fit in a 16 × 16 pixel viewBox) */
  source?: IconSource | IconName;
  /** Set the color for the SVG fill */
  color?: ColorType | 'currentColor';
  /** 16px, 20px, 24px */
  size?: 'small' | 'medium' | 'large';
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
}

export const Icon = ({
  source = Placeholder,
  color = 'currentColor',
  size = 'small',
  accessibilityLabel
}: IconProps) => {
  let SourceComponent = Placeholder;
  if (typeof source === 'function') {
    SourceComponent = source;
  } else if (typeof source === 'string') {
    SourceComponent = IconsByName[source];
  }
  const className = classNames('icon', size);

  return (
    <span className={className} style={{ fill: color }}>
      <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
      <SourceComponent className='svg' focusable='false' aria-hidden='true' />
    </span>
  );
};

export type { IconSource } from '../../types';
export type { IconName, IconsByName } from './icons';
