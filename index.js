'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _xml2js = require("xml2js");

var _svgpath = _interopRequireDefault(require("svgpath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _default(xml) {
  const glyphs = [];
  new _xml2js.Parser({
    async: false
  }).parseString(xml, (err, root) => {
    if (err) {
      throw err;
    } // Read http://www.w3.org/TR/SVG/fonts.html for SVG font spec


    var _iterator = _createForOfIteratorHelper(root.svg.defs[0].font),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        let font = _step.value;
        const face = font['font-face'][0];
        const em = +face.$['units-per-em'] || 1000; // size of the em square

        const ascent = +face.$['ascent']; // unaccented height of font above x-axis

        const hox = +font.$['horiz-origin-x'] || 0; // x origin of font coordinates

        const hoy = +font.$['horiz-origin-y'] || 0; // y origin of font coordinates

        const hdx = +font.$['horiz-adv-x'] || em; // width of glyph

        const vdy = +font.$['vert-adv-y'] || em; // height of glyph

        var _iterator2 = _createForOfIteratorHelper(font.glyph),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            let g = _step2.value;

            if (!g.$.d || !g.$.unicode) {
              continue;
            } // skip empty glyph without path data


            const path = new _svgpath.default(g.$.d).translate(-hox, -hoy) // move to origin (0, 0) in font coordinates
            .translate(0, -ascent) // move below x-axis
            .scale(1, -1) // invert y-axis (font coordinates -> initial coordinates)
            .round(1).toString();
            glyphs.push({
              font_id: font.$.id,
              font_family: face.$['font-family'],
              name: g.$['glyph-name'],
              unicode: g.$.unicode,
              unicode_hex: g.$.unicode.charCodeAt(0).toString(16),
              path: path,
              width: +g.$['horiz-adv-x'] || hdx,
              height: +g.$['vert-adv-y'] || vdy
            });
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  return glyphs;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy5qcyJdLCJuYW1lcyI6WyJ4bWwiLCJnbHlwaHMiLCJYTUxQYXJzZXIiLCJhc3luYyIsInBhcnNlU3RyaW5nIiwiZXJyIiwicm9vdCIsInN2ZyIsImRlZnMiLCJmb250IiwiZmFjZSIsImVtIiwiJCIsImFzY2VudCIsImhveCIsImhveSIsImhkeCIsInZkeSIsImdseXBoIiwiZyIsImQiLCJ1bmljb2RlIiwicGF0aCIsIlNWR1BhdGgiLCJ0cmFuc2xhdGUiLCJzY2FsZSIsInJvdW5kIiwidG9TdHJpbmciLCJwdXNoIiwiZm9udF9pZCIsImlkIiwiZm9udF9mYW1pbHkiLCJuYW1lIiwidW5pY29kZV9oZXgiLCJjaGFyQ29kZUF0Iiwid2lkdGgiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7QUFHZSxrQkFBU0EsR0FBVCxFQUFjO0FBQzNCLFFBQU1DLE1BQU0sR0FBRyxFQUFmO0FBRUMsTUFBSUMsY0FBSixDQUFjO0FBQUNDLElBQUFBLEtBQUssRUFBRTtBQUFSLEdBQWQsQ0FBRCxDQUFnQ0MsV0FBaEMsQ0FBNENKLEdBQTVDLEVBQWlELENBQUNLLEdBQUQsRUFBTUMsSUFBTixLQUFlO0FBQzlELFFBQUlELEdBQUosRUFBUztBQUFFLFlBQU1BLEdBQU47QUFBWSxLQUR1QyxDQUc5RDs7O0FBSDhELCtDQUk3Q0MsSUFBSSxDQUFDQyxHQUFMLENBQVNDLElBQVQsQ0FBYyxDQUFkLEVBQWlCQyxJQUo0QjtBQUFBOztBQUFBO0FBSTlELDBEQUF3QztBQUFBLFlBQS9CQSxJQUErQjtBQUN0QyxjQUFNQyxJQUFJLEdBQUdELElBQUksQ0FBQyxXQUFELENBQUosQ0FBa0IsQ0FBbEIsQ0FBYjtBQUNBLGNBQU1FLEVBQUUsR0FBRyxDQUFDRCxJQUFJLENBQUNFLENBQUwsQ0FBTyxjQUFQLENBQUQsSUFBMkIsSUFBdEMsQ0FGc0MsQ0FFTTs7QUFDNUMsY0FBTUMsTUFBTSxHQUFHLENBQUNILElBQUksQ0FBQ0UsQ0FBTCxDQUFPLFFBQVAsQ0FBaEIsQ0FIc0MsQ0FHTTs7QUFDNUMsY0FBTUUsR0FBRyxHQUFHLENBQUNMLElBQUksQ0FBQ0csQ0FBTCxDQUFPLGdCQUFQLENBQUQsSUFBNkIsQ0FBekMsQ0FKc0MsQ0FJTTs7QUFDNUMsY0FBTUcsR0FBRyxHQUFHLENBQUNOLElBQUksQ0FBQ0csQ0FBTCxDQUFPLGdCQUFQLENBQUQsSUFBNkIsQ0FBekMsQ0FMc0MsQ0FLTTs7QUFDNUMsY0FBTUksR0FBRyxHQUFHLENBQUNQLElBQUksQ0FBQ0csQ0FBTCxDQUFPLGFBQVAsQ0FBRCxJQUEwQkQsRUFBdEMsQ0FOc0MsQ0FNTTs7QUFDNUMsY0FBTU0sR0FBRyxHQUFHLENBQUNSLElBQUksQ0FBQ0csQ0FBTCxDQUFPLFlBQVAsQ0FBRCxJQUF5QkQsRUFBckMsQ0FQc0MsQ0FPTTs7QUFQTixvREFTeEJGLElBQUksQ0FBQ1MsS0FUbUI7QUFBQTs7QUFBQTtBQVN0QyxpRUFBMEI7QUFBQSxnQkFBakJDLENBQWlCOztBQUN4QixnQkFBSSxDQUFDQSxDQUFDLENBQUNQLENBQUYsQ0FBSVEsQ0FBTCxJQUFVLENBQUNELENBQUMsQ0FBQ1AsQ0FBRixDQUFJUyxPQUFuQixFQUE0QjtBQUFFO0FBQVcsYUFEakIsQ0FDa0I7OztBQUUxQyxrQkFBTUMsSUFBSSxHQUFJLElBQUlDLGdCQUFKLENBQVlKLENBQUMsQ0FBQ1AsQ0FBRixDQUFJUSxDQUFoQixDQUFELENBQ1ZJLFNBRFUsQ0FDQSxDQUFDVixHQURELEVBQ00sQ0FBQ0MsR0FEUCxFQUNhO0FBRGIsYUFFVlMsU0FGVSxDQUVBLENBRkEsRUFFRyxDQUFDWCxNQUZKLEVBRWE7QUFGYixhQUdWWSxLQUhVLENBR0osQ0FISSxFQUdELENBQUMsQ0FIQSxFQUdhO0FBSGIsYUFJVkMsS0FKVSxDQUlKLENBSkksRUFLVkMsUUFMVSxFQUFiO0FBT0ExQixZQUFBQSxNQUFNLENBQUMyQixJQUFQLENBQVk7QUFDVkMsY0FBQUEsT0FBTyxFQUFFcEIsSUFBSSxDQUFDRyxDQUFMLENBQU9rQixFQUROO0FBRVZDLGNBQUFBLFdBQVcsRUFBRXJCLElBQUksQ0FBQ0UsQ0FBTCxDQUFPLGFBQVAsQ0FGSDtBQUdWb0IsY0FBQUEsSUFBSSxFQUFFYixDQUFDLENBQUNQLENBQUYsQ0FBSSxZQUFKLENBSEk7QUFJVlMsY0FBQUEsT0FBTyxFQUFFRixDQUFDLENBQUNQLENBQUYsQ0FBSVMsT0FKSDtBQUtWWSxjQUFBQSxXQUFXLEVBQUVkLENBQUMsQ0FBQ1AsQ0FBRixDQUFJUyxPQUFKLENBQVlhLFVBQVosQ0FBdUIsQ0FBdkIsRUFBMEJQLFFBQTFCLENBQW1DLEVBQW5DLENBTEg7QUFNVkwsY0FBQUEsSUFBSSxFQUFFQSxJQU5JO0FBT1ZhLGNBQUFBLEtBQUssRUFBRSxDQUFDaEIsQ0FBQyxDQUFDUCxDQUFGLENBQUksYUFBSixDQUFELElBQXVCSSxHQVBwQjtBQVFWb0IsY0FBQUEsTUFBTSxFQUFFLENBQUNqQixDQUFDLENBQUNQLENBQUYsQ0FBSSxZQUFKLENBQUQsSUFBc0JLO0FBUnBCLGFBQVo7QUFVRDtBQTdCcUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQThCdkM7QUFsQzZEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtQy9ELEdBbkNEO0FBcUNBLFNBQU9oQixNQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7UGFyc2VyIGFzIFhNTFBhcnNlcn0gZnJvbSAneG1sMmpzJztcbmltcG9ydCBTVkdQYXRoIGZyb20gJ3N2Z3BhdGgnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHhtbCkge1xuICBjb25zdCBnbHlwaHMgPSBbXTtcblxuICAobmV3IFhNTFBhcnNlcih7YXN5bmM6IGZhbHNlfSkpLnBhcnNlU3RyaW5nKHhtbCwgKGVyciwgcm9vdCkgPT4ge1xuICAgIGlmIChlcnIpIHsgdGhyb3cgZXJyOyB9XG5cbiAgICAvLyBSZWFkIGh0dHA6Ly93d3cudzMub3JnL1RSL1NWRy9mb250cy5odG1sIGZvciBTVkcgZm9udCBzcGVjXG4gICAgZm9yIChsZXQgZm9udCBvZiByb290LnN2Zy5kZWZzWzBdLmZvbnQpIHtcbiAgICAgIGNvbnN0IGZhY2UgPSBmb250Wydmb250LWZhY2UnXVswXTtcbiAgICAgIGNvbnN0IGVtID0gK2ZhY2UuJFsndW5pdHMtcGVyLWVtJ10gfHwgMTAwMDsgLy8gc2l6ZSBvZiB0aGUgZW0gc3F1YXJlXG4gICAgICBjb25zdCBhc2NlbnQgPSArZmFjZS4kWydhc2NlbnQnXTsgICAgICAgICAgIC8vIHVuYWNjZW50ZWQgaGVpZ2h0IG9mIGZvbnQgYWJvdmUgeC1heGlzXG4gICAgICBjb25zdCBob3ggPSArZm9udC4kWydob3Jpei1vcmlnaW4teCddIHx8IDA7IC8vIHggb3JpZ2luIG9mIGZvbnQgY29vcmRpbmF0ZXNcbiAgICAgIGNvbnN0IGhveSA9ICtmb250LiRbJ2hvcml6LW9yaWdpbi15J10gfHwgMDsgLy8geSBvcmlnaW4gb2YgZm9udCBjb29yZGluYXRlc1xuICAgICAgY29uc3QgaGR4ID0gK2ZvbnQuJFsnaG9yaXotYWR2LXgnXSB8fCBlbTsgICAvLyB3aWR0aCBvZiBnbHlwaFxuICAgICAgY29uc3QgdmR5ID0gK2ZvbnQuJFsndmVydC1hZHYteSddIHx8IGVtOyAgICAvLyBoZWlnaHQgb2YgZ2x5cGhcblxuICAgICAgZm9yIChsZXQgZyBvZiBmb250LmdseXBoKSB7XG4gICAgICAgIGlmICghZy4kLmQgfHwgIWcuJC51bmljb2RlKSB7IGNvbnRpbnVlOyB9IC8vIHNraXAgZW1wdHkgZ2x5cGggd2l0aG91dCBwYXRoIGRhdGFcblxuICAgICAgICBjb25zdCBwYXRoID0gKG5ldyBTVkdQYXRoKGcuJC5kKSlcbiAgICAgICAgICAudHJhbnNsYXRlKC1ob3gsIC1ob3kpICAvLyBtb3ZlIHRvIG9yaWdpbiAoMCwgMCkgaW4gZm9udCBjb29yZGluYXRlc1xuICAgICAgICAgIC50cmFuc2xhdGUoMCwgLWFzY2VudCkgIC8vIG1vdmUgYmVsb3cgeC1heGlzXG4gICAgICAgICAgLnNjYWxlKDEsIC0xKSAgICAgICAgICAgLy8gaW52ZXJ0IHktYXhpcyAoZm9udCBjb29yZGluYXRlcyAtPiBpbml0aWFsIGNvb3JkaW5hdGVzKVxuICAgICAgICAgIC5yb3VuZCgxKVxuICAgICAgICAgIC50b1N0cmluZygpO1xuXG4gICAgICAgIGdseXBocy5wdXNoKHtcbiAgICAgICAgICBmb250X2lkOiBmb250LiQuaWQsXG4gICAgICAgICAgZm9udF9mYW1pbHk6IGZhY2UuJFsnZm9udC1mYW1pbHknXSxcbiAgICAgICAgICBuYW1lOiBnLiRbJ2dseXBoLW5hbWUnXSxcbiAgICAgICAgICB1bmljb2RlOiBnLiQudW5pY29kZSxcbiAgICAgICAgICB1bmljb2RlX2hleDogZy4kLnVuaWNvZGUuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNiksXG4gICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICB3aWR0aDogK2cuJFsnaG9yaXotYWR2LXgnXSB8fCBoZHgsXG4gICAgICAgICAgaGVpZ2h0OiArZy4kWyd2ZXJ0LWFkdi15J10gfHwgdmR5LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBnbHlwaHM7XG59XG4iXX0=
