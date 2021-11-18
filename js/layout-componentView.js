import Adapt from 'core/js/adapt';

export default class LayoutComponentView extends Backbone.View {

  initialize() {
    this.listenTo(Adapt, {
      'remove': this.remove,
      'device:changed': this.checkState
    });

    this.render();
  }

  render() {
    this.id = this.model.get('_id');
    this.hideOn = this.model.get('_layoutExtension')._hideOn;

    if (this.hideOn) {
      this.hideOnSizes = [];
      this.hideOnSizes = this.hideOn.split(' ');

      this.checkState();
    }
  }

  checkState() {
    if (!this.hideOn) return;

    for (let i = 0; i < this.hideOnSizes.length; i++) {
      if (Adapt.device.screenSize == this.hideOnSizes[i]) {
      	this.model.set('_isAvailable', false);
      	$('.' + this.id).addClass('display-none');
      } else {
      	this.model.set('_isAvailable', true);
      	$('.' + this.id).removeClass('display-none');
      }
    }

    Adapt.trigger('pageLevelProgress:update');
  }
}
