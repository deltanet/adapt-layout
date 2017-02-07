define([
    'coreJS/adapt'
], function(Adapt) {

    var Layout = _.extend({

        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
        },

        onDataReady: function() {
            if (Adapt.course.get("_layout") && Adapt.course.get("_layout")._isEnabled) {
                this.setupLayout();
            }
        },

        setupLayout: function() {
            this.listenTo(Adapt, "pageView:ready", this.deviceResize);
            this.listenTo(Adapt, 'device:changed device:resize', this.deviceResize);
            // Collect config settings
            this.disableOnMobile = Adapt.course.get("_layout")._disableOnMobile;
            this.fullHeightEnabled = Adapt.course.get("_layout")._fullHeightEnabled;
            this.customHeightEnabled = Adapt.course.get("_layout")._customHeight._isEnabled;
            this.customMinHeight = Adapt.course.get("_layout")._customHeight._minHeight;
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
        }

    }, Backbone.Events);

    Layout.initialize();

    return Layout;

})
