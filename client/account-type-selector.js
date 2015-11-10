
AccountTypeSelectorComponent = Vue.component('account-type-selector', loadTemplate('account-type-selector', {
    props: ['vModel'],
    data: function() { getFromModel.call(this); },
    methods: {
        updateModel: updateModel,
    }

}));
