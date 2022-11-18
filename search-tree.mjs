const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) { return }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

function mergeSort (array) {
  if (array.length < 2) { return array }
  let middle = Math.ceil(array.length / 2)
  let leftHalf = mergeSort(array.slice(0, middle))
  let rightHalf = mergeSort(array.slice(middle))
  return merge(leftHalf, rightHalf)
}
function merge (arrayOne, arrayTwo) {
  let mergedArray = []
  while (arrayOne[0] && arrayTwo[0]) {
    if (arrayOne[0][0] < arrayTwo[0][0]) {
    mergedArray.push(arrayOne.shift())
    } else {
      mergedArray.push(arrayTwo.shift())
    }
  }
  while (arrayOne[0] || arrayTwo[0]) {
    if (arrayOne[0]) { mergedArray.push(arrayOne.shift()) }
    if (arrayTwo[0]) { mergedArray.push(arrayTwo.shift()) }
  }
  return mergedArray
}

function randomArrayGenerator () {
  let randomLength = Math.ceil(Math.random() * 25)
  let randomArray = []
  for (let i = 0; i < randomLength; i++) {
    let randomNuber = Math.ceil(Math.random() * 100)
    randomArray.push(randomNuber)
  }
  return randomArray
}


class Node {
  constructor (data) {
    this.data = data
    this.left = null
    this.right = null
  }
  setLeftChild (leftChild) {
    this.left = leftChild
  }
  setRightChild (rightChild) {
    this.right = rightChild
  }
}

class Tree {
  constructor (array) {
    this.dataArray = mergeSort(array)
    this.root = this.buildTree(this.dataArray)
  }
  buildTree (array) {
    if (!array.length) { return null }
    let mid = Math.floor(array.length / 2)
    let treeNode = new Node(array[mid])
    treeNode.setLeftChild(this.buildTree(array.slice(0, mid)))
    treeNode.setRightChild(this.buildTree(array.slice(mid + 1)))
    return treeNode
  }
  insert (value, root = this.root) {
    if (root === null) { return new Node (value) }
    if (root.data === value) {
      console.log('value already in tree')
      return root
    }
    if (value > root.data) { root.right = this.insert(value, root.right) }
    if (value < root.data) { root.left = this.insert(value, root.left) }
    return root
  }
  delete (value, root = this.root) {
    if (!root) {
      console.log('value not present')
      return null
    }
    if (value < root.data) root.left = this.delete(value, root.left)
    if (value > root.data) root.right = this.delete(value, root.right)
    if (root.data === value) {
      if (!root.left && !root.right) { return null }
      if (!root.left) { return root = root.right }
      if (!root.right) { return root = root.left }
      let nextNode = root.right
      while (nextNode.left) {
        nextNode = nextNode.left
      }
      root.data = nextNode.data
      root.right = this.delete(root.data, root.right)
    }
    return root
  }
  find (value, root = this.root) {
    if (!root) {
      console.log('value not present')
      return null
    } else if (root.data === value) {
      return root
    } else if (value < root.data) {
      return this.find(value, root.left)
    } else if (value > root.data) {
      return this.find(value, root.right)
    }
  }
  levelOrder (someFunction, root = this.root) {
    const queue = [root]
    const dataArray = []
    // levelOrderIterative()
    levelOrderRecursive()
    if (!someFunction) { return dataArray }

    function levelOrderIterative () {
      while (queue.length) {
        if (queue[0].left) { queue.push(queue[0].left) }
        if (queue[0].right) { queue.push(queue[0].right) }
        if (someFunction) { someFunction(queue[0]) }
        dataArray.push(queue[0].data)
        queue.shift()
      }
    }
    function levelOrderRecursive () {
      let queueLength = queue.length
      if (!queueLength) { return }
      for (let i = 0; i < queueLength; i++) {
        if (queue[0].left) { queue.push(queue[0].left) }
        if (queue[0].right) { queue.push(queue[0].right) }
        if (someFunction) { someFunction(queue[0]) }
        dataArray.push(queue.shift().data)
      }
      levelOrderRecursive()
    }
  }
  inOrder (someFunction, root = this.root) {
    let dataArray = []
    if (root.left) {
      dataArray = dataArray.concat(this.inOrder(someFunction, root.left))
    }
    if (someFunction) { someFunction(root) }
    dataArray.push(root.data)
    if (root.right) {
      dataArray = dataArray.concat(this.inOrder(someFunction, root.right))
    }
    return dataArray
  }
  preOrder (someFunction, root = this.root) {
    let dataArray = []
    if (someFunction) { someFunction(root) }
    dataArray.push(root.data)
    if (root.left) {
      dataArray = dataArray.concat(this.preOrder(someFunction, root.left))
    }
    if (root.right) {
      dataArray = dataArray.concat(this.preOrder(someFunction, root.right))
    }
    return dataArray
  }
  postOrder (someFunction, root = this.root) {
    let dataArray = []
    if (root.left) {
      dataArray = dataArray.concat(this.postOrder(someFunction, root.left))
    }
    if (root.right) {
      dataArray = dataArray.concat(this.postOrder(someFunction, root.right))
    }
    if (someFunction) { someFunction(root) }
    dataArray.push(root.data)
    return dataArray
  }
  height (node, nodeHeight = 0) {
    if (!node) { return nodeHeight - 1 }
    let leftHeight = this.height(node.left, nodeHeight + 1)
    let rightHeight = this.height(node.right, nodeHeight + 1)
    if (leftHeight > rightHeight) {
      return leftHeight
    } else {
      return rightHeight
    }
  }
  depth (node, nodeDepth = 0, root = this.root) {
    if (node === root) {
      return nodeDepth
    }
    if (node.data < root.data) {
      nodeDepth = this.depth(node, nodeDepth + 1, root.left)
    } else {
      nodeDepth = this.depth(node, nodeDepth + 1, root.right)
    }
    return nodeDepth
  }
  isBalanced (root = this.root) {
    let isLeftBalanced = true
    let isRightBalanced = true
    if (root.left) { isLeftBalanced = this.isBalanced(root.left) }
    if (root.right) { isRightBalanced = this.isBalanced(root.right) }
    if (!isLeftBalanced || !isRightBalanced) {
      return false
    }

    let difference = this.height(root.left) - this.height(root.right)
    if (difference >= -1 && difference <= 1) {
      return true
    } else {
      return false
    }
  }
  rebalance () {
    let sortedArray = this.inOrder()
    this.root = this.buildTree(sortedArray)
  }
}