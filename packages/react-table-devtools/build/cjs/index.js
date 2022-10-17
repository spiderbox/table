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

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var useLocalStorage = require('./useLocalStorage.js');
var utils = require('./utils.js');
var styledComponents = require('./styledComponents.js');
var theme = require('./theme.js');
var Explorer = require('./Explorer.js');
var Logo = require('./Logo.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ReactTableDevtools(_ref) {
  let {
    initialIsOpen,
    table,
    panelProps = {},
    toggleButtonProps = {},
    containerElement: Container = 'footer'
  } = _ref;
  const rootRef = React__default["default"].useRef(null);
  const panelRef = React__default["default"].useRef(null);
  const [isOpen, setIsOpen] = useLocalStorage["default"]('reactTableDevtoolsOpen', initialIsOpen);
  const isMounted = utils.useIsMounted();
  const {
    style: panelStyle = {},
    ...otherPanelProps
  } = panelProps;
  const {
    style: toggleButtonStyle = {},
    onClick: onToggleClick,
    ...otherToggleButtonProps
  } = toggleButtonProps; // Do not render on the server

  if (!isMounted()) return null;
  return /*#__PURE__*/React__default["default"].createElement(Container, {
    ref: rootRef,
    className: "ReactTableDevtools"
  }, /*#__PURE__*/React__default["default"].createElement(theme.ThemeProvider, {
    theme: theme.defaultTheme
  }, !isOpen ? /*#__PURE__*/React__default["default"].createElement("button", _rollupPluginBabelHelpers["extends"]({
    type: "button"
  }, otherToggleButtonProps, {
    "aria-label": "Open React Table Devtools",
    onClick: e => {
      setIsOpen(true);
      onToggleClick && onToggleClick(e);
    },
    style: {
      background: 'none',
      border: 0,
      padding: 0,
      margin: '.5rem',
      display: 'inline-flex',
      fontSize: '1.5em',
      cursor: 'pointer',
      width: 'fit-content',
      ...toggleButtonStyle
    }
  }), /*#__PURE__*/React__default["default"].createElement(Logo["default"], {
    "aria-hidden": true
  })) : /*#__PURE__*/React__default["default"].createElement(ReactTableDevtoolsPanel, _rollupPluginBabelHelpers["extends"]({
    ref: panelRef
  }, otherPanelProps, {
    table: table,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    style: {
      maxHeight: '80vh',
      width: '100%',
      ...panelStyle
    }
  }))));
}
const ReactTableDevtoolsPanel = /*#__PURE__*/React__default["default"].forwardRef(function ReactTableDevtoolsPanel(props, ref) {
  const {
    table,
    isOpen = true,
    setIsOpen,
    ...panelProps
  } = props; // const [activeMatchId, setActiveRouteId] = useLocalStorage(
  //   'reactTableDevtoolsActiveRouteId',
  //   '',
  // )

  return /*#__PURE__*/React__default["default"].createElement(theme.ThemeProvider, {
    theme: theme.defaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(styledComponents.Panel, _rollupPluginBabelHelpers["extends"]({
    ref: ref,
    className: "ReactTableDevtoolsPanel"
  }, panelProps), /*#__PURE__*/React__default["default"].createElement("style", {
    dangerouslySetInnerHTML: {
      __html: "\n            .ReactTableDevtoolsPanel * {\n              scrollbar-color: " + theme.defaultTheme.backgroundAlt + " " + theme.defaultTheme.gray + ";\n            }\n\n            .ReactTableDevtoolsPanel *::-webkit-scrollbar, .ReactTableDevtoolsPanel scrollbar {\n              width: 1em;\n              height: 1em;\n            }\n\n            .ReactTableDevtoolsPanel *::-webkit-scrollbar-track, .ReactTableDevtoolsPanel scrollbar-track {\n              background: " + theme.defaultTheme.backgroundAlt + ";\n            }\n\n            .ReactTableDevtoolsPanel *::-webkit-scrollbar-thumb, .ReactTableDevtoolsPanel scrollbar-thumb {\n              background: " + theme.defaultTheme.gray + ";\n              border-radius: .5em;\n              border: 3px solid " + theme.defaultTheme.backgroundAlt + ";\n            }\n          "
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      flex: '1 1 500px',
      minHeight: '40%',
      maxHeight: '100%',
      overflow: 'auto',
      borderRight: "1px solid " + theme.defaultTheme.grayAlt,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      padding: '.5em',
      background: theme.defaultTheme.backgroundAlt,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React__default["default"].createElement(Logo["default"], {
    "aria-hidden": true,
    style: {
      marginRight: '.5em'
    },
    onClick: () => setIsOpen(false)
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      marginRight: 'auto',
      fontSize: 'clamp(.8rem, 2vw, 1.3rem)',
      fontWeight: 'bold'
    }
  }, "React Table", ' ', /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      fontWeight: 100
    }
  }, "Devtools")), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, isOpen ? /*#__PURE__*/React__default["default"].createElement(styledComponents.Button, {
    type: "button",
    "aria-label": "Close React Table Devtools",
    onClick: () => {
      setIsOpen(false);
    }
  }, "Close") : null)), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      overflowY: 'auto',
      flex: '1'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      flex: '1 1 auto',
      padding: '.5em'
    }
  }, /*#__PURE__*/React__default["default"].createElement(Explorer["default"], {
    label: "Instance",
    value: table,
    defaultExpanded: false
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      height: '.5rem'
    }
  }), /*#__PURE__*/React__default["default"].createElement(Explorer["default"], {
    label: "State",
    value: table.getState(),
    defaultExpanded: false
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      height: '.5rem'
    }
  }), /*#__PURE__*/React__default["default"].createElement(Explorer["default"], {
    label: "Columns",
    value: table.getAllColumns(),
    defaultExpanded: false
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      flex: '1 1 auto',
      padding: '.5em'
    }
  }, /*#__PURE__*/React__default["default"].createElement(Explorer["default"], {
    label: "Core Model",
    value: table.getCoreRowModel(),
    defaultExpanded: false
  }), /*#__PURE__*/React__default["default"].createElement(Explorer["default"], {
    label: "Filtered Model",
    value: table.getFilteredRowModel(),
    defaultExpanded: false
  }), /*#__PURE__*/React__default["default"].createElement(Explorer["default"], {
    label: "Sorted Model",
    value: table.getSortedRowModel(),
    defaultExpanded: false
  }), /*#__PURE__*/React__default["default"].createElement(Explorer["default"], {
    label: "Grouped Model",
    value: table.getGroupedRowModel(),
    defaultExpanded: false
  }), /*#__PURE__*/React__default["default"].createElement(Explorer["default"], {
    label: "Expanded Model",
    value: table.getExpandedRowModel(),
    defaultExpanded: false
  }))))));
});

exports.ReactTableDevtools = ReactTableDevtools;
exports.ReactTableDevtoolsPanel = ReactTableDevtoolsPanel;
//# sourceMappingURL=index.js.map
