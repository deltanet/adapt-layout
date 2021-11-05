define([
  'core/js/adapt'
], function(Adapt) {

  var LayoutArticleView = Backbone.View.extend({

    initialize: function() {
      this.listenTo(Adapt, {
        'remove': this.remove,
        'device:changed device:resize': this.deviceResize
      });

      this.render();
    },

    render: function() {
      this.disableOnMobile = Adapt.course.get('_layoutExtension')._disableOnMobile;
      this.fullHeightEnabled = Adapt.course.get('_layoutExtension')._fullHeightEnabled;
      this.customHeightEnabled = Adapt.course.get('_layoutExtension')._customHeight._isEnabled;
      this.customMinHeight = Adapt.course.get('_layoutExtension')._customHeight._minHeight;

      this.article = $('.' + this.model.get('_id'));
      this.articleInner = $('.' + this.model.get('_id') + ' > .article__inner');

      this.articlePadding = 0;

      this.deviceResize();
    },

    deviceResize: function() {
      this.articlePadding = $(this.articleInner).outerHeight() - $(this.articleInner).height();

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
      var windowHeight = $(window).height() - $('.nav').height();

      console.log("Layout: setFullHeight");

      $(this.articleInner).css('min-height', windowHeight - this.articlePadding);
      $(this.article).addClass('is-layout-cover');
    },

    setCustomHeight: function() {
      $(this.articleInner).css('min-height', this.customMinHeight);
    },

    resetLayout: function() {
      $(this.articleInner).css('min-height', '');
      $(this.article).removeClass('is-layout-cover');
    }

  });

  return LayoutArticleView;

});
