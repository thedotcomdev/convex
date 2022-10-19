/// <reference types="react" />
import { Story } from '@storybook/react';
import { IconProps, IconSource } from './Icon';
declare const _default: {
    title: string;
    component: ({ source, color, size, accessibilityLabel, }: IconProps) => JSX.Element;
    argTypes: {
        icons: {
            table: {
                disable: boolean;
            };
        };
        source: {
            control: boolean;
        };
    };
};
export default _default;
export declare const AllIcons: Story<IconProps & {
    icons: IconSource[];
}>;
export declare const App: Story<IconProps & {
    icons: IconSource[];
}>;
export declare const Document: Story<IconProps & {
    icons: IconSource[];
}>;
export declare const Brand: Story<IconProps & {
    icons: IconSource[];
}>;
