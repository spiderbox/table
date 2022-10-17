/**
 * solid-table
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
var solidJs = require('solid-js');
var store = require('solid-js/store');

// /** @jsxImportSource solid-js */
function flexRender(Comp, props) {
  if (!Comp) return null;

  if (typeof Comp === 'function') {
    return solidJs.createComponent(Comp, props);
  }

  return Comp;
}
function createSolidTable(options) {
  const resolvedOptions = solidJs.mergeProps({
    state: {},
    // Dummy state
    onStateChange: () => {},
    // noop
    renderFallbackValue: null,
    mergeOptions: (defaultOptions, options) => {
      return solidJs.mergeProps(defaultOptions, options);
    }
  }, options);
  const table = index.createTable(resolvedOptions);
  const [state, setState] = store.createStore(table.initialState);
  solidJs.createComputed(() => {
    table.setOptions(prev => {
      return solidJs.mergeProps(prev, options, {
        state: solidJs.mergeProps(state, options.state || {}),
        // Similarly, we'll maintain both our internal state and any user-provided
        // state.
        onStateChange: updater => {
          // merging isn't required because stores shallow update
          setState(updater);
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
exports.createSolidTable = createSolidTable;
exports.flexRender = flexRender;
//# sourceMappingURL=index.js.map
