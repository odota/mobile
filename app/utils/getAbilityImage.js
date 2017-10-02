import { getAbilityLow } from './getAbilityLow';
import { getAbilityHigh } from './getAbilityHigh';

export function getAbilityImage(id) {
	var staticImage;
	if(id <= 5914) {
		staticImage = getAbilityLow(id);
	} else {
		staticImage = getAbilityHigh(id);
	}
	return staticImage;
}
