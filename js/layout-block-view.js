define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var LayoutBlockView = Backbone.View.extend({

        initialize: function() {
          this.listenTo(Adapt, 'remove', this.remove);
          this.listenTo(Adapt, 'device:changed', this.checkState);
          this.listenTo(Adapt, "pageView:ready", this.render);
        },

        render: function() {
          this.id = this.model.get("_id");
          if(this.model.get("_layoutExtension")._componentWidths._isEnabled) {
            this.componentLeft = this.model.get("_layoutExtension")._componentWidths._left;
            this.componentRight = this.model.get("_layoutExtension")._componentWidths._right;
            this.setWidths();
          }
        },

        setWidths: function() {
          if (Adapt.device.screenSize == "large") {
            $('.' + this.id).find('.component-left').css('width', this.componentLeft + '%');
            $('.' + this.id).find('.component-right').css('width', this.componentRight + '%');
          } else {
            $('.' + this.id).find('.component-left').css('width', '100%');
            $('.' + this.id).find('.component-right').css('width', '100%');
          }
        },

        checkState: function() {
          if(this.model.get("_layoutExtension")._componentWidths._isEnabled) {
            this.setWidths();
          }
        }

    });

    return LayoutBlockView;

});
