import Adapt from 'core/js/adapt';
import LayoutMenuView from './layout-menuView';
import LayoutArticleView from './layout-articleView';
import LayoutBlockView from './layout-blockView';
import LayoutComponentView from './layout-componentView';
import LayoutIconView from './layout-iconView';

class Layout extends Backbone.Controller {

  initialize() {
    this.listenToOnce(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    if (Adapt.course.get('_layoutExtension') && Adapt.course.get('_layoutExtension')._isEnabled) {
      this.setupLayout();
    }
  }

  setupLayout() {
    this.listenTo(Adapt, {
      'menuView:postRender': this.onMenuReady,
      'articleView:postRender': this.onArticleReady,
      'blockView:postRender': this.onBlockReady,
      'componentView:postRender': this.onComponentReady
    });
  }

  onMenuReady(view) {
    if (Adapt.course.get('_layoutExtension')._fullHeightEnabled || Adapt.course.get('_layoutExtension')._customHeight._isEnabled) {
      new LayoutMenuView({model:view.model});
    }
  }

  onArticleReady(view) {
    if (Adapt.course.get('_layoutExtension')._fullHeightEnabled || Adapt.course.get('_layoutExtension')._customHeight._isEnabled) {
      new LayoutArticleView({model:view.model});
    }
  }

  onBlockReady(view) {
    if (Adapt.course.get('_layoutExtension')._fullHeightEnabled || Adapt.course.get('_layoutExtension')._customHeight._isEnabled) {
      new LayoutBlockView({model:view.model});
    }
  }

  onComponentReady(view) {
    if (view.model && view.model.get('_layoutExtension') && view.model.get('_layoutExtension')._isEnabled) {
      new LayoutComponentView({model:view.model});

      if (view.model.get('_layoutExtension')._icon && view.model.get('_layoutExtension')._icon._isEnabled) {
        new LayoutIconView({model:view.model});
      }
    }
  }
}

export default Adapt.layout = new Layout();
