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
var utils = require('./utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Entry = utils.styled('div', {
  fontFamily: 'Menlo, monospace',
  fontSize: '0.7rem',
  lineHeight: '1.7',
  outline: 'none',
  wordBreak: 'break-word'
});
const Label = utils.styled('span', {
  cursor: 'pointer',
  color: 'white'
});
const Value = utils.styled('span', (props, theme) => ({
  color: theme.danger
}));
const SubEntries = utils.styled('div', {
  marginLeft: '.1rem',
  paddingLeft: '1rem',
  borderLeft: '2px solid rgba(0,0,0,.15)'
});
const Info = utils.styled('span', {
  color: 'grey',
  fontSize: '.7rem'
});
const Expander = _ref => {
  let {
    expanded,
    style = {},
    ...rest
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      display: 'inline-block',
      transition: 'all .1s ease',
      transform: "rotate(" + (expanded ? 90 : 0) + "deg) " + (style.transform || ''),
      ...style
    }
  }, "\u25B6");
};

const DefaultRenderer = _ref2 => {
  let {
    handleEntry,
    label,
    value,
    // path,
    subEntries,
    subEntryPages,
    type,
    // depth,
    expanded,
    toggle,
    pageSize,
    renderer
  } = _ref2;
  const [valueSnapshot, setValueSnapshot] = React__default["default"].useState(undefined);
  const [expandedPages, setExpandedPages] = React__default["default"].useState([]);

  const refreshValueSnapshot = () => {
    setValueSnapshot(value());
  };

  return /*#__PURE__*/React__default["default"].createElement(Entry, {
    key: label
  }, subEntryPages != null && subEntryPages.length ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Label, {
    onClick: () => toggle()
  }, /*#__PURE__*/React__default["default"].createElement(Expander, {
    expanded: expanded
  }), " ", label, ' ', /*#__PURE__*/React__default["default"].createElement(Info, null, String(type).toLowerCase() === 'iterable' ? '(Iterable) ' : '', subEntries.length, " ", subEntries.length > 1 ? "items" : "item")), expanded ? subEntryPages.length === 1 ? /*#__PURE__*/React__default["default"].createElement(SubEntries, null, subEntries.map(entry => handleEntry(entry))) : /*#__PURE__*/React__default["default"].createElement(SubEntries, null, subEntryPages.map((entries, index) => /*#__PURE__*/React__default["default"].createElement("div", {
    key: index
  }, /*#__PURE__*/React__default["default"].createElement(Entry, null, /*#__PURE__*/React__default["default"].createElement(Label, {
    onClick: () => setExpandedPages(old => old.includes(index) ? old.filter(d => d !== index) : [...old, index])
  }, /*#__PURE__*/React__default["default"].createElement(Expander, {
    expanded: expanded
  }), " [", index * pageSize, " ...", ' ', index * pageSize + pageSize - 1, "]"), expandedPages.includes(index) ? /*#__PURE__*/React__default["default"].createElement(SubEntries, null, entries.map(entry => handleEntry(entry))) : null)))) : null) : type === 'function' ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Explorer, {
    renderer: renderer,
    label: /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: refreshValueSnapshot
    }, /*#__PURE__*/React__default["default"].createElement(Label, null, label), " \uD83D\uDD04", ' '),
    value: valueSnapshot,
    defaultExpanded: {}
  })) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Label, null, label, ":"), ' ', /*#__PURE__*/React__default["default"].createElement(Value, null, JSON.stringify(value, Object.getOwnPropertyNames(Object(value))))));
};

function Explorer(_ref3) {
  let {
    value,
    defaultExpanded,
    renderer = DefaultRenderer,
    pageSize = 100,
    depth = 0,
    ...rest
  } = _ref3;
  const [expanded, setExpanded] = React__default["default"].useState(defaultExpanded);

  const toggle = set => {
    setExpanded(old => typeof set !== 'undefined' ? set : !old);
  };

  const path = [];
  let type = typeof value;
  let subEntries;
  const subEntryPages = [];

  const makeProperty = sub => {
    const newPath = path.concat(sub.label);
    const subDefaultExpanded = defaultExpanded === true ? {
      [sub.label]: true
    } : defaultExpanded == null ? void 0 : defaultExpanded[sub.label];
    return { ...sub,
      subPath: sub,
      path: newPath,
      depth: depth + 1,
      defaultExpanded: subDefaultExpanded
    };
  };

  if (Array.isArray(value)) {
    type = 'array';
    subEntries = value.map((d, i) => makeProperty({
      label: i,
      value: d
    }));
  } else if (value !== null && typeof value === 'object' && typeof value[Symbol.iterator] === 'function') {
    type = 'Iterable';
    subEntries = Array.from(value, (val, i) => makeProperty({
      label: i,
      value: val
    }));
  } else if (typeof value === 'function') {
    type = 'function';
  } else if (typeof value === 'object' && value !== null) {
    type = 'object'; // eslint-disable-next-line no-shadow

    subEntries = Object.entries(value).map(_ref4 => {
      let [label, value] = _ref4;
      return makeProperty({
        label,
        value
      });
    });
  }

  if (subEntries) {
    let i = 0;

    while (i < subEntries.length) {
      subEntryPages.push(subEntries.slice(i, i + pageSize));
      i = i + pageSize;
    }
  }

  return renderer({
    handleEntry: entry => /*#__PURE__*/React__default["default"].createElement(Explorer, _rollupPluginBabelHelpers["extends"]({
      key: entry.label,
      renderer: renderer
    }, rest, entry)),
    type,
    subEntries,
    subEntryPages,
    depth,
    value,
    path,
    expanded,
    toggle,
    pageSize,
    ...rest
  });
}

exports.Entry = Entry;
exports.Expander = Expander;
exports.Info = Info;
exports.Label = Label;
exports.SubEntries = SubEntries;
exports.Value = Value;
exports["default"] = Explorer;
//# sourceMappingURL=Explorer.js.map
