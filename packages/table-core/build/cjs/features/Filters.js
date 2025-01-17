/**
 * table-core
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

var filterFns = require('../filterFns.js');
var utils = require('../utils.js');

//
const Filters = {
  getDefaultColumnDef: () => {
    return {
      filterFn: 'auto'
    };
  },
  getInitialState: state => {
    return {
      columnFilters: [],
      globalFilter: undefined,
      // filtersProgress: 1,
      // facetProgress: {},
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onColumnFiltersChange: utils.makeStateUpdater('columnFilters', table),
      onGlobalFilterChange: utils.makeStateUpdater('globalFilter', table),
      filterFromLeafRows: false,
      globalFilterFn: 'auto',
      getColumnCanGlobalFilter: column => {
        var _table$getCoreRowMode, _table$getCoreRowMode2;

        const value = (_table$getCoreRowMode = table.getCoreRowModel().flatRows[0]) == null ? void 0 : (_table$getCoreRowMode2 = _table$getCoreRowMode._getAllCellsByColumnId()[column.id]) == null ? void 0 : _table$getCoreRowMode2.getValue();
        return typeof value === 'string' || typeof value === 'number';
      }
    };
  },
  createColumn: (column, table) => {
    return {
      getAutoFilterFn: () => {
        const firstRow = table.getCoreRowModel().flatRows[0];
        const value = firstRow == null ? void 0 : firstRow.getValue(column.id);

        if (typeof value === 'string') {
          return filterFns.filterFns.includesString;
        }

        if (typeof value === 'number') {
          return filterFns.filterFns.inNumberRange;
        }

        if (typeof value === 'boolean') {
          return filterFns.filterFns.equals;
        }

        if (value !== null && typeof value === 'object') {
          return filterFns.filterFns.equals;
        }

        if (Array.isArray(value)) {
          return filterFns.filterFns.arrIncludes;
        }

        return filterFns.filterFns.weakEquals;
      },
      getFilterFn: () => {
        var _table$options$filter, _table$options$filter2;

        return utils.isFunction(column.columnDef.filterFn) ? column.columnDef.filterFn : column.columnDef.filterFn === 'auto' ? column.getAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[column.columnDef.filterFn]) != null ? _table$options$filter : filterFns.filterFns[column.columnDef.filterFn];
      },
      getCanFilter: () => {
        var _column$columnDef$ena, _table$options$enable, _table$options$enable2;

        return ((_column$columnDef$ena = column.columnDef.enableColumnFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnFilters) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && !!column.accessorFn;
      },
      getCanGlobalFilter: () => {
        var _column$columnDef$ena2, _table$options$enable3, _table$options$enable4, _table$options$getCol;

        return ((_column$columnDef$ena2 = column.columnDef.enableGlobalFilter) != null ? _column$columnDef$ena2 : true) && ((_table$options$enable3 = table.options.enableGlobalFilter) != null ? _table$options$enable3 : true) && ((_table$options$enable4 = table.options.enableFilters) != null ? _table$options$enable4 : true) && ((_table$options$getCol = table.options.getColumnCanGlobalFilter == null ? void 0 : table.options.getColumnCanGlobalFilter(column)) != null ? _table$options$getCol : true) && !!column.accessorFn;
      },
      getIsFiltered: () => column.getFilterIndex() > -1,
      getFilterValue: () => {
        var _table$getState$colum, _table$getState$colum2;

        return (_table$getState$colum = table.getState().columnFilters) == null ? void 0 : (_table$getState$colum2 = _table$getState$colum.find(d => d.id === column.id)) == null ? void 0 : _table$getState$colum2.value;
      },
      getFilterIndex: () => {
        var _table$getState$colum3, _table$getState$colum4;

        return (_table$getState$colum3 = (_table$getState$colum4 = table.getState().columnFilters) == null ? void 0 : _table$getState$colum4.findIndex(d => d.id === column.id)) != null ? _table$getState$colum3 : -1;
      },
      setFilterValue: value => {
        table.setColumnFilters(old => {
          const filterFn = column.getFilterFn();
          const previousfilter = old == null ? void 0 : old.find(d => d.id === column.id);
          const newFilter = utils.functionalUpdate(value, previousfilter ? previousfilter.value : undefined); //

          if (shouldAutoRemoveFilter(filterFn, newFilter, column)) {
            var _old$filter;

            return (_old$filter = old == null ? void 0 : old.filter(d => d.id !== column.id)) != null ? _old$filter : [];
          }

          const newFilterObj = {
            id: column.id,
            value: newFilter
          };

          if (previousfilter) {
            var _old$map;

            return (_old$map = old == null ? void 0 : old.map(d => {
              if (d.id === column.id) {
                return newFilterObj;
              }

              return d;
            })) != null ? _old$map : [];
          }

          if (old != null && old.length) {
            return [...old, newFilterObj];
          }

          return [newFilterObj];
        });
      },
      _getFacetedRowModel: table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, column.id),
      getFacetedRowModel: () => {
        if (!column._getFacetedRowModel) {
          return table.getPreFilteredRowModel();
        }

        return column._getFacetedRowModel();
      },
      _getFacetedUniqueValues: table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, column.id),
      getFacetedUniqueValues: () => {
        if (!column._getFacetedUniqueValues) {
          return new Map();
        }

        return column._getFacetedUniqueValues();
      },
      _getFacetedMinMaxValues: table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, column.id),
      getFacetedMinMaxValues: () => {
        if (!column._getFacetedMinMaxValues) {
          return undefined;
        }

        return column._getFacetedMinMaxValues();
      } // () => [column.getFacetedRowModel()],
      // facetedRowModel => getRowModelMinMaxValues(facetedRowModel, column.id),

    };
  },
  createRow: (row, table) => {
    return {
      columnFilters: {},
      columnFiltersMeta: {}
    };
  },
  createTable: table => {
    return {
      getGlobalAutoFilterFn: () => {
        return filterFns.filterFns.includesString;
      },
      getGlobalFilterFn: () => {
        var _table$options$filter3, _table$options$filter4;

        const {
          globalFilterFn: globalFilterFn
        } = table.options;
        return utils.isFunction(globalFilterFn) ? globalFilterFn : globalFilterFn === 'auto' ? table.getGlobalAutoFilterFn() : (_table$options$filter3 = (_table$options$filter4 = table.options.filterFns) == null ? void 0 : _table$options$filter4[globalFilterFn]) != null ? _table$options$filter3 : filterFns.filterFns[globalFilterFn];
      },
      setColumnFilters: updater => {
        const leafColumns = table.getAllLeafColumns();

        const updateFn = old => {
          var _functionalUpdate;

          return (_functionalUpdate = utils.functionalUpdate(updater, old)) == null ? void 0 : _functionalUpdate.filter(filter => {
            const column = leafColumns.find(d => d.id === filter.id);

            if (column) {
              const filterFn = column.getFilterFn();

              if (shouldAutoRemoveFilter(filterFn, filter.value, column)) {
                return false;
              }
            }

            return true;
          });
        };

        table.options.onColumnFiltersChange == null ? void 0 : table.options.onColumnFiltersChange(updateFn);
      },
      setGlobalFilter: updater => {
        table.options.onGlobalFilterChange == null ? void 0 : table.options.onGlobalFilterChange(updater);
      },
      resetGlobalFilter: defaultState => {
        table.setGlobalFilter(defaultState ? undefined : table.initialState.globalFilter);
      },
      resetColumnFilters: defaultState => {
        var _table$initialState$c, _table$initialState;

        table.setColumnFilters(defaultState ? [] : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnFilters) != null ? _table$initialState$c : []);
      },
      getPreFilteredRowModel: () => table.getCoreRowModel(),
      getFilteredRowModel: () => {
        if (!table._getFilteredRowModel && table.options.getFilteredRowModel) {
          table._getFilteredRowModel = table.options.getFilteredRowModel(table);
        }

        if (table.options.manualFiltering || !table._getFilteredRowModel) {
          return table.getPreFilteredRowModel();
        }

        return table._getFilteredRowModel();
      },
      _getGlobalFacetedRowModel: table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, '__global__'),
      getGlobalFacetedRowModel: () => {
        if (table.options.manualFiltering || !table._getGlobalFacetedRowModel) {
          return table.getPreFilteredRowModel();
        }

        return table._getGlobalFacetedRowModel();
      },
      _getGlobalFacetedUniqueValues: table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, '__global__'),
      getGlobalFacetedUniqueValues: () => {
        if (!table._getGlobalFacetedUniqueValues) {
          return new Map();
        }

        return table._getGlobalFacetedUniqueValues();
      },
      _getGlobalFacetedMinMaxValues: table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, '__global__'),
      getGlobalFacetedMinMaxValues: () => {
        if (!table._getGlobalFacetedMinMaxValues) {
          return;
        }

        return table._getGlobalFacetedMinMaxValues();
      }
    };
  }
};
function shouldAutoRemoveFilter(filterFn, value, column) {
  return (filterFn && filterFn.autoRemove ? filterFn.autoRemove(value, column) : false) || typeof value === 'undefined' || typeof value === 'string' && !value;
}

exports.Filters = Filters;
exports.shouldAutoRemoveFilter = shouldAutoRemoveFilter;
//# sourceMappingURL=Filters.js.map
