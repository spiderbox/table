/**
 * match-sorter-utils
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MatchSorterUtils = {}));
})(this, (function (exports) { 'use strict';

  const characterMap = {
    À: 'A',
    Á: 'A',
    Â: 'A',
    Ã: 'A',
    Ä: 'A',
    Å: 'A',
    Ấ: 'A',
    Ắ: 'A',
    Ẳ: 'A',
    Ẵ: 'A',
    Ặ: 'A',
    Æ: 'AE',
    Ầ: 'A',
    Ằ: 'A',
    Ȃ: 'A',
    Ç: 'C',
    Ḉ: 'C',
    È: 'E',
    É: 'E',
    Ê: 'E',
    Ë: 'E',
    Ế: 'E',
    Ḗ: 'E',
    Ề: 'E',
    Ḕ: 'E',
    Ḝ: 'E',
    Ȇ: 'E',
    Ì: 'I',
    Í: 'I',
    Î: 'I',
    Ï: 'I',
    Ḯ: 'I',
    Ȋ: 'I',
    Ð: 'D',
    Ñ: 'N',
    Ò: 'O',
    Ó: 'O',
    Ô: 'O',
    Õ: 'O',
    Ö: 'O',
    Ø: 'O',
    Ố: 'O',
    Ṍ: 'O',
    Ṓ: 'O',
    Ȏ: 'O',
    Ù: 'U',
    Ú: 'U',
    Û: 'U',
    Ü: 'U',
    Ý: 'Y',
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    ấ: 'a',
    ắ: 'a',
    ẳ: 'a',
    ẵ: 'a',
    ặ: 'a',
    æ: 'ae',
    ầ: 'a',
    ằ: 'a',
    ȃ: 'a',
    ç: 'c',
    ḉ: 'c',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ế: 'e',
    ḗ: 'e',
    ề: 'e',
    ḕ: 'e',
    ḝ: 'e',
    ȇ: 'e',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    ḯ: 'i',
    ȋ: 'i',
    ð: 'd',
    ñ: 'n',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ø: 'o',
    ố: 'o',
    ṍ: 'o',
    ṓ: 'o',
    ȏ: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    ý: 'y',
    ÿ: 'y',
    Ā: 'A',
    ā: 'a',
    Ă: 'A',
    ă: 'a',
    Ą: 'A',
    ą: 'a',
    Ć: 'C',
    ć: 'c',
    Ĉ: 'C',
    ĉ: 'c',
    Ċ: 'C',
    ċ: 'c',
    Č: 'C',
    č: 'c',
    C̆: 'C',
    c̆: 'c',
    Ď: 'D',
    ď: 'd',
    Đ: 'D',
    đ: 'd',
    Ē: 'E',
    ē: 'e',
    Ĕ: 'E',
    ĕ: 'e',
    Ė: 'E',
    ė: 'e',
    Ę: 'E',
    ę: 'e',
    Ě: 'E',
    ě: 'e',
    Ĝ: 'G',
    Ǵ: 'G',
    ĝ: 'g',
    ǵ: 'g',
    Ğ: 'G',
    ğ: 'g',
    Ġ: 'G',
    ġ: 'g',
    Ģ: 'G',
    ģ: 'g',
    Ĥ: 'H',
    ĥ: 'h',
    Ħ: 'H',
    ħ: 'h',
    Ḫ: 'H',
    ḫ: 'h',
    Ĩ: 'I',
    ĩ: 'i',
    Ī: 'I',
    ī: 'i',
    Ĭ: 'I',
    ĭ: 'i',
    Į: 'I',
    į: 'i',
    İ: 'I',
    ı: 'i',
    Ĳ: 'IJ',
    ĳ: 'ij',
    Ĵ: 'J',
    ĵ: 'j',
    Ķ: 'K',
    ķ: 'k',
    Ḱ: 'K',
    ḱ: 'k',
    K̆: 'K',
    k̆: 'k',
    Ĺ: 'L',
    ĺ: 'l',
    Ļ: 'L',
    ļ: 'l',
    Ľ: 'L',
    ľ: 'l',
    Ŀ: 'L',
    ŀ: 'l',
    Ł: 'l',
    ł: 'l',
    Ḿ: 'M',
    ḿ: 'm',
    M̆: 'M',
    m̆: 'm',
    Ń: 'N',
    ń: 'n',
    Ņ: 'N',
    ņ: 'n',
    Ň: 'N',
    ň: 'n',
    ŉ: 'n',
    N̆: 'N',
    n̆: 'n',
    Ō: 'O',
    ō: 'o',
    Ŏ: 'O',
    ŏ: 'o',
    Ő: 'O',
    ő: 'o',
    Œ: 'OE',
    œ: 'oe',
    P̆: 'P',
    p̆: 'p',
    Ŕ: 'R',
    ŕ: 'r',
    Ŗ: 'R',
    ŗ: 'r',
    Ř: 'R',
    ř: 'r',
    R̆: 'R',
    r̆: 'r',
    Ȓ: 'R',
    ȓ: 'r',
    Ś: 'S',
    ś: 's',
    Ŝ: 'S',
    ŝ: 's',
    Ş: 'S',
    Ș: 'S',
    ș: 's',
    ş: 's',
    Š: 'S',
    š: 's',
    Ţ: 'T',
    ţ: 't',
    ț: 't',
    Ț: 'T',
    Ť: 'T',
    ť: 't',
    Ŧ: 'T',
    ŧ: 't',
    T̆: 'T',
    t̆: 't',
    Ũ: 'U',
    ũ: 'u',
    Ū: 'U',
    ū: 'u',
    Ŭ: 'U',
    ŭ: 'u',
    Ů: 'U',
    ů: 'u',
    Ű: 'U',
    ű: 'u',
    Ų: 'U',
    ų: 'u',
    Ȗ: 'U',
    ȗ: 'u',
    V̆: 'V',
    v̆: 'v',
    Ŵ: 'W',
    ŵ: 'w',
    Ẃ: 'W',
    ẃ: 'w',
    X̆: 'X',
    x̆: 'x',
    Ŷ: 'Y',
    ŷ: 'y',
    Ÿ: 'Y',
    Y̆: 'Y',
    y̆: 'y',
    Ź: 'Z',
    ź: 'z',
    Ż: 'Z',
    ż: 'z',
    Ž: 'Z',
    ž: 'z',
    ſ: 's',
    ƒ: 'f',
    Ơ: 'O',
    ơ: 'o',
    Ư: 'U',
    ư: 'u',
    Ǎ: 'A',
    ǎ: 'a',
    Ǐ: 'I',
    ǐ: 'i',
    Ǒ: 'O',
    ǒ: 'o',
    Ǔ: 'U',
    ǔ: 'u',
    Ǖ: 'U',
    ǖ: 'u',
    Ǘ: 'U',
    ǘ: 'u',
    Ǚ: 'U',
    ǚ: 'u',
    Ǜ: 'U',
    ǜ: 'u',
    Ứ: 'U',
    ứ: 'u',
    Ṹ: 'U',
    ṹ: 'u',
    Ǻ: 'A',
    ǻ: 'a',
    Ǽ: 'AE',
    ǽ: 'ae',
    Ǿ: 'O',
    ǿ: 'o',
    Þ: 'TH',
    þ: 'th',
    Ṕ: 'P',
    ṕ: 'p',
    Ṥ: 'S',
    ṥ: 's',
    X́: 'X',
    x́: 'x',
    Ѓ: 'Г',
    ѓ: 'г',
    Ќ: 'К',
    ќ: 'к',
    A̋: 'A',
    a̋: 'a',
    E̋: 'E',
    e̋: 'e',
    I̋: 'I',
    i̋: 'i',
    Ǹ: 'N',
    ǹ: 'n',
    Ồ: 'O',
    ồ: 'o',
    Ṑ: 'O',
    ṑ: 'o',
    Ừ: 'U',
    ừ: 'u',
    Ẁ: 'W',
    ẁ: 'w',
    Ỳ: 'Y',
    ỳ: 'y',
    Ȁ: 'A',
    ȁ: 'a',
    Ȅ: 'E',
    ȅ: 'e',
    Ȉ: 'I',
    ȉ: 'i',
    Ȍ: 'O',
    ȍ: 'o',
    Ȑ: 'R',
    ȑ: 'r',
    Ȕ: 'U',
    ȕ: 'u',
    B̌: 'B',
    b̌: 'b',
    Č̣: 'C',
    č̣: 'c',
    Ê̌: 'E',
    ê̌: 'e',
    F̌: 'F',
    f̌: 'f',
    Ǧ: 'G',
    ǧ: 'g',
    Ȟ: 'H',
    ȟ: 'h',
    J̌: 'J',
    ǰ: 'j',
    Ǩ: 'K',
    ǩ: 'k',
    M̌: 'M',
    m̌: 'm',
    P̌: 'P',
    p̌: 'p',
    Q̌: 'Q',
    q̌: 'q',
    Ř̩: 'R',
    ř̩: 'r',
    Ṧ: 'S',
    ṧ: 's',
    V̌: 'V',
    v̌: 'v',
    W̌: 'W',
    w̌: 'w',
    X̌: 'X',
    x̌: 'x',
    Y̌: 'Y',
    y̌: 'y',
    A̧: 'A',
    a̧: 'a',
    B̧: 'B',
    b̧: 'b',
    Ḑ: 'D',
    ḑ: 'd',
    Ȩ: 'E',
    ȩ: 'e',
    Ɛ̧: 'E',
    ɛ̧: 'e',
    Ḩ: 'H',
    ḩ: 'h',
    I̧: 'I',
    i̧: 'i',
    Ɨ̧: 'I',
    ɨ̧: 'i',
    M̧: 'M',
    m̧: 'm',
    O̧: 'O',
    o̧: 'o',
    Q̧: 'Q',
    q̧: 'q',
    U̧: 'U',
    u̧: 'u',
    X̧: 'X',
    x̧: 'x',
    Z̧: 'Z',
    z̧: 'z'
  };
  const chars = Object.keys(characterMap).join('|');
  const allAccents = new RegExp(chars, 'g');
  function removeAccents(str) {
    return str.replace(allAccents, match => {
      return characterMap[match];
    });
  }

  /**
   * @name match-sorter
   * @license MIT license.
   * @copyright (c) 2099 Kent C. Dodds
   * @author Kent C. Dodds <me@kentcdodds.com> (https://kentcdodds.com)
   */
  const rankings = {
    CASE_SENSITIVE_EQUAL: 7,
    EQUAL: 6,
    STARTS_WITH: 5,
    WORD_STARTS_WITH: 4,
    CONTAINS: 3,
    ACRONYM: 2,
    MATCHES: 1,
    NO_MATCH: 0
  };

  /**
   * Gets the highest ranking for value for the given item based on its values for the given keys
   * @param {*} item - the item to rank
   * @param {Array} keys - the keys to get values from the item for the ranking
   * @param {String} value - the value to rank against
   * @param {Object} options - options to control the ranking
   * @return {{rank: Number, accessorIndex: Number, accessorThreshold: Number}} - the highest ranking
   */
  function rankItem(item, value, options) {
    var _options$threshold;

    options = options || {};
    options.threshold = (_options$threshold = options.threshold) != null ? _options$threshold : rankings.MATCHES;

    if (!options.accessors) {
      // if keys is not specified, then we assume the item given is ready to be matched
      const rank = getMatchRanking(item, value, options);
      return {
        // ends up being duplicate of 'item' in matches but consistent
        rankedValue: item,
        rank,
        accessorIndex: -1,
        accessorThreshold: options.threshold,
        passed: rank >= options.threshold
      };
    }

    const valuesToRank = getAllValuesToRank(item, options.accessors);
    const rankingInfo = {
      rankedValue: item,
      rank: rankings.NO_MATCH,
      accessorIndex: -1,
      accessorThreshold: options.threshold,
      passed: false
    };

    for (let i = 0; i < valuesToRank.length; i++) {
      const rankValue = valuesToRank[i];
      let newRank = getMatchRanking(rankValue.itemValue, value, options);
      const {
        minRanking,
        maxRanking,
        threshold = options.threshold
      } = rankValue.attributes;

      if (newRank < minRanking && newRank >= rankings.MATCHES) {
        newRank = minRanking;
      } else if (newRank > maxRanking) {
        newRank = maxRanking;
      }

      newRank = Math.min(newRank, maxRanking);

      if (newRank >= threshold && newRank > rankingInfo.rank) {
        rankingInfo.rank = newRank;
        rankingInfo.passed = true;
        rankingInfo.accessorIndex = i;
        rankingInfo.accessorThreshold = threshold;
        rankingInfo.rankedValue = rankValue.itemValue;
      }
    }

    return rankingInfo;
  }
  /**
   * Gives a rankings score based on how well the two strings match.
   * @param {String} testString - the string to test against
   * @param {String} stringToRank - the string to rank
   * @param {Object} options - options for the match (like keepDiacritics for comparison)
   * @returns {Number} the ranking for how well stringToRank matches testString
   */

  function getMatchRanking(testString, stringToRank, options) {
    testString = prepareValueForComparison(testString, options);
    stringToRank = prepareValueForComparison(stringToRank, options); // too long

    if (stringToRank.length > testString.length) {
      return rankings.NO_MATCH;
    } // case sensitive equals


    if (testString === stringToRank) {
      return rankings.CASE_SENSITIVE_EQUAL;
    } // Lower casing before further comparison


    testString = testString.toLowerCase();
    stringToRank = stringToRank.toLowerCase(); // case insensitive equals

    if (testString === stringToRank) {
      return rankings.EQUAL;
    } // starts with


    if (testString.startsWith(stringToRank)) {
      return rankings.STARTS_WITH;
    } // word starts with


    if (testString.includes(" " + stringToRank)) {
      return rankings.WORD_STARTS_WITH;
    } // contains


    if (testString.includes(stringToRank)) {
      return rankings.CONTAINS;
    } else if (stringToRank.length === 1) {
      // If the only character in the given stringToRank
      //   isn't even contained in the testString, then
      //   it's definitely not a match.
      return rankings.NO_MATCH;
    } // acronym


    if (getAcronym(testString).includes(stringToRank)) {
      return rankings.ACRONYM;
    } // will return a number between rankings.MATCHES and
    // rankings.MATCHES + 1 depending  on how close of a match it is.


    return getClosenessRanking(testString, stringToRank);
  }
  /**
   * Generates an acronym for a string.
   *
   * @param {String} string the string for which to produce the acronym
   * @returns {String} the acronym
   */


  function getAcronym(string) {
    let acronym = '';
    const wordsInString = string.split(' ');
    wordsInString.forEach(wordInString => {
      const splitByHyphenWords = wordInString.split('-');
      splitByHyphenWords.forEach(splitByHyphenWord => {
        acronym += splitByHyphenWord.substr(0, 1);
      });
    });
    return acronym;
  }
  /**
   * Returns a score based on how spread apart the
   * characters from the stringToRank are within the testString.
   * A number close to rankings.MATCHES represents a loose match. A number close
   * to rankings.MATCHES + 1 represents a tighter match.
   * @param {String} testString - the string to test against
   * @param {String} stringToRank - the string to rank
   * @returns {Number} the number between rankings.MATCHES and
   * rankings.MATCHES + 1 for how well stringToRank matches testString
   */


  function getClosenessRanking(testString, stringToRank) {
    let matchingInOrderCharCount = 0;
    let charNumber = 0;

    function findMatchingCharacter(matchChar, string, index) {
      for (let j = index, J = string.length; j < J; j++) {
        const stringChar = string[j];

        if (stringChar === matchChar) {
          matchingInOrderCharCount += 1;
          return j + 1;
        }
      }

      return -1;
    }

    function getRanking(spread) {
      const spreadPercentage = 1 / spread;
      const inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
      const ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
      return ranking;
    }

    const firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);

    if (firstIndex < 0) {
      return rankings.NO_MATCH;
    }

    charNumber = firstIndex;

    for (let i = 1, I = stringToRank.length; i < I; i++) {
      const matchChar = stringToRank[i];
      charNumber = findMatchingCharacter(matchChar, testString, charNumber);
      const found = charNumber > -1;

      if (!found) {
        return rankings.NO_MATCH;
      }
    }

    const spread = charNumber - firstIndex;
    return getRanking(spread);
  }
  /**
   * Sorts items that have a rank, index, and accessorIndex
   * @param {Object} a - the first item to sort
   * @param {Object} b - the second item to sort
   * @return {Number} -1 if a should come first, 1 if b should come first, 0 if equal
   */


  function compareItems(a, b) {
    return a.rank === b.rank ? 0 : a.rank > b.rank ? -1 : 1;
  }
  /**
   * Prepares value for comparison by stringifying it, removing diacritics (if specified)
   * @param {String} value - the value to clean
   * @param {Object} options - {keepDiacritics: whether to remove diacritics}
   * @return {String} the prepared value
   */

  function prepareValueForComparison(value, _ref) {
    let {
      keepDiacritics
    } = _ref;
    // value might not actually be a string at this point (we don't get to choose)
    // so part of preparing the value for comparison is ensure that it is a string
    value = "" + value; // toString

    if (!keepDiacritics) {
      value = removeAccents(value);
    }

    return value;
  }
  /**
   * Gets value for key in item at arbitrarily nested keypath
   * @param {Object} item - the item
   * @param {Object|Function} key - the potentially nested keypath or property callback
   * @return {Array} - an array containing the value(s) at the nested keypath
   */


  function getItemValues(item, accessor) {
    let accessorFn = accessor;

    if (typeof accessor === 'object') {
      accessorFn = accessor.accessor;
    }

    const value = accessorFn(item); // because `value` can also be undefined

    if (value == null) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [String(value)];
  }
  /**
   * Gets all the values for the given keys in the given item and returns an array of those values
   * @param item - the item from which the values will be retrieved
   * @param keys - the keys to use to retrieve the values
   * @return objects with {itemValue, attributes}
   */


  function getAllValuesToRank(item, accessors) {
    const allValues = [];

    for (let j = 0, J = accessors.length; j < J; j++) {
      const accessor = accessors[j];
      const attributes = getAccessorAttributes(accessor);
      const itemValues = getItemValues(item, accessor);

      for (let i = 0, I = itemValues.length; i < I; i++) {
        allValues.push({
          itemValue: itemValues[i],
          attributes
        });
      }
    }

    return allValues;
  }

  const defaultKeyAttributes = {
    maxRanking: Infinity,
    minRanking: -Infinity
  };
  /**
   * Gets all the attributes for the given accessor
   * @param accessor - the accessor from which the attributes will be retrieved
   * @return object containing the accessor's attributes
   */

  function getAccessorAttributes(accessor) {
    if (typeof accessor === 'function') {
      return defaultKeyAttributes;
    }

    return { ...defaultKeyAttributes,
      ...accessor
    };
  }

  exports.compareItems = compareItems;
  exports.rankItem = rankItem;
  exports.rankings = rankings;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.development.js.map
