import { createSelector } from 'reselect';

const selectPathwaysPageDomain = () => state => state.get('pathwaysPage');

const selectPathways = () => createSelector(
  selectPathwaysPageDomain(),
  (substate) => substate.toJS()
);

export default selectPathways;
export {
  selectPathways,
  selectPathwaysPageDomain,
};
