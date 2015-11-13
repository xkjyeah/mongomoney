
var JournalLine = MMVue.component('journal-line',
                loadTemplate('journal-line', {
                    props: ['line'],
                    ready: function () {
                        var self = this;
                        console.log(self);
                        console.log(self.line);
                        $(this.$el).find('input:text[name="credit_amt"]')
                                .keyup(function () {
                                    if ($(this).val() != '') {
                                        self.$set('line.amount', $(this).val());
                                        self.$set('line.type', 'credit');
                                    }
                               });

                        $(this.$el).find('input:text[name="debit_amt"]')
                                .keyup(function () {
                                    if ($(this).val() != '') {
                                        self.$set('line.amount', $(this).val());
                                        self.$set('line.type', 'debit');
                                    }
                                });
                        $(this.$el).find('select').focus();
                },
            }));

JournalEntry = MMVue.component('journal-entry', loadTemplate('journal-entry', {
    sync: {
        journal_entry: function() {
            if (this.$route.params.docId) {
                var doc = JournalEntries.findOne({
                    _id: this.$route.params.docId
                });
                if (doc) return doc;
            }
            // dummy sync variable
            return {
                date: new Date().toISOString().substr(0,10),
                journal: {
                    lines: [],
                },
            };
        },
    },
    ready: function () {
    },
    methods: {
        addLine: function (e) {
            if (this.$get('journal_entry.journal.lines') === undefined) {
                this.$set('journal_entry.journal.lines', []);
            }
            this.journal_entry.journal.lines.push({});
        },
        submit: function (e) {
            var self = this;

            e.preventDefault();

            var vuedata = {};

            $.extend(true, vuedata, self.$data.journal_entry);

            console.log(vuedata);

            // filter out the unwanted lines...
            if (!'lines' in vuedata.journal) {
                vuedata.journal.lines = [];
            }
            vuedata.journal.lines = vuedata.journal.lines.filter(function (l) {
                return (l.type === 'credit' || l.type === 'debit') &&
                    (isFinite(parseFloat(l.amount)));
            });
            vuedata.journal.lines.forEach(function (l) {
                l.amount = parseFloat(l.amount);
            });

            if (this.$route.params.docId) {
                JournalEntries.update({_id: this.$route.params.docId}, vuedata);
            }
            else {
                JournalEntries.insert(vuedata, function (_id) {
                    self.$data.journal_entry = JournalEntries.findOne(_id);
                    // FIXME: probably tell VueRouter to "go" to the new page
                });
            }
        },
    }
}));


