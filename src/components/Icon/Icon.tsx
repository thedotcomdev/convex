import React from 'react';

import { classNames } from '../../utils/css';
import { VisuallyHidden } from '../VisuallyHidden';

import type { IconSource } from '../../types';
import { Tetra } from './icons';
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

export const Icon = ({
  source = Tetra,
  color = 'currentColor',
  size = 'small',
  accessibilityLabel,
}: IconProps) => {
  let sourceType: 'function' | 'placeholder' | 'external';
  if (typeof source === 'function') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }
  const SourceComponent = source;
  const className = classNames('icon', size);

  const contentMarkup = {
    function: (
      <SourceComponent className='svg' focusable='false' aria-hidden='true' />
    ),
    placeholder: (
      <Tetra className='svg placeholder' focusable='false' aria-hidden='true' />
    ),
    external: (
      <img
        className='img'
        src={`data:image/svg+xml;utf8,${source}`}
        alt=''
        aria-hidden='true'
      />
    ),
  };

  return (
    <span className={className} style={{ fill: color }}>
      <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
      {contentMarkup['function']}
    </span>
  );
};

export type { IconSource } from '../../types';
