
var AccountTypes = [
    { name: 'Asset',        incr: 'debit', decr: 'credit' },
    { name: 'Liability',    incr: 'credit', decr: 'debit' },
    { name: 'Income',       incr: 'credit', decr: 'debit' },
    { name: 'Expense',      incr: 'debit', decr: 'credit' },
    { name: 'Equity',       incr: 'credit', decr: 'debit' },
    ];


AccountTypeSelectorComponent = Vue.component('account-type-selector', loadTemplate('account-type-selector', {
    props: ['vModel'],
    data: function() { getFromModel.call(this); },
    methods: {
        updateModel: updateModel,
    }
}));

MMVue.filter('getAccountType', function (n) {
    return AccountTypes[n];
});

