
function ValidationError(passes, message) {
    this.passes = passes;
    this.message = message;
}
ValidationError.prototype.validates = function() {
    return this.passes;
}

/** FIXME: how to decide on the multiplier?
 *      we need decimal type in Javascript!
 * **/
CurrencyEquals = function (a, b) {
    return Math.round(a * 100) == Math.round(b * 100);
}

var InvalidFormat = new ValidationError(false, "Invalid format");
var Valid = new ValidationError(true);

var validation_functions = [

/* validate journal */
function (journal_entry) {
    if (!'journal' in journal_entry) {
        return InvalidFormat;
    }

    var sum_credits = 0,
        sum_debits = 0;

    var sum_amount = function (jl1, jl2) {
        return jl1.amount + jl2.amount;
    };

    sum_credits = journal_entry.journal.credits.reduce(
            sum_amount, { amount: 0 });

    sum_debits = journal_entry.journal.debits.reduce(
            sum_amount, { amount: 0 });

    return ValidationError(
                CurrencyEquals(sum_credits, sum_debits),
                "Credits and Debits do not equal");
},

/* validate invoice */
/* FIXME: consider discounts */
/* FIXME: validate the tax account codes! */
function (invoice) {
    if (! 'invoice' in journal_entry) {
        return Valid;
    }

    var credit_balances = {},
        debit_balances = {};

    // debit the payables account,
    // credit the customer / liabilities account
    
    // add the journal balances
    journal_entry.journal.credits.forEach(function (jline) {
        credit_balances[jline.account] += jline.amount;
    });
    journal_entry.journal.debits.forEach(function (jline) {
        debit_balances[jline.account] += jline.amount;
    });

    // subtract the invoice figures
    journal_entry.invoice.lines.forEach(function (invline) {
        debit_balances[cust_acct] -= invline.amount;
        credit_balances[invline.account] -= invline.amount;
    });
    journal_entry.invoice.taxes.forEach(function (taxline) {
        debit_balances[cust_acct] -= taxline.amount;
        credit_balances[taxline.account] -= invline.amount;
    });
    
    // ensure everything equals to zero
    for (var acc in credit_balances) {
        if (!CurrencyEquals(credit_balances[acc], 0)) {
            return new ValidationError(false,
                    "Credit balance does not match invoice");
        }
    }

    for (var acc in debit_balances) {
        if (!CurrencyEquals(debit_balances[acc], 0)) {
            return new ValidationError(false,
                    "Debit balance does not match invoice");
        }
    }

    return Valid;
},

]; /* validation functions array */

Meteor.methods({
    insertJournalEntry: function (je) {
        for (var i=0; i<validation_functions.length; i++) {
            var result = validation_functions[i](je);
            if (!result.validates()) {
                return result.message;
            }
        }

        return JournalEntries.insert(je);
    },
});

