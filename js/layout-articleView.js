define([
    'coreJS/adapt'
], function(Adapt) {

    var LayoutArticleView = Backbone.View.extend({

        initialize: function() {
          this.listenTo(Adapt, 'remove', this.remove);
          this.listenTo(Adapt, 'device:changed device:resize', this.deviceResize);
          this.listenTo(Adapt, "pageView:ready", this.render);
        },

        render: function() {
          // Collect config settings
          this.disableOnMobile = Adapt.course.get("_layoutExtension")._disableOnMobile;
          this.fullHeightEnabled = Adapt.course.get("_layoutExtension")._fullHeightEnabled;
          this.customHeightEnabled = Adapt.course.get("_layoutExtension")._customHeight._isEnabled;
          this.customMinHeight = Adapt.course.get("_layoutExtension")._customHeight._minHeight;

          this.article = $('.' + this.model.get('_id'));
          this.articleInner = $('.' + this.model.get('_id') + " > .article-inner");

          this.deviceResize();
        },

        deviceResize: function() {
          this.articlePadding = parseInt($(this.articleInner).css("padding-top").replace('px','')) + parseInt($(this.articleInner).css("padding-bottom").replace('px',''));

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
          var windowHeight = $(window).height() - $('.navigation').height();

          $(this.articleInner).css("min-height", windowHeight - this.articlePadding);
          $(this.article).addClass("layout-cover");
        },

        setCustomHeight: function() {
          $(this.articleInner).css("min-height", this.customMinHeight);
        },

        resetLayout: function() {
          $(this.articleInner).css("min-height", "");
          $(this.article).removeClass("layout-cover");
        }

    });

    return LayoutArticleView;

});
