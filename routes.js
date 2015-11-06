Router.configure({
    layoutTemplate: 'base',
});
Router.route('/chart_of_accounts', function () {
    this.render('chart_of_accounts');
});
