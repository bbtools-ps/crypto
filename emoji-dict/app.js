"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var promises_1 = require("fs/promises");
var constants_1 = require("../src/constants");
/**NodeJS app for generating new dictionary
 * Steps:
 * 1. Read "full-emoji-list.json" file.
 * 2. Generate two arrays: emojisHTML and emojisUTF.
 * 3. Randomize array and get random items amount based on the "alphabet" length.
 * 4. Generate new object that looks like this:
 * "A":[{"code":"&#x$1EC;","emoji":"🇬🇮"},{"code":"&#x$3BC;","emoji":"🎼"},{"code":"&#x$944;","emoji":"🥄"},{"code":"&#x$4E1;","emoji":"📡"},{"code":"&#x$332;","emoji":"🌲"}]
 * "🇬🇮":"A","🎼":"A","🥄":"A","📡":"A","🌲":"A"
 */
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var getRandomItems, chunkMaxLength, response, newData, emojis, randomEmojis, emojisAlphabet, alphabetEmojisArr, emojisAlphabetArr, newObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getRandomItems = function (arr, amount) {
                        var _a;
                        var randomList = __spreadArray([], arr, true);
                        for (var i = randomList.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            _a = [randomList[j], randomList[i]], randomList[i] = _a[0], randomList[j] = _a[1];
                        }
                        return randomList.splice(0, amount);
                    };
                    chunkMaxLength = function (arr, chunkSize, maxLength) {
                        return Array.from({ length: maxLength }, function () { return arr.splice(0, chunkSize); });
                    };
                    return [4 /*yield*/, (0, promises_1.readFile)("./full-emoji-list.json", "utf8")];
                case 1:
                    response = _a.sent();
                    newData = Object.entries(JSON.parse(response)).flat(99);
                    emojis = newData
                        .filter(function (item) {
                        return item.code && item.code.split(" ").length === 1 && item.emoji;
                    })
                        .map(function (_a) {
                        var code = _a.code, emoji = _a.emoji;
                        var firstCodeItem = code.split(" ")[0];
                        return {
                            code: "&#x".concat(firstCodeItem.replace("U+", ""), ";"),
                            emoji: emoji
                        };
                    });
                    randomEmojis = getRandomItems(emojis, constants_1.ExtendedAlphabet.length * constants_1.LetterCombinationsAmount);
                    emojisAlphabet = chunkMaxLength(__spreadArray([], randomEmojis, true), constants_1.LetterCombinationsAmount, constants_1.ExtendedAlphabet.length)
                        .filter(function (item) { return item.length; })
                        .map(function (item, index) {
                        return item.map(function (item) { return (__assign(__assign({}, item), { value: constants_1.ExtendedAlphabet[index] })); });
                    });
                    // Check if both arrays (emojis + alphabet) have the same length before continuing
                    if (constants_1.ExtendedAlphabet.length !== emojisAlphabet.length) {
                        console.log("Array lengths (emojis + alphabet) must be the same!");
                        return [2 /*return*/];
                    }
                    alphabetEmojisArr = Array.from(constants_1.ExtendedAlphabet).map(function (item, index) {
                        var _a;
                        return (_a = {},
                            _a[item] = __spreadArray([], __spreadArray([], randomEmojis, true).splice(index * constants_1.LetterCombinationsAmount, constants_1.LetterCombinationsAmount), true),
                            _a);
                    });
                    emojisAlphabetArr = emojisAlphabet
                        .map(function (item) { return item.map(function (_a) {
                        var _b;
                        var emoji = _a.emoji, value = _a.value;
                        return (_b = {}, _b[emoji] = value, _b);
                    }); })
                        .flat(99);
                    newObj = Object.assign.apply(Object, __spreadArray(__spreadArray([{}], alphabetEmojisArr, false), emojisAlphabetArr, false));
                    return [4 /*yield*/, (0, promises_1.writeFile)("./dict.json", JSON.stringify(newObj))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
