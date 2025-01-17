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

// Is this type a tuple?
// If this type is a tuple, what indices are allowed?
///
function functionalUpdate(updater, input) {
  return typeof updater === 'function' ? updater(input) : updater;
}
function noop() {//
}
function makeStateUpdater(key, instance) {
  return updater => {
    instance.setState(old => {
      return { ...old,
        [key]: functionalUpdate(updater, old[key])
      };
    });
  };
}
function isFunction(d) {
  return d instanceof Function;
}
function flattenBy(arr, getChildren) {
  const flat = [];

  const recurse = subArr => {
    subArr.forEach(item => {
      flat.push(item);
      const children = getChildren(item);

      if (children != null && children.length) {
        recurse(children);
      }
    });
  };

  recurse(arr);
  return flat;
}
function memo(getDeps, fn, opts) {
  let deps = [];
  let result;
  return () => {
    let depTime;
    if (opts.key && opts.debug) depTime = Date.now();
    const newDeps = getDeps();
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);

    if (!depsChanged) {
      return result;
    }

    deps = newDeps;
    let resultTime;
    if (opts.key && opts.debug) resultTime = Date.now();
    result = fn(...newDeps);
    opts == null ? void 0 : opts.onChange == null ? void 0 : opts.onChange(result);

    if (opts.key && opts.debug) {
      if (opts != null && opts.debug()) {
        const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
        const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
        const resultFpsPercentage = resultEndTime / 16;

        const pad = (str, num) => {
          str = String(str);

          while (str.length < num) {
            str = ' ' + str;
          }

          return str;
        };

        console.info("%c\u23F1 " + pad(resultEndTime, 5) + " /" + pad(depEndTime, 5) + " ms", "\n            font-size: .6rem;\n            font-weight: bold;\n            color: hsl(" + Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120)) + "deg 100% 31%);", opts == null ? void 0 : opts.key);
      }
    }

    return result;
  };
}

exports.flattenBy = flattenBy;
exports.functionalUpdate = functionalUpdate;
exports.isFunction = isFunction;
exports.makeStateUpdater = makeStateUpdater;
exports.memo = memo;
exports.noop = noop;
//# sourceMappingURL=utils.js.map
