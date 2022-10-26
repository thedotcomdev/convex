import React from 'react';
import { Story } from '@storybook/react';

import { Color, ColorKey } from '../Color';

import { Icon, IconProps, IconSource } from './Icon';
import { AppIconSet, DocumentIconSet, BrandIconSet } from './icons';

/**
 * Helper component for displaying Icon sets in Storybook
 * @param {IconProps} args \<Icon\> args
 * @param {IconSource[]} icons icon set
 */
const IconGroup = (args: IconProps & { icons: IconSource[] }) => {
  const { icons, ...iconProps } = args;
  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, 24px)'
      }}
    >
      {icons.map((icon, i) => (
        <Icon {...iconProps} source={icon} key={JSON.stringify(i)} />
      ))}
    </div>
  );
};

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    icons: {
      table: {
        disable: true
      }
    },
    color: {
      type: 'select',
      options: ColorKey
    },
    source: {
      control: false
    }
  }
};

const TemplateIconGroup: Story<IconProps & { icons: IconSource[] }> = (
  args
) => <IconGroup {...args} key={JSON.stringify(args)} />;

const defaultArgs: Partial<IconProps> = {
  color: Color.Default.Dark,
  size: 'small'
};

export const AllIcons = TemplateIconGroup.bind({});
AllIcons.args = {
  ...defaultArgs,
  icons: [...AppIconSet, ...DocumentIconSet, ...BrandIconSet]
};

export const App = TemplateIconGroup.bind({});
App.args = {
  ...defaultArgs,
  icons: AppIconSet
};

export const Document = TemplateIconGroup.bind({});
Document.args = {
  ...defaultArgs,
  icons: DocumentIconSet
};

export const Brand = TemplateIconGroup.bind({});
Brand.args = {
  ...defaultArgs,
  icons: BrandIconSet
};
