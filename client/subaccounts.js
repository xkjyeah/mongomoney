SubaccountsComponent = Vue.component('subaccounts', loadTemplate('subaccounts', {
    props: ['model', 'indent'],
    methods: {
        removeAccount: function(id) {
            Accounts.remove({_id: id});
        },
    }
}));
