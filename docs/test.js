const mdx = require('@mdx-js/mdx');
const fs = require('fs');
const path = require('path');
const inspect = require('unist-util-inspect');
const visit = require('unist-util-visit-parents');

// const testFile = path.resolve(__dirname, './pages/versions/latest/sdk/notifications.md');
const testFile = path.resolve(__dirname, './pages/index.md');
const testContent = fs.readFileSync(testFile, 'utf-8');

const compiler = mdx.createCompiler({
  remarkPlugins: [[require('remark-frontmatter'), ['yaml']]],
});

const tree = compiler.parse(testContent);

visit(tree, 'heading', (node, ancestors) => {
  console.log(ancestors.find(node => node.type === 'heading'));
  console.log(node.depth, getText(node));
});

function getText(node) {
  return node.children.map(node => node.value).join();
}

console.log(inspect(tree));
