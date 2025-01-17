import {
  NgDocBreadcrumbComponent,
  NgDocPageNavigationComponent,
  NgDocTocComponent,
} from '@sijil/app/components';
import { NgDocPageSkeleton } from '@sijil/app/interfaces';

export const NG_DOC_DEFAULT_PAGE_SKELETON: NgDocPageSkeleton = {
  breadcrumbs: NgDocBreadcrumbComponent,
  navigation: NgDocPageNavigationComponent,
  toc: NgDocTocComponent,
};
