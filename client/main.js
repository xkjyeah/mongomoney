Vue.config.debug=false;

Meteor.startup(function () {
    var App = Vue.extend({});
    var router = new VueRouter();

    router.map({
        '/journal-entry': {
            component: Vue.component('journal-entry'),
        },
        '/journal-entry/:docId': {
            name: 'journal-entry',
            component: Vue.component('journal-entry'),
        },
        '/': {
            component: Vue.component('chart-of-accounts'),
        },
        '/chart-of-accounts': {
            name: 'chart-of-accounts',
            component: Vue.component('chart-of-accounts'),
        },
        '/account-history/:docId': {
            name: 'account-history',
            component: Vue.component('account-history'),
        },
        '/test-bug': {
            name: 'test-bug',
            component: Vue.component('test-bug'),
        },
    });

    router.start(App, '#app');
});


