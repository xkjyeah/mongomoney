var Months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

MMVue = Vue; //.extend({
Vue.filter('fmtCurrency', function (n) {
            var m;
            if (typeof(n) == 'string') {
                m = parseFloat(n);
                if (!isFinite(m)) {
                    return '';
                }
            }
            else if (typeof(n) == 'undefined') {
                return '';
            }
            else if (typeof(n) != 'number') {
                return 'NaN';
            }
            else {
                m = n;
            }
            var v = m.toFixed(2).split('.');
            return v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                '.' + v[1];
        });
Vue.filter('fmtDate', function (d) {
            if (d === undefined) {
                return '';
            }
            if (typeof(d) == string) {
                d = new Date(d);
            }

            if (Date.prototype.isPrototypeOf(d)) {
                return ((d.getDate() < 10) ? '0' : '') + d.getDate() + ' '
                    Months[d.getMonth()] + ' ' +
                    d.getYear();
            }
        });
// $.extend(MMVue, Vue);

