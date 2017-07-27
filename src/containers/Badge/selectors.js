import { createSelector } from 'reselect';

const selectBadgePageDomain = () => state => state.get('badgePage');

const selectBadge = () => createSelector(
  selectBadgePageDomain(),
  (substate) => substate.toJS()
);

export default selectBadge;
export {
  selectBadge,
  selectBadgePageDomain,
};
