
loadTemplate = function (path, options) {
    options.template = '#' + path;
    return options;
}

/* Used for custom components that simulates v-model */
updateModel = function (e) {
    console.log('update from model ' + this.vModel);
    if (this.vModel)
        this.$parent.$set(this.vModel, this.data);
}
getFromModel = function() {
    console.log('get from model ' + this.vModel);
    return {
        data: this.vModel ? this.$parent.$get(this.vModel) : '',
    };
}

