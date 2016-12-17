
//convert hex string e.g.'#DA5252' to rgb array e.g.([218, 82, 82]) 0-255
var hexToRgb = function (hex) {
  var hexChars = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15};
  var result = [];
  //remove #
  hex = hex.toUpperCase().match(/.{1,2}/g);
  // split
  var r = hex[0].split(''), g = hex[1].split(''), b = hex[2].split('');
  
  result[0] = Math.round(hexChars[r[0]] * 16 + hexChars[r[1]]);
  result[1] = Math.round(hexChars[g[0]] * 16 + hexChars[g[1]]);
  result[2] = Math.round(hexChars[b[0]] * 16 + hexChars[b[1]]);
  return result;
};

//convert rgb array e.g.([218, 82, 82]) to hex e.g.'#DA5252'
var rgbToHex = function (array) {
  var hexChars = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'};
  var result = '';
  for (var i = 0; i < array.length; i++) {
    var d1 = parseInt(array[i] / 16);
    result += hexChars[d1];
    var d2 = array[i] - (d1 * 16);
    result += hexChars[d2];
  }
  return result;
};

// convert rgb array to hsl array. hsl values are between 0 - 1. h * 360, s * 100, l * 100
// some of this work if from/refactored from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
// more info here https://en.wikipedia.org/wiki/HSL_and_HSV
var rgbToHsl = function(array) {
  var r = array[0] / 255, g = array[1] / 255, b = array[2] / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }
  //outputs values between 0 - 1;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

// hsl to rgb helper function
var hueToRgb = function(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
};

// converts hsl array to rgb array
var hslToRgb = function(array) {
  var r, g, b;
  var h = array[0] / 360, s = array[1] / 100, l = array[2] / 100;
  if (s === 0) {
    r = g = b = 1;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// helper HSL array to Hex string
var hslToHex = function (hsl) {
  return rgbToHex(hslToRgb(hsl));
};

// helper HEX string to HSL array
var hexToHsl = function (hex) {
  return rgbToHsl(hexToRgb(hex));
};

// helper for changing hue
var shiftHue = function (h, s) { 
  h += s; 
  while (h >= 360.0) {
    h -= 360.0;
  }
  while (h < 0.0) {
    h += 360.0; 
  }
  return h; 
};

// helper to find complementary color
var calcComplementary = function(color) {
  var h = color[0], s = color[1], l = color[2];
  h = shiftHue(h, 180.00);
  return [h, s, l];
};

// helper to find analagous or triad color
var calcAnalagous = function(color, angle) {
  var h = color[0], s = color[1], l = color[2];
  h = shiftHue(h, angle);
  return [h, s, l];
};

//Angle
// degrees of sep for analagous & triad
var angle = 20.0;

// helper to find shade or tint of color
var calcShade = function(color, shade) {
  var lum = color[2] * shade;
  if (lum > 100) {
    lum = 100;
  }
  if (lum < 0) {
    lum = 0;
  }
  return [color[0], color[1], lum];
};

//Tints
// % brighter
var tint1 = 1.2;
var tint2 = 1.4;

//Shades
// % darker
var shade1 = 0.7;
var shade2 = 0.4;


module.exports.complementaryPalette = function(pri) {
  let priHsl = hexToHsl(pri);
  let sec1, sec2, tert1, tert2;
  sec2 = calcComplementary(priHsl);
  sec1 = calcShade(priHsl, tint1);
  tert1 = calcShade(priHsl, shade1);
  tert2 = calcShade(sec2, tint1);

  return {primary: pri, secondary1: hslToHex(sec1), secondary2: hslToHex(sec2), tertiary1: hslToHex(tert1), tertiary2: hslToHex(tert2)};
};

// console.log('complementary', complementaryPalette('#DA5252'));

module.exports.analagousPalette = function(pri) {
  let priHsl = hexToHsl(pri);
  let sec1, sec2, tert1, tert2;
  sec1 = calcAnalagous(priHsl, angle);
  sec2 = calcAnalagous(sec1, angle);
  tert1 = calcAnalagous(priHsl, -(angle));
  tert2 = calcAnalagous(tert1, -(angle));

  return {primary: pri, secondary1: hslToHex(sec1), secondary2: hslToHex(sec2), tertiary1: hslToHex(tert1), tertiary2: hslToHex(tert2)};
};

// console.log('analagous', analagousPalette('#DA5252'));

module.exports.splitCPalette = function(pri) {
  let priHsl = hexToHsl(pri);
  let sec1, sec2, tert1, tert2;
  let temp = calcComplementary(priHsl);
  sec1 = calcAnalagous(temp, angle);
  sec2 = calcAnalagous(temp, -(angle));
  tert1 = calcShade(sec1, shade1);
  tert2 = calcShade(sec2, shade1);

  return {primary: pri, secondary1: hslToHex(sec1), secondary2: hslToHex(sec2), tertiary1: hslToHex(tert1), tertiary2: hslToHex(tert2)};
};

// console.log('split complementary', splitCPalette('#DA5252'));

module.exports.triadPalette = function(pri) {
  let priHsl = hexToHsl(pri);
  let sec1, sec2, tert1, tert2;
  let temp = calcComplementary(priHsl);
  sec1 = calcAnalagous(temp, 120);
  sec2 = calcAnalagous(temp, -(120));
  tert1 = calcShade(sec1, shade1);
  tert2 = calcShade(sec2, shade1);

  return {primary: pri, secondary1: hslToHex(sec1), secondary2: hslToHex(sec2), tertiary1: hslToHex(tert1), tertiary2: hslToHex(tert2)};
};

// console.log('triad', triadPalette('#DA5252'));

module.exports.shadesPalette = function(pri) {
  let priHsl = hexToHsl(pri);
  let sec1, sec2, tert1, tert2;
  sec1 = calcShade(priHsl, tint1);
  sec2 = calcShade(priHsl, tint2);
  tert1 = calcShade(priHsl, shade1);
  tert2 = calcShade(priHsl, shade2);

  return {primary: pri, secondary1: hslToHex(sec1), secondary2: hslToHex(sec2), tertiary1: hslToHex(tert1), tertiary2: hslToHex(tert2)};
};

module.exports.hexToRgb = hexToRgb;

// console.log('shades', shadesPalette('DA5252'));



