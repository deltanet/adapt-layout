define([
    'coreJS/adapt',
    './layout-block-view',
    './layout-component-view'
], function(Adapt, LayoutBlockView, LayoutComponentView) {

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
            this.listenTo(Adapt, "pageView:ready", this.deviceResize);
            this.listenTo(Adapt, 'device:changed device:resize', this.deviceResize);
            this.listenTo(Adapt, "blockView:postRender", this.onBlockReady);
            this.listenTo(Adapt, "componentView:postRender", this.onComponentReady);
            // Collect config settings
            this.disableOnMobile = Adapt.course.get("_layoutExtension")._disableOnMobile;
            this.fullHeightEnabled = Adapt.course.get("_layoutExtension")._fullHeightEnabled;
            this.customHeightEnabled = Adapt.course.get("_layoutExtension")._customHeight._isEnabled;
            this.customMinHeight = Adapt.course.get("_layoutExtension")._customHeight._minHeight;
        },

        deviceResize: function() {
            if (Adapt.device.screenSize === 'small' && this.disableOnMobile) {
                this.resetLayout();
            } else {
                this.updateLayout();
            }
        },

        updateLayout: function() {
            if (this.fullHeightEnabled) {
                this.setFullHeight();
            } else if (this.customHeightEnabled) {
                this.setCustomHeight();
            }
        },

        setFullHeight: function() {
            var windowHeight = $(window).height();
            $('.article').css({
                "min-height": windowHeight
            });
            $('.article').addClass("layout-cover");
        },

        setCustomHeight: function() {
            $('.article').css({
                "min-height": this.customMinHeight
            });
        },

        resetLayout: function() {
            $('.article').css({
                "min-height": "10px"
            });
            $('.article').removeClass("layout-cover");
        },

        onBlockReady: function(view) {
          if (view.model && view.model.get("_layoutExtension") && view.model.get("_layoutExtension")._isEnabled) {
              new LayoutBlockView({model:view.model});
          }
        },

        onComponentReady: function(view) {
          if (view.model && view.model.get("_layoutExtension") && view.model.get("_layoutExtension")._isEnabled) {
              new LayoutComponentView({model:view.model});
          }
        }


    }, Backbone.Events);

    Layout.initialize();

    return Layout;

})
