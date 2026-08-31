import { Component, computed } from '@angular/core';
import { registerBlockComponent } from '../block-registry';
import { BaseBlockComponent } from '../base-block.component';
import type { NodeType } from '../nodetype';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
})
export class CardBlockComponent extends BaseBlockComponent {

  public readonly cardTitle = computed(() =>
    this.getStringContent('title', this.getStringContent('heading', 'Card')),
  );

  public readonly cardDescription = computed(() =>
    this.getStringContent(
      'description',
      this.getStringContent('text', this.getStringContent('body', '')),
    ),
  );

  public override get type(): NodeType {
    return 'Card';
  }
}

registerBlockComponent(CardBlockComponent);
