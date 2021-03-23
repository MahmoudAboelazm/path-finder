// class Tree {
//   constructor() {
//     this.root = null;
//   }
// }
// class Node {
//   constructor(val) {
//     this.value = val;
//     this.right = null;
//     this.left = null;
//   }
// }

// Tree.prototype.addNode = function (val) {
//   let n = new Node(val);
//   if (this.root === null) {
//     this.root = n;
//   } else {
//     this.root.addNode(n);
//   }
// };
// Tree.prototype.traverse = function () {
//   this.root.visit();
// };

// Node.prototype.visit = function () {
//   if (this.right != null) {
//     this.right.visit();
//   }
//   console.log(this.value);
//   if (this.left != null) {
//     this.left.visit();
//   }
// };

// Node.prototype.addNode = function (val) {
//   if (val.value > this.value) {
//     if (this.left === null) {
//       this.left = val;
//     } else {
//       this.left.addNode(val);
//     }
//   } else if (val.value < this.value) {
//     if (this.right === null) {
//       this.right = val;
//     } else {
//       this.right.addNode(val);
//     }
//   }
// };
// const excute = () => {
//   let tree = new Tree();
//   for (let i = 0; i < 10; i++) {
//     tree.addNode(Math.ceil(Math.random() * 20));
//   }
//   tree.traverse();
//   console.log(tree);
// };
