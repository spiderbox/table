/**
 * vue-table
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../table-core/build/esm/index.js');
var vue = require('vue');
var mergeProxy = require('./merge-proxy.js');

const FlexRender = {
  props: ['render', 'props'],
  setup: props => {
    return () => {
      if (typeof props.render === 'function' || typeof props.render === 'object') {
        return vue.h(props.render, props.props);
      }

      return props.render;
    };
  }
};
function useVueTable(options) {
  const resolvedOptions = mergeProxy.mergeProxy({
    state: {},
    // Dummy state
    onStateChange: () => {},
    // noop
    renderFallbackValue: null,

    mergeOptions(defaultOptions, options) {
      return mergeProxy.mergeProxy(defaultOptions, options);
    }

  }, options);
  const table = index.createTable(resolvedOptions); // can't use `reactive` because update needs to be immutable

  const state = vue.ref(table.initialState);
  vue.watchEffect(() => {
    table.setOptions(prev => {
      var _options$state;

      const stateProxy = new Proxy({}, {
        get: (_, prop) => state.value[prop]
      });
      return mergeProxy.mergeProxy(prev, options, {
        // merge the initialState and `options.state`
        // create a new proxy on each `setOptions` call
        // and get the value from state on each property access
        state: mergeProxy.mergeProxy(stateProxy, (_options$state = options.state) != null ? _options$state : {}),
        // Similarly, we'll maintain both our internal state and any user-provided
        // state.
        onStateChange: updater => {
          if (updater instanceof Function) {
            state.value = updater(state.value);
          } else {
            state.value = updater;
          }

          options.onStateChange == null ? void 0 : options.onStateChange(updater);
        }
      });
    });
  });
  return table;
}

exports.ColumnSizing = index.ColumnSizing;
exports.Expanding = index.Expanding;
exports.Filters = index.Filters;
exports.Grouping = index.Grouping;
exports.Headers = index.Headers;
exports.Ordering = index.Ordering;
exports.Pagination = index.Pagination;
exports.Pinning = index.Pinning;
exports.RowSelection = index.RowSelection;
exports.Sorting = index.Sorting;
exports.Visibility = index.Visibility;
exports.aggregationFns = index.aggregationFns;
exports.buildHeaderGroups = index.buildHeaderGroups;
exports.createCell = index.createCell;
exports.createColumn = index.createColumn;
exports.createColumnHelper = index.createColumnHelper;
exports.createRow = index.createRow;
exports.createTable = index.createTable;
exports.defaultColumnSizing = index.defaultColumnSizing;
exports.expandRows = index.expandRows;
exports.filterFns = index.filterFns;
exports.flattenBy = index.flattenBy;
exports.functionalUpdate = index.functionalUpdate;
exports.getCoreRowModel = index.getCoreRowModel;
exports.getExpandedRowModel = index.getExpandedRowModel;
exports.getFacetedMinMaxValues = index.getFacetedMinMaxValues;
exports.getFacetedRowModel = index.getFacetedRowModel;
exports.getFacetedUniqueValues = index.getFacetedUniqueValues;
exports.getFilteredRowModel = index.getFilteredRowModel;
exports.getGroupedRowModel = index.getGroupedRowModel;
exports.getPaginationRowModel = index.getPaginationRowModel;
exports.getSortedRowModel = index.getSortedRowModel;
exports.isFunction = index.isFunction;
exports.isRowSelected = index.isRowSelected;
exports.isSubRowSelected = index.isSubRowSelected;
exports.makeStateUpdater = index.makeStateUpdater;
exports.memo = index.memo;
exports.noop = index.noop;
exports.orderColumns = index.orderColumns;
exports.passiveEventSupported = index.passiveEventSupported;
exports.reSplitAlphaNumeric = index.reSplitAlphaNumeric;
exports.selectRowsFn = index.selectRowsFn;
exports.shouldAutoRemoveFilter = index.shouldAutoRemoveFilter;
exports.sortingFns = index.sortingFns;
exports.FlexRender = FlexRender;
exports.useVueTable = useVueTable;
//# sourceMappingURL=index.js.map
