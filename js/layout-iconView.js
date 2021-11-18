import Adapt from 'core/js/adapt';

export default class LayoutIconView extends Backbone.View {

  className() {
    return 'layout__icon';
  }

  initialize() {
    this.listenTo(Adapt, {
      'remove': this.remove
    });

    this.render();
  }

  render() {
    const data = this.model.toJSON();
    const template = Handlebars.templates['layoutIcon'];

    this.id = this.model.get('_id');

    $(this.el).html(template(data)).prependTo('.' + this.id + ' > .component__inner' + ' > .component__header' + ' > .component__header-inner' + ' > .component__body');

    $('.' + this.id).addClass('is-layout-icon');
  }
}
