/**
 * svelte-table
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
var placeholder = require('./placeholder.js');
var internal = require('svelte/internal');
var store = require('svelte/store');
var renderComponent = require('./render-component.js');

function isSvelteServerComponent(component) {
  return typeof component === 'object' && typeof component.$$render === 'function' && typeof component.render === 'function';
}

function isSvelteClientComponent(component) {
  var _component$name, _component$name2;

  let isHMR = ('__SVELTE_HMR' in window);
  return component.prototype instanceof internal.SvelteComponent || isHMR && ((_component$name = component.name) == null ? void 0 : _component$name.startsWith('Proxy<')) && ((_component$name2 = component.name) == null ? void 0 : _component$name2.endsWith('>'));
}

function isSvelteComponent(component) {
  if (typeof document === 'undefined') {
    return isSvelteServerComponent(component);
  } else {
    return isSvelteClientComponent(component);
  }
}

function wrapInPlaceholder(content) {
  return renderComponent.renderComponent(placeholder["default"], {
    content
  });
}

function flexRender(component, props) {
  if (!component) return null;

  if (isSvelteComponent(component)) {
    return renderComponent.renderComponent(component, props);
  }

  if (typeof component === 'function') {
    const result = component(props);

    if (isSvelteComponent(result)) {
      return result;
    }

    return wrapInPlaceholder(result);
  }

  return wrapInPlaceholder(component);
}
function createSvelteTable(options) {
  let optionsStore;

  if ('subscribe' in options) {
    optionsStore = options;
  } else {
    optionsStore = store.readable(options);
  }

  let resolvedOptions = {
    state: {},
    // Dummy state
    onStateChange: () => {},
    // noop
    renderFallbackValue: null,
    ...store.get(optionsStore)
  };
  let table = index.createTable(resolvedOptions);
  let stateStore = store.writable(
  /** @type {number} */
  table.initialState); // combine stores

  let stateOptionsStore = store.derived([stateStore, optionsStore], s => s);
  const tableReadable = store.readable(table, function start(set) {
    const unsubscribe = stateOptionsStore.subscribe(_ref => {
      let [state, options] = _ref;
      table.setOptions(prev => {
        return { ...prev,
          ...options,
          state: { ...state,
            ...options.state
          },
          // Similarly, we'll maintain both our internal state and any user-provided
          // state.
          onStateChange: updater => {
            if (updater instanceof Function) {
              stateStore.update(updater);
            } else {
              stateStore.set(updater);
            }

            resolvedOptions.onStateChange == null ? void 0 : resolvedOptions.onStateChange(updater);
          }
        };
      }); // it didn't seem to rerender without setting the table

      set(table);
    });
    return function stop() {
      unsubscribe();
    };
  });
  return tableReadable;
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
exports.renderComponent = renderComponent.renderComponent;
exports.createSvelteTable = createSvelteTable;
exports.flexRender = flexRender;
//# sourceMappingURL=index.js.map
