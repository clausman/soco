module.exports = function(definition)
{
    this.create = definition.create;
    this.validate = definition.validate;
    this.createFromObject = definition.createFromObject;
};