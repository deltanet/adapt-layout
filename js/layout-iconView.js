define([
  'core/js/adapt'
], function(Adapt) {

  var LayoutIconView = Backbone.View.extend({

    className: "layout-icon",

    initialize: function() {
      this.listenTo(Adapt, {
        "remove": this.remove
      });

      this.render();
    },

    render: function() {
      var data = this.model.toJSON();
      var template = Handlebars.templates["layoutIcon"];

      this.id = this.model.get("_id");

      $(this.el).html(template(data)).prependTo('.' + this.id + " > .component-inner" + " > .component-header" + " > .component-header-inner" + " > .component-body");

      $('.' + this.id).addClass("layout-icon-enabled");

      _.defer(_.bind(function() {
        this.postRender();
      }, this));
    },

    postRender: function() {
      var width = $(this.el).outerWidth();

      if (Adapt.config.get('_defaultDirection') === 'ltr') {
        var direction = "left";
      } else {
        var direction = "right";
      }

      $('.' + this.id).find('.component-body-inner').css('margin-'+direction, width);
      $('.' + this.id).find('.component-instruction-inner').css('margin-'+direction, width);
    }

  });

  return LayoutIconView;

});