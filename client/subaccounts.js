SubaccountsComponent = Vue.component('subaccounts', loadTemplate('subaccounts', {
    props: ['model'],
    methods: {
        removeAccount: function(id) {
            Accounts.remove({_id: id});
        },
    }
}));
