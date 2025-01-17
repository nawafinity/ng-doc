import { NgDocApiScope } from './api-scope';
import { SjlBaseEntity } from './base-entity';
import { SjlCategory } from './category';

export interface NgDocApi extends SjlBaseEntity {
  /** The API scopes, you can use it to define scopes for files that should be included to the API */
  scopes: NgDocApiScope[];
  /** The page category */
  category?: SjlCategory;
  /**
   * Custom keyword that uses to create links to this page
   */
  keyword?: string;
  route?: string;
}
