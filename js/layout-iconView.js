define([
  'core/js/adapt'
], function(Adapt) {

  var LayoutIconView = Backbone.View.extend({

    className: 'layout__icon',

    initialize: function() {
      this.listenTo(Adapt, {
        'remove': this.remove,
        'pageView:ready': this.setLayout
      });

      this.render();
    },

    render: function() {
      var data = this.model.toJSON();
      var template = Handlebars.templates['layoutIcon'];

      this.id = this.model.get('_id');

      $(this.el).html(template(data)).prependTo('.' + this.id + ' > .component__inner' + ' > .component__header' + ' > .component__header-inner' + ' > .component__body');

      $('.' + this.id).addClass('is-layout-icon');

      $(this.el).imageready(function() {
        this.setLayout();
      }.bind(this));
    },

    setLayout: function() {
      var width = $(this.el).outerWidth();
      var height = $(this.el).outerHeight();

      if (Adapt.config.get('_defaultDirection') === 'ltr') {
        var direction = 'left';
      } else {
        var direction = 'right';
      }

      $('.' + this.id).find('.component__body-inner').css('margin-'+direction, width);
      $('.' + this.id).find('.component__instruction-inner').css('margin-'+direction, width);

      $('.' + this.id).find('.component__body-inner').css('min-height', height);
    }

  });

  return LayoutIconView;

});
