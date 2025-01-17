import { NgDocBooleanHandler, NgDocHandler } from '@sijil/ui-kit/types';

export const NG_DOC_ALWAYS_FALSE_HANDLER: NgDocBooleanHandler<unknown> = () => false;
export const NG_DOC_DEFAULT_HANDLER: NgDocHandler<unknown, unknown> = (item: unknown) => item;
