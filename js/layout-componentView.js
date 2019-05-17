define([
    'coreJS/adapt'
], function(Adapt) {

    var LayoutComponentView = Backbone.View.extend({

        initialize: function() {
          this.listenTo(Adapt, 'remove', this.remove);
          this.listenTo(Adapt, 'device:changed', this.checkState);
          this.listenTo(Adapt, "pageView:ready", this.render);
        },

        render: function() {
          this.id = this.model.get("_id");
          this.hideOn = this.model.get("_layoutExtension")._hideOn;

          this.hideOnSizes = [];
          this.hideOnSizes = this.hideOn.split(" ");

          this.checkState();
        },

        checkState: function() {
          for (var i = 0; i < this.hideOnSizes.length; i++) {
            if (Adapt.device.screenSize == this.hideOnSizes[i]) {
        			this.model.set("_isAvailable", false);
        			$('.' + this.id).addClass("display-none");
        		} else {
        			this.model.set("_isAvailable", true);
        			$('.' + this.id).removeClass("display-none");
        		}
          }
          Adapt.trigger("pageLevelProgress:update");
        }

    });

    return LayoutComponentView;

});
