
Accounts = new Mongo.Collection("accounts");
AccountTypes =[
        {type_code: 0, type_name: 'Liability'},
        {type_code: 1, type_name: 'Asset'},
        {type_code: 2, type_name: 'Revenue'},
        {type_code: 3, type_name: 'Expense'},
        ];

Template.chart_of_accounts.helpers({
    account_types: AccountTypes,

    accounts: function () {
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
    },

});

Template.chart_of_accounts.events({
    'click #cr_submit': function (evt, temp) {
        evt.preventDefault();

        var acc = {
            name: $('#cr_name').val(),
            type: $('#cr_type').val(),
            parent_account: $('#cr_parent').val(),
        };

        Accounts.insert(acc);
    },
});

Template.subaccount.helpers({
    acc_type: function (t) {
        return AccountTypes[t].name;
    }
});

Template.subaccount.events({
    'click button.delete': function (evt, temp) {
        console.log(temp);
        Accounts.remove({
            _id: temp.data._id,
        });
    },
});


