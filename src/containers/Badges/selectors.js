import { createSelector } from 'reselect';

const selectBadgesPageDomain = () => state => state.get('badgesPage');

const selectBadges = () => createSelector(
  selectBadgesPageDomain(),
  (substate) => substate.toJS()
);

export default selectBadges;
export {
  selectBadges,
  selectBadgesPageDomain,
};
