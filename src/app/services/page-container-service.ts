import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeTree, TreeNode } from '../blocks';
import { BACKEND_BASE_URL } from '../app.config';

interface PageResponse {
  blocks?: Omit<TreeNode, 'children'>[];
}

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
    const editMode = inject(ActivatedRoute).snapshot.queryParamMap.has('editMode');
    if (editMode) {
      this.setUpMessageConfiguration();
    } else if (this.getPageName()) {
      this.fetchRemoteNodeTree();
    } else {
      this.nodeTreeState.set(SAMPLE_NODE_TREE);
    }
  }

  private fetchRemoteNodeTree(): void {
    fetch(`${BACKEND_BASE_URL}/api/content/v1/pages/${this.getPageName()}`)
      .then((response) => response.json())
      .then((page: PageResponse) => {
        this.nodeTreeState.set(this.buildNodeTree(page.blocks ?? []));
      });
  }

  private buildNodeTree(blocks: Omit<TreeNode, 'children'>[]): NodeTree {
    const nodes: TreeNode[] = blocks.map((block) => ({ ...block, children: [] }));
    const nodesById = new Map(nodes.map((node) => [node.id, node]));
    const roots: TreeNode[] = [];
    for (const node of nodes) {
      const parent = node.parentId ? nodesById.get(node.parentId) : undefined;
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  private getPageName(): string {
    return window.location.pathname.replace(/^\//, '');
  }

  private setUpMessageConfiguration() {
    const onMessage = (event: MessageEvent) => this.handleHostMessage(event);
    window.addEventListener('message', onMessage);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('message', onMessage));
  }

  private handleHostMessage(event: MessageEvent): void {
    this.nodeTreeState.set(event.data);
  }
}
