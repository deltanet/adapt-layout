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

    this.$el.imageready(this.setLayout.bind(this));
  }

  setLayout() {
    const width = $(this.el).outerWidth();
    const height = $(this.el).outerHeight();

    if (Adapt.config.get('_defaultDirection') === 'ltr') {
      const direction = 'left';
    } else {
      const direction = 'right';
    }

    $('.' + this.id).find('.component__body-inner').css('margin-'+direction, width);
    $('.' + this.id).find('.component__instruction-inner').css('margin-'+direction, width);
    $('.' + this.id).find('.component__body-inner').css('min-height', height);
  }
}
