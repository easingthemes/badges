import { createSelector } from 'reselect';

const selectBreadcrumbsDomain = () => state => state.get('breadcrumbs');

const selectBreadcrumbs = () => createSelector(
  selectBreadcrumbsDomain(),
  (substate) => substate.toJS()
);

export default selectBreadcrumbs;
export {
  selectBreadcrumbs,
  selectBreadcrumbsDomain,
};
