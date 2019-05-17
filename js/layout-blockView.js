define([
    'coreJS/adapt'
], function(Adapt) {

    var LayoutBlockView = Backbone.View.extend({

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

          this.parentInner = $('.' + this.model.get('_parentId') + " > .article-inner");

          this.block = $('.' + this.model.get('_id'));
          this.blockInner = $('.' + this.model.get('_id') + " > .block-inner");

          if (this.model.get("_layoutExtension") && this.model.get("_layoutExtension")._isEnabled && this.model.get("_layoutExtension")._componentWidths._isEnabled) {
            this.componentLeftWidth = this.model.get("_layoutExtension")._componentWidths._left;
            this.componentRightWidth = this.model.get("_layoutExtension")._componentWidths._right;
          }

          this.deviceResize();
        },

        deviceResize: function() {
          if(this.model.get("_layoutExtension")._componentWidths._isEnabled) {
            this.setWidths();
          }

          // If the block config is overiding course config then do not continue
          if (this.model.get("_layoutExtension")._disableFullHeight) return;

          this.parentPadding = parseInt($(this.parentInner).css("padding-top").replace('px','')) + parseInt($(this.parentInner).css("padding-bottom").replace('px',''));

          this.blockPadding = parseInt($(this.blockInner).css("padding-top").replace('px','')) + parseInt($(this.blockInner).css("padding-bottom").replace('px',''));

          if (Adapt.device.screenSize === 'small' && this.disableOnMobile) {
            this.resetLayout();
          } else {
            this.updateLayout();
          }
        },

        setWidths: function() {
          if (Adapt.device.screenSize == "large") {
            $(this.block).find('.component-left').css('width', this.componentLeftWidth + '%');
            $(this.block).find('.component-right').css('width', this.componentRightWidth + '%');
          } else {
            $(this.block).find('.component-left').css('width', '100%');
            $(this.block).find('.component-right').css('width', '100%');
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

          $(this.blockInner).css("min-height", windowHeight - this.blockPadding - this.parentPadding);
          $(this.block).addClass("layout-cover");
        },

        setCustomHeight: function() {
          $(this.blockInner).css("min-height", this.customMinHeight);
        },

        resetLayout: function() {
          $(this.blockInner).css("min-height", "");
          $(this.block).removeClass("layout-cover");
        }

    });

    return LayoutBlockView;

});
