define([
  'core/js/adapt'
], function(Adapt) {

  var LayoutBlockView = Backbone.View.extend({

    initialize: function() {
      this.listenTo(Adapt, {
        'remove': this.remove,
        'device:changed device:resize': this.deviceResize
      });

      this.render();
    },

    render: function() {
      // Collect config settings
      this.disableOnMobile = Adapt.course.get('_layoutExtension')._disableOnMobile;
      this.fullHeightEnabled = Adapt.course.get('_layoutExtension')._fullHeightEnabled;
      this.customHeightEnabled = Adapt.course.get('_layoutExtension')._customHeight._isEnabled;
      this.customMinHeight = Adapt.course.get('_layoutExtension')._customHeight._minHeight;

      this.parentInner = $('.' + this.model.get('_parentId') + ' > .article__inner');

      this.block = $('.' + this.model.get('_id'));
      this.blockInner = $('.' + this.model.get('_id') + ' > .block__inner');

      if (this.model.get('_layoutExtension') && this.model.get('_layoutExtension')._isEnabled && this.model.get('_layoutExtension')._componentWidths._isEnabled) {
        this.componentLeftWidth = this.model.get('_layoutExtension')._componentWidths._left;
        this.componentRightWidth = this.model.get('_layoutExtension')._componentWidths._right;
      }

      this.deviceResize();
    },

    deviceResize: function() {
      if (this.model.get('_layoutExtension') && this.model.get('_layoutExtension')._isEnabled && this.model.get('_layoutExtension')._componentWidths._isEnabled) {
        this.setWidths();
      }

      // If the block config is overiding course config then do not continue
      if (this.model.get('_layoutExtension') && this.model.get('_layoutExtension')._isEnabled && this.model.get('_layoutExtension')._disableFullHeight) return;

      this.parentPadding = $(this.parentInner).outerHeight() - $(this.parentInner).height();
      this.blockPadding = $(this.blockInner).outerHeight() - $(this.blockInner).height();

      if (Adapt.device.screenSize === 'small' && this.disableOnMobile) {
        this.resetLayout();
      } else {
        this.updateLayout();
      }
    },

    setWidths: function() {
      if (Adapt.device.screenSize == 'large') {
        $(this.block).find('.is-left').css('width', this.componentLeftWidth + '%');
        $(this.block).find('.is-right').css('width', this.componentRightWidth + '%');
      } else {
        $(this.block).find('.is-left').css('width', '100%');
        $(this.block).find('.is-right').css('width', '100%');
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

      $(this.blockInner).css('min-height', windowHeight - this.blockPadding - this.parentPadding);
      $(this.block).addClass('is-layout-cover');
    },

    setCustomHeight: function() {
      $(this.blockInner).css('min-height', this.customMinHeight);
    },

    resetLayout: function() {
      $(this.blockInner).css('min-height', '');
      $(this.block).removeClass('is-layout-cover');
    }

  });

  return LayoutBlockView;

});
