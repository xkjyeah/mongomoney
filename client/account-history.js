
var AccountHistoryLineComponent = Vue.component('account-history-line', loadTemplate('account-history-line', {
    props: ['entry'],
}));

AccountHistoryComponent = Vue.component('account-history', loadTemplate('account-history', {
    props: ['model'],
    sync: {
        account: function() {
            return Accounts.findOne(this.$route.params.docId);
        },
        transactions: function() {
            return JournalEntries.find({
                'journal.lines': {
                    $elemMatch: {
                        account: this.$route.params.docId,
                    }
                },
            });
        },
    },
    methods: {
        check: function() {
            console.log(this.transactions);
        }},
}));
