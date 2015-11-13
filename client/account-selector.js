
AccountSelector = MMVue.component('account-selector', loadTemplate('account-selector', {
    props:  ['hasBlank', 'name', 'vModel'],
    sync: {
        accounts_list: function () {
            return Accounts.find({});
        },
    },
    data: function () {
        return {
            data: this.vModel ? this.$parent.$get(this.vModel) : '',
        };
    },
    methods: {
        updateModel: function (e) {
            if (this.vModel)
                this.$parent.$set(this.vModel, $(e.target).val());
        },
    }
}));

