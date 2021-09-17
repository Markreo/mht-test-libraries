export const <%= name.replace('-', '_').toUpperCase() %> = {};
export const ENDPOINT_<%= name.replace('-', '_').toUpperCase() %> = '/<%= dasherize(name) %>';
export const LABEL_<%= name.replace('-', '_').toUpperCase() %> = '<%= capitalize(name) %>';
export const COLUMNS_<%= name.replace('-', '_').toUpperCase() %> = [];
