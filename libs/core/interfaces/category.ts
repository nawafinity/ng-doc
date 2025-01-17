import { SjlBaseEntity } from './base-entity';

export interface SjlCategory extends SjlBaseEntity {
  /** The parent category */
  category?: SjlCategory;
  /** Render the page only for specific build tags */
  onlyForTags?: string[];
  /** Determines whether the category is expandable */
  expandable?: boolean;
  /** Determines whether the category should be expanded by default */
  expanded?: boolean;
  route?: string;
}
