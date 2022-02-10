import Adapt from 'core/js/adapt';

export default class LayoutArticleView extends Backbone.View {

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

    this.article = $('.' + this.model.get('_id'));
    this.articleInner = $('.' + this.model.get('_id') + ' > .article__inner');

    this.articlePadding = 0;

    if (this.model.get('_layoutExtension') && this.model.get('_layoutExtension')._isEnabled && this.model.get('_layoutExtension')._hasFullWidth) {
      $(this.article).addClass('is-layout-fullwidth');
    }

    this.deviceResize();
  }

  deviceResize() {
    this.articlePadding = $(this.articleInner).outerHeight() - $(this.articleInner).height();

    if (Adapt.device.screenSize === 'small' && this.disableOnMobile) {
      this.resetLayout();
    } else {
      this.updateLayout();
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

    $(this.articleInner).css('min-height', windowHeight - this.articlePadding);
    $(this.article).addClass('is-layout-cover');
  }

  setCustomHeight() {
    $(this.articleInner).css('min-height', this.customMinHeight);
  }

  resetLayout() {
    $(this.articleInner).css('min-height', '');
    $(this.article).removeClass('is-layout-cover');
  }
}
