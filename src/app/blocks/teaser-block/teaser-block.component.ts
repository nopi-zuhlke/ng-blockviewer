import { Component, computed } from '@angular/core';
import { registerBlockComponent } from '../block-registry';
import { BaseBlockComponent } from '../base-block.component';
import type { NodeType, TreeNode } from '../nodetype';

@Component({
  selector: 'app-teaser-block',
  templateUrl: './teaser-block.component.html',
})
export class TeaserBlockComponent extends BaseBlockComponent<TreeNode> {

  public override get type(): NodeType {
    return 'Teaser';
  }

  public readonly teaserTitle = computed(() =>
    this.getStringContent('headline', this.getStringContent('title', 'Teaser')),
  );

  public readonly teaserSubtitle = computed(() =>
    this.getStringContent(
      'subtitle',
      this.getStringContent('subheading', this.getStringContent('text', '')),
    ),
  );

  public readonly imageUrl = computed(() =>
    this.getStringContent(
      'imageUrl',
      this.getStringContent('image', this.getStringContent('imageSrc', '')),
    ),
  );
}

registerBlockComponent(TeaserBlockComponent);
