Vue.config.debug=false;

Meteor.startup(function () {
    var App = MMVue.extend({});
    var router = new VueRouter();

    router.map({
        '/journal-entry': {
            component: MMVue.component('journal-entry'),
        },
        '/journal-entry/:docId': {
            name: 'journal-entry',
            component: MMVue.component('journal-entry'),
        },
        '/': {
            component: MMVue.component('chart-of-accounts'),
        },
        '/chart-of-accounts': {
            name: 'chart-of-accounts',
            component: MMVue.component('chart-of-accounts'),
        },
        '/account-history/:docId': {
            name: 'account-history',
            component: MMVue.component('account-history'),
        },
        '/test-bug': {
            name: 'test-bug',
            component: MMVue.component('test-bug'),
        },
    });

    router.start(App, '#app');
});


