import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert images with title text into figure/figcaption
 * Usage: ![alt text](url "caption text")
 */
export function remarkImageCaption() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      // Check if paragraph contains only an image
      if (node.children.length !== 1 || node.children[0].type !== 'image') {
        return;
      }

      const image = node.children[0];
      
      // If image has a title (used as caption), wrap it in a figure
      if (image.title) {
        const figure = {
          type: 'html',
          value: `<figure>
  <img src="${image.url}" alt="${image.alt || ''}" />
  <figcaption class="caption">${image.title}</figcaption>
</figure>`
        };
        
        parent.children[index] = figure;
      }
    });
  };
}
