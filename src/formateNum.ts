export function formateNum(number: number | string, decimals: number = 2, integer: 'floor' | 'ceil' = 'ceil') {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  const n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = ',',
    dec = '.',
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.'),
    re = /(-?\d+)(\d{3})/

  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec)

  function toFixedFix(n: number, prec: number): string {
    const k = Math.pow(10, prec);
    return '' + (integer === 'ceil'
      ? Math.ceil(n * k) / k
      : Math.floor(n * k) / k)
  };
}
