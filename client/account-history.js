
var AccountHistoryLineComponent = MMVue.component('account-history-line', loadTemplate('account-history-line', {
    props: ['entry'],
}));

AccountHistoryComponent = MMVue.component('account-history', loadTemplate('account-history', {
    props: ['model'],
    data: function() { return {
            sumCredits:0,
            sumDebits: 0,
            account: {},
            transactions: [],
            docId: 0,
        };
    },
    sync: {
        account: function() {
            return Accounts.findOne(Session.get('docId'));
        },
        transactions: function() {
            return JournalEntries.find({
                'journal.lines': {
                    $elemMatch: {
                        account: Session.get('docId'),
                    }
                },
            });
        },
    },
    methods: {
        check: function() {
            console.log(this.transactions);
        }
    },
    watch: {
        '$route.params.docId': function() {
            Session.set('docId', this.$route.params.docId);
        },
        /* update the account balance... */
        transactions: function() {
            var sumCredits = 0;
            var sumDebits = 0;
            var self=this;

            self.transactions.forEach(function (t) {
                var txnCredits = 0, txnDebits = 0;

                t.journal.lines.forEach(function (l) {
                    if (l.account == self.$route.params.docId) {
                        if (l.type == 'credit') {
                            txnCredits += parseFloat(l.amount);
                            sumCredits += parseFloat(l.amount);
                        }
                        else if (l.type == 'debit') {
                            txnDebits += parseFloat(l.amount);
                            sumDebits += parseFloat(l.amount);
                        }
                        else {
                            console.error('Unknown transaction type: ' + l.type);
                        }
                    }
                });

                t.balanceCredits =  sumCredits;
                t.balanceDebits  = sumDebits;
            });
            self.sumCredits = sumCredits;
            self.sumDebits = sumDebits;
        },
    },
}));
