import {NgDocCategoryPoint} from '../engine/category';
import {Constructable} from '../types';

/**
 *
 * @param page
 */
export function isCategoryPoint(page: InstanceType<Constructable>): page is NgDocCategoryPoint {
	return page instanceof NgDocCategoryPoint;
}
