import { FunctionComponent, ReactNode, CSSProperties } from 'react';
import { ImageProps as TImageProps } from '@tarojs/components';
export interface ImageProps extends Omit<TImageProps, 'style'> {
    style?: CSSProperties;
    width: string | number;
    height: string | number;
    radius: string | number;
    error: boolean | ReactNode;
    loading: boolean | ReactNode;
}
export declare const Image: FunctionComponent<Partial<ImageProps>>;
