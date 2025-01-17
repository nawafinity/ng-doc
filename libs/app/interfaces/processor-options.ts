import { InputType } from '@sijil/core';

export interface NgDocProcessorOptions<T, K extends keyof T = keyof T> {
  content?: Node[][];
  inputs?: Partial<{
    [key in K]: InputType<T, key>;
  }>;
}
