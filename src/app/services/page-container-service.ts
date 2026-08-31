import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { NodeTree } from '../blocks';

const SAMPLE_NODE_TREE: NodeTree = [
  {
    id: 'root',
    type: 'Headline',
    parentId: null,
    content: {
      headline: 'Welcome to Our Website',
      text: 'This is an easy sample text for the headline.',
    },
    children: [],
  },
  {
    id: 'text',
    type: 'Card',
    parentId: null,
    content: {
      text: 'This is a sample text block. You can add more content here.',
    },
    children: []
  },
  {
    id: 'grid',
    type: 'Grid',
    parentId: null,
    content: {},
    children: [
      {
        id: 'card1',
        type: 'Card',
        parentId: 'grid',
        content: {
          text: 'Card 1 content goes here.',
        },
        children: [],
      },
      {
        id: 'card2',
        type: 'Card',
        parentId: 'grid',
        content: {
          text: 'Card 2 content goes here.',
        },
        children: [],
      },
    ],
  }
];

@Injectable({
  providedIn: 'root',
})
export class PageContainerService {
  private readonly nodeTreeState = signal<NodeTree>([]);

  public readonly nodeTree = this.nodeTreeState.asReadonly();

  constructor() {
    this.nodeTreeState.set(SAMPLE_NODE_TREE);

    const onMessage = (event: MessageEvent) => this.handleHostMessage(event);
    window.addEventListener('message', onMessage);
    inject(DestroyRef)
      .onDestroy(() => window.removeEventListener('message', onMessage));
  }

  private handleHostMessage(event: MessageEvent): void {
    this.nodeTreeState.set(event.data);
  }
}
