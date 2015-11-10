
AccountEntryComponent = Vue.component('account-entry', loadTemplate('account-entry', {
    props: ['model'],
    data: function() {
        return {
            account: this.model ? this.model : {
                name: '',
                type: '',
            },
        };
    },
    methods: {
        addAccount: function(e) {
            e.preventDefault();

            var self = this;
            var data = {};
            _.extend(data, this.$data.account);

            Accounts.insert(data, function(id) {
                self.$data._id = id;
            });
        },
    }
}));
