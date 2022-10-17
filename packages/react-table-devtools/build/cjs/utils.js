/**
 * react-table-devtools
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

var React = require('react');
var theme = require('./theme.js');
var useMediaQuery = require('./useMediaQuery.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const isServer = typeof window === 'undefined';
function styled(type, newStyles, queries) {
  if (queries === void 0) {
    queries = {};
  }

  return /*#__PURE__*/React__default["default"].forwardRef((_ref, ref) => {
    let {
      style,
      ...rest
    } = _ref;
    const theme$1 = theme.useTheme();
    const mediaStyles = Object.entries(queries).reduce((current, _ref2) => {
      let [key, value] = _ref2;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useMediaQuery["default"](key) ? { ...current,
        ...(typeof value === 'function' ? value(rest, theme$1) : value)
      } : current;
    }, {});
    return /*#__PURE__*/React__default["default"].createElement(type, { ...rest,
      style: { ...(typeof newStyles === 'function' ? newStyles(rest, theme$1) : newStyles),
        ...style,
        ...mediaStyles
      },
      ref
    });
  });
}
function useIsMounted() {
  const mountedRef = React__default["default"].useRef(false);
  const isMounted = React__default["default"].useCallback(() => mountedRef.current, []);
  React__default["default"][isServer ? 'useEffect' : 'useLayoutEffect'](() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return isMounted;
}

exports.isServer = isServer;
exports.styled = styled;
exports.useIsMounted = useIsMounted;
//# sourceMappingURL=utils.js.map
