define([
  'core/js/adapt'
], function(Adapt) {

  var LayoutMenuView = Backbone.View.extend({

    initialize: function() {
      this.listenTo(Adapt, {
        'remove': this.remove,
        'device:changed device:resize': this.deviceResize,
        'menuView:ready': this.render
      });
    },

    render: function() {
      // Collect config settings
      this.disableOnMobile = Adapt.course.get('_layoutExtension')._disableOnMobile;
      this.fullHeightEnabled = Adapt.course.get('_layoutExtension')._fullHeightEnabled;
      this.customHeightEnabled = Adapt.course.get('_layoutExtension')._customHeight._isEnabled;
      this.customMinHeight = Adapt.course.get('_layoutExtension')._customHeight._minHeight;

      this.menu = $('.menu');

      this.deviceResize();
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
      var windowHeight = $(window).height() - $('.nav').height();

      $(this.menu).addClass('is-layout-cover').css('min-height', windowHeight);
    },

    setCustomHeight: function() {
      $(this.menu).css('min-height', this.customMinHeight);
    },

    resetLayout: function() {
      $(this.menu).removeClass('is-layout-cover').css('min-height', '');
    }

  });

  return LayoutMenuView;

});
