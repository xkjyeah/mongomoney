Vue.config.debug = true;
DictAccounts = {};

function setupAccounts() {
    var accounts = Accounts.find({}).fetch();

    // setup dictionary _id --> Account object
    accounts.forEach(function (acc) {
        DictAccounts[acc._id] = acc;
    });
    // FIXME: this will not update views...
}

Tracker.autorun(setupAccounts);

function getAccount(id) {
    return DictAccounts[id];
}
Vue.filter('getAccount', getAccount);
Vue.filter('get', function (v,s) {
    return v[s];
});

function accounts_hierarchical() {
    var accounts = Accounts.find({}).fetch();
    var dict_accounts = {};
    var root = [];

    console.log(accounts);

    accounts.forEach(function (a) {
        dict_accounts[a._id] = a;
        a.subaccounts = [];
    });

    // match to their parents...
    accounts.forEach(function (a) {
        if (a.parent_account == "" ||
            a.parent_account == null) {

            root.push(a);
        }
        else {
            dict_accounts[a.parent_account].subaccounts.push(a);
            // FIXME: handle invalid references
        }
    });

    return root;
}


ChartOfAccountsComponent = MMVue.component('chart-of-accounts', loadTemplate('chart-of-accounts', {
    props: ['model'],
    sync: {
        accounts: function() {
            return accounts_hierarchical();
        },
    }
}));
