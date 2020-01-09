define([
    'core/js/adapt',
    './layout-articleView',
    './layout-blockView',
    './layout-componentView',
    './layout-iconView'
], function(Adapt, LayoutArticleView, LayoutBlockView, LayoutComponentView, LayoutIconView) {

    var Layout = _.extend({

        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
        },

        onDataReady: function() {
            if (Adapt.course.get("_layoutExtension") && Adapt.course.get("_layoutExtension")._isEnabled) {
                this.setupLayout();
            }
        },

        setupLayout: function() {
            this.listenTo(Adapt, "articleView:postRender", this.onArticleReady);
            this.listenTo(Adapt, "blockView:postRender", this.onBlockReady);
            this.listenTo(Adapt, "componentView:postRender", this.onComponentReady);
        },

        onArticleReady: function(view) {
          if (Adapt.course.get("_layoutExtension")._fullHeightEnabled || Adapt.course.get("_layoutExtension")._customHeight._isEnabled) {
              new LayoutArticleView({model:view.model});
          }
        },

        onBlockReady: function(view) {
          if (Adapt.course.get("_layoutExtension")._fullHeightEnabled || Adapt.course.get("_layoutExtension")._customHeight._isEnabled) {
              new LayoutBlockView({model:view.model});
          }
        },

        onComponentReady: function(view) {
          if (view.model && view.model.get("_layoutExtension") && view.model.get("_layoutExtension")._isEnabled) {
              new LayoutComponentView({model:view.model});

              if (view.model.get("_layoutExtension")._icon && view.model.get("_layoutExtension")._icon._isEnabled) {
                new LayoutIconView({model:view.model});
              }
          }
        }

    }, Backbone.Events);

    Layout.initialize();

    return Layout;

});
