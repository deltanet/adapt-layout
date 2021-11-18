import Adapt from 'core/js/adapt';

export default class LayoutBlockView extends Backbone.View {

  initialize() {
    this.listenTo(Adapt, {
      'remove': this.remove,
      'device:changed device:resize': this.deviceResize
    });

    this.render();
  }

  render() {
    this.disableOnMobile = Adapt.course.get('_layoutExtension')._disableOnMobile;
    this.fullHeightEnabled = Adapt.course.get('_layoutExtension')._fullHeightEnabled;
    this.customHeightEnabled = Adapt.course.get('_layoutExtension')._customHeight._isEnabled;
    this.customMinHeight = Adapt.course.get('_layoutExtension')._customHeight._minHeight;

    this.article = $('.' + this.model.get('_parentId'));
    this.articleHeader = $(this.article).find('.article__header');
    this.articleHeaderHeight = 0;

    this.block = $('.' + this.model.get('_id'));
    this.blockInner = $('.' + this.model.get('_id') + ' > .block__inner');

    if (this.model.get('_layoutExtension') && this.model.get('_layoutExtension')._isEnabled && this.model.get('_layoutExtension')._componentWidths._isEnabled) {
      this.componentLeftWidth = this.model.get('_layoutExtension')._componentWidths._left;
      this.componentRightWidth = this.model.get('_layoutExtension')._componentWidths._right;
    }

    this.deviceResize();
  }

  deviceResize() {
    if (this.model.get('_layoutExtension') && this.model.get('_layoutExtension')._isEnabled && this.model.get('_layoutExtension')._componentWidths._isEnabled) {
      this.setWidths();
    }

    // If the block config is overiding course config then do not continue
    if (this.model.get('_layoutExtension') && this.model.get('_layoutExtension')._isEnabled && this.model.get('_layoutExtension')._disableFullHeight) return;

    // Update header height if there is one
    if ($(this.article).find('.article__header').length) {
      this.articleHeaderHeight = $(this.articleHeader).outerHeight();
    }

    if (Adapt.device.screenSize === 'small' && this.disableOnMobile) {
      this.resetLayout();
    } else {
      this.updateLayout();
    }
  }

  setWidths() {
    if (Adapt.device.screenSize == 'large') {
      $(this.block).find('.is-left').css('width', this.componentLeftWidth + '%');
      $(this.block).find('.is-right').css('width', this.componentRightWidth + '%');
    } else {
      $(this.block).find('.is-left').css('width', '100%');
      $(this.block).find('.is-right').css('width', '100%');
    }
  }

  updateLayout() {
    if (this.fullHeightEnabled) {
      this.setFullHeight();
    } else if (this.customHeightEnabled) {
      this.setCustomHeight();
    }
  }

  setFullHeight() {
    const windowHeight = $(window).height() - $('.nav').height();

    // Only account for article header if this block is the first in the article
    this.siblings = this.model.getSiblings(true);

    if (this.siblings.models[0].get('_id') == this.model.get('_id')) {
      $(this.blockInner).css('min-height', windowHeight - this.articleHeaderHeight);
    } else {
      $(this.blockInner).css('min-height', windowHeight);
    }

    $(this.block).addClass('is-layout-cover');
  }

  setCustomHeight() {
    $(this.blockInner).css('min-height', this.customMinHeight);
  }

  resetLayout() {
    $(this.blockInner).css('min-height', '');
    $(this.block).removeClass('is-layout-cover');
  }
}
