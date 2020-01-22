import merge from 'lodash.merge';

const mixins = [
  require('./ark').default,
  require('./network').default,
  require('./currency').default,
  require('./strings').default,
  require('./misc').default
];

export default merge([], ...mixins);
