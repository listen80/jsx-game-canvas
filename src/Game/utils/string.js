export function calcLength(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

export function splitStringByWidth(str, w) {
  let len = 0;
  let start = 0;
  const re = [];
  let i = 0;
  for (; i < str.length; i++) {
    let c = 0;
    if (str.charCodeAt(i) > 127) {
      c = 2;
    } else {
      c = 1;
    }
    len += c;
    if (len > w) {
      re.push(str.substring(start, i));
      start = i;
      len = c;
    }
  }
  re.push(str.substring(start, i));
  return re;
}
