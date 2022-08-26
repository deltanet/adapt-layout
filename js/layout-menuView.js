import Adapt from 'core/js/adapt';
import device from 'core/js/device';

export default class LayoutMenuView extends Backbone.View {

  initialize() {
    this.listenTo(Adapt, {
      'remove': this.remove,
      'device:changed device:resize': this.deviceResize,
      'menuView:ready': this.render
    });
  }

  render() {
    // Collect config settings
    this.disableOnMobile = Adapt.course.get('_layoutExtension')._disableOnMobile;
    this.fullHeightEnabled = Adapt.course.get('_layoutExtension')._fullHeightEnabled;
    this.customHeightEnabled = Adapt.course.get('_layoutExtension')._customHeight._isEnabled;
    this.customMinHeight = Adapt.course.get('_layoutExtension')._customHeight._minHeight;

    this.menu = $('.menu');

    this.deviceResize();
  }

  deviceResize() {
    if (device.screenSize === 'small' && this.disableOnMobile) {
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

    $(this.menu).addClass('is-layout-cover').css('min-height', windowHeight);
  }

  setCustomHeight() {
    $(this.menu).css('min-height', this.customMinHeight);
  }

  resetLayout() {
    $(this.menu).removeClass('is-layout-cover').css('min-height', '');
  }
}
