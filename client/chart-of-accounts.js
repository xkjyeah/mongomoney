
ChartOfAccountsComponent = Vue.component('chart-of-accounts', loadTemplate('chart-of-accounts', {
    props: ['model'],
    sync: {
        accounts: function() {
            return Accounts.find({});
        },
    }
}));
