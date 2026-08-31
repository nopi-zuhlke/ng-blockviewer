import { Component, computed, signal } from '@angular/core';
import { registerBlockComponent } from '../block-registry';
import { BaseBlockComponent } from '../base-block.component';
import type { NodeType, TreeNode } from '../nodetype';

@Component({
  selector: 'app-carousel-block',
  templateUrl: './carousel-block.component.html',
})
export class CarouselBlockComponent extends BaseBlockComponent<TreeNode> {

  public readonly selectedIndex = signal(0);

  public readonly slides = computed(() => this.children() ?? []);

  public readonly currentSlide = computed(() => {
    const slides = this.slides();
    if (!slides.length) {
      return null;
    }

    const index = ((this.selectedIndex() % slides.length) + slides.length) % slides.length;
    return slides[index] ?? null;
  });

  public readonly carouselLabel = computed(() => {
    const slides = this.slides();
    return `Carousel (${slides.length} slides)`;
  });

  public override get type(): NodeType {
    return 'Carousel';
  }

  public getSlideTitle(slide: TreeNode | null): string {
    if (!slide) {
      return 'Slide';
    }

    const content = slide.content ?? {};
    const title = typeof content['title'] === 'string'
      ? content['title']
      : typeof content['heading'] === 'string'
        ? content['heading']
        : '';
    return title || `Slide ${this.slides().indexOf(slide) + 1}`;
  }

  public getSlideDescription(slide: TreeNode | null): string {
    if (!slide) {
      return '';
    }

    const content = slide.content ?? {};
    return typeof content['description'] === 'string'
      ? content['description']
      : typeof content['text'] === 'string'
        ? content['text']
        : typeof content['body'] === 'string'
          ? content['body']
          : '';
  }

  public nextSlide(): void {
    const slides = this.slides();
    if (!slides.length) {
      return;
    }

    this.selectedIndex.update((index) => (index + 1) % slides.length);
  }

  public previousSlide(): void {
    const slides = this.slides();
    if (!slides.length) {
      return;
    }

    this.selectedIndex.update((index) => (index - 1 + slides.length) % slides.length);
  }

  public goToSlide(index: number): void {
    const slides = this.slides();
    if (!slides.length || index < 0 || index >= slides.length) {
      return;
    }

    this.selectedIndex.set(index);
  }
}

registerBlockComponent(CarouselBlockComponent);
