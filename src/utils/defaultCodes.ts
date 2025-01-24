import { Code, TestCase } from "@/types";

interface ConstantCode {
  codes: Code[];
  testCases: TestCase[];
}
const constantCodes: ConstantCode[] = [
  {
    codes: [
      {
        languageId: 'javascript',
        code: `/**\n * Tests if the parentheses in an array of strings are balanced.\n *\n * @param {string[]} tests - An array of strings where each string contains parentheses to check.\n * @returns {boolean[]} - An array of booleans indicating whether the parentheses in each string are balanced.\n */\nfunction test(tests) {\n  return tests.map((test) => {\n    return areParenthesesBalanced(test);\n  });\n}\n\nfunction areParenthesesBalanced(s) {\n  const stack = new Stack();\n  const matchingPairs = {\n    ')': '(',\n    ']': '[',\n    '}': '{',\n  };\n\n  for (const char of s) {\n    if (['(', '[', '{'].includes(char)) {\n      stack.push(char);\n    } else if ([')', ']', '}'].includes(char)) {\n      if (stack.pop() !== matchingPairs[char]) {\n        return false;\n      }\n    }\n  }\n\n  return stack.isEmpty();\n}\n\nclass Stack {\n  constructor() {\n    this.top = null;\n    this.bottom = null;\n  }\n\n  isEmpty() {\n    return this.top === null;\n  }\n\n  push(data) {\n    const newNode = { data, next: null };\n    if (this.isEmpty()) {\n      this.top = newNode;\n      this.bottom = newNode;\n      return;\n    }\n    newNode.next = this.top;\n    this.top = newNode;\n  }\n\n  pop() {\n    if (this.isEmpty()) {\n      return null;\n    }\n    const data = this.top.data;\n    this.top = this.top.next;\n    if (this.top === null) {\n      this.bottom = null;\n    }\n    return data;\n  }\n\n  peek() {\n    if (this.isEmpty()) {\n      return null;\n    }\n    return this.top.data;\n  }\n\n  clear() {\n    this.top = null;\n    this.bottom = null;\n  }\n}`
      },
      {
        languageId: 'javascript',
        code: `/**\n * Evaluates if the parentheses in each string of the provided array are balanced.\n *\n * @param {string[]} tests - An array of strings to test for balanced parentheses.\n * @returns {boolean[]} - An array of boolean values indicating whether each string has balanced parentheses.\n */\nfunction test(tests) {\n  return tests.map((test) => {\n    return areParenthesesBalanced(test);\n  });\n}\n\nfunction areParenthesesBalanced(s) {\n  const stack = new Stack();\n  const matchingPairs = {\n    ')': '(',\n    ']': '[',\n    '}': '{',\n  };\n\n  for (const char of s) {\n    if (['(', '[', '{'].includes(char)) {\n      stack.push(char);\n    } else if ([')', ']', '}'].includes(char)) {\n      if (stack.isEmpty() || stack.pop() !== matchingPairs[char]) {\n        return false;\n      }\n    }\n  }\n\n  return stack.isEmpty();\n}\n\nclass Stack {\n  constructor() {\n    this.items = [];\n  }\n\n  push(item) {\n    this.items.push(item);\n  }\n\n  pop() {\n    if (this.isEmpty()) {\n      throw new Error("Stack is empty");\n    }\n    return this.items.pop();\n  }\n\n  peek() {\n    if (this.isEmpty()) {\n      throw new Error("Stack is empty");\n    }\n    return this.items[this.items.length - 1];\n  }\n\n  isEmpty() {\n    return this.items.length === 0;\n  }\n\n  clear() {\n    this.items = [];\n  }\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\nfunction test(tests: string[]){\n  return tests.map((test) => {\n    return areParenthesesBalanced(test)\n  });\n}\n\n// @ts-ignore\nfunction areParenthesesBalanced(s: string): boolean {\n  const stack = new Stack<string>();\n  const matchingPairs: { [key: string]: string } = {\n    ')': '(',\n    ']': '[',\n    '}': '{',\n  };\n\n  for (const char of s) {\n    if (['(', '[', '{'].includes(char)) {\n      stack.push(char);\n    } else if ([')', ']', '}'].includes(char)) {\n      if (stack.pop() !== matchingPairs[char]) {\n        return false;\n      }\n    }\n  }\n\n  return stack.isEmpty();\n}\n\n// @ts-ignore\ntype NodeSE<T> = {\n  data: T;\n  next: NodeSE<T> | null;\n};\n\n// @ts-ignore\nclass Stack<T> {\n  private top: NodeSE<T> | null;\n  private bottom: NodeSE<T> | null;\n\n  constructor() {\n    this.top = null;\n    this.bottom = null;\n  }\n\n  isEmpty(): boolean {\n    return this.top === null;\n  }\n\n  push(data: T): void {\n    const newNode: NodeSE<T> = { data, next: null };\n    if (this.isEmpty()) {\n      this.top = newNode;\n      this.bottom = newNode;\n      return;\n    }\n    newNode.next = this.top;\n    this.top = newNode;\n  }\n\n  pop(): T | null {\n    if (this.isEmpty()) {\n      return null;\n    }\n    const data = this.top!.data;\n    this.top = this.top!.next;\n    if (this.top === null) {\n      this.bottom = null;\n    }\n    return data;\n  }\n\n  peek(): T | null {\n    if (this.isEmpty()) {\n      return null;\n    }\n    return this.top!.data;\n  }\n\n  clear(): void {\n    this.top = null;\n    this.bottom = null;\n  }\n}`
      },
      {
        languageId: 'typescript',
        code: `\n// @ts-ignore\nfunction test(tests: string[]){\n  return tests.map((test) => {\n    return areParenthesesBalanced(test)\n  });\n}\n\n// @ts-ignore\nfunction areParenthesesBalanced(s: string): boolean {\n  const stack = new Stack<string>();\n  const matchingPairs: { [key: string]: string } = {\n    ')': '(',\n    ']': '[',\n    '}': '{',\n  };\n\n  for (const char of s) {\n    if (['(', '[', '{'].includes(char)) {\n      stack.push(char);\n    } else if ([')', ']', '}'].includes(char)) {\n      if (stack.isEmpty() || stack.pop() !== matchingPairs[char]) {\n        return false;\n      }\n    }\n  }\n\n  return stack.isEmpty();\n}\n\n\n// @ts-ignore\nclass Stack<T> {\n  #items: T[];\n\n  constructor() {\n    this.#items = [];\n  }\n\n  push(item: T): void {\n    this.#items.push(item);\n  }\n\n  pop(): T {\n    if (this.isEmpty()) {\n      throw new Error("Stack is empty");\n    }\n    return this.#items.pop() as T;\n  }\n\n  peek(): T {\n    if (this.isEmpty()) {\n      throw new Error("Stack is empty");\n    }\n    return this.#items[this.#items.length - 1];\n  }\n\n  isEmpty(): boolean {\n    return this.#items.length === 0;\n  }\n\n  clear(): void {\n    this.#items = [];\n  }\n}`
      }
    ],
    testCases: [
      {
        id: '1637655295892',
        title: 'Test Case',
        testCase: `test(['()']);`
      },
      {
        id: '1637655295893',
        title: 'Test Case',
        testCase: `test(['()(((()))())), ()((()))()))())', '((()))())())))()))','((())))(()))','{{}}}[]]][]]()))','{{([])}}','{[()}}']);`
      },
      {
        id: '1637655295894',
        title: 'Test Case',
        testCase: `test(['()((())))())))','())((((())))())','())((())))))']);`
      },
      {
        id: '1637655295895',
        title: 'Test Case',
        testCase: `test(["()()((((()))[][]]((", "()()))(())()()))", "()()(())", "()((()()))()))()", "()))())())))"]);`
      },
    ]
  },
  {
    codes: [
      {
        languageId: 'javascript',
        code:  `/**\n * Performs a breadth-first search (BFS) on a graph to determine if a path exists between two nodes.\n *\n * @param {Record<string, string[]>} adjacencyList - The adjacency list representing the graph. \n *        Keys are node identifiers, and values are arrays of neighboring node identifiers.\n * @param {string} startNode - The node where the search begins.\n * @param {string} targetNode - The node being searched for.\n * @returns {boolean} - Returns true if a path exists from startNode to targetNode, otherwise false.\n */\nfunction search(adjacencyList, startNode, targetNode) {\n  const queue = [];\n  const visited = new Set();\n  queue.push(startNode);\n  visited.add(startNode);\n\n  while (queue.length > 0) {\n    const currentNode = queue.shift();\n\n    if (currentNode === targetNode) {\n      return true;\n    }\n\n    const neighbors = adjacencyList[currentNode] || [];\n\n    for (const neighbor of neighbors) {\n      if (!visited.has(neighbor)) {\n        queue.push(neighbor);\n        visited.add(neighbor);\n      }\n    }\n  }\n\n  return false;\n}`
      },
      {
        languageId: 'javascript',
        code: `/**\n * Performs a depth-first search (DFS) on a graph to determine if a path exists between two nodes.\n *\n * @param {Record<string, string[]>} adjacencyList - The adjacency list representing the graph. \n *        Keys are node identifiers, and values are arrays of neighboring node identifiers.\n * @param {string} startNode - The node where the search begins.\n * @param {string} targetNode - The node being searched for.\n * @returns {boolean} - Returns true if a path exists from startNode to targetNode, otherwise false.\n */\nfunction search(adjacencyList, startNode, targetNode) {\n  const visited = new Set();\n\n  function dfs(node) {\n    if (node === targetNode) {\n      return true;\n    }\n\n    visited.add(node);\n\n    const neighbors = adjacencyList[node] || [];\n    for (const neighbor of neighbors) {\n      if (!visited.has(neighbor)) {\n        if (dfs(neighbor)) {\n          return true;\n        }\n      }\n    }\n\n    return false;\n  }\n\n  return dfs(startNode);\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\nfunction search(\n  adjacencyList: Record<string, string[]>,\n  startNode: string,\n  targetNode: string\n): boolean {\n  const queue: string[] = [];\n  const visited: Set<string> = new Set();\n\n  queue.push(startNode);\n  visited.add(startNode);\n\n  while (queue.length > 0) {\n    const currentNode = queue.shift() as string;\n\n    if (currentNode === targetNode) {\n      return true;\n    }\n\n    const neighbors: string[] = adjacencyList[currentNode] || [];\n\n    for (const neighbor of neighbors) {\n      if (!visited.has(neighbor)) {\n        queue.push(neighbor);\n        visited.add(neighbor);\n      }\n    }\n  }\n\n  return false;\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\nfunction search(\n  adjacencyList: Record<string, string[]>,\n  startNode: string,\n  targetNode: string\n): boolean {\n  const visited: Set<string> = new Set();\n\n  function dfs(node: string): boolean {\n    if (node === targetNode) {\n      return true;\n    }\n\n    visited.add(node);\n\n    const neighbors: string[] = adjacencyList[node] || [];\n    for (const neighbor of neighbors) {\n      if (!visited.has(neighbor)) {\n        if (dfs(neighbor)) {\n          return true;\n        }\n      }\n    }\n\n    return false;\n  }\n\n  return dfs(startNode);\n}`
      }
    ],
    testCases: [
      {
        id: '1637655305890',
        title: 'Test Case',
        testCase: `search({ \n  A: ['B', 'C'], B: ['D', 'E'], \n  C: ['F'], D: [], E: ['F'],\n  F: [], \n}, 'A', 'F');`
      },
      {
        id: '1637655305891',
        title: 'Test Case',
        testCase: `search({\n  A: ['B', 'C'], B: ['D', 'E'],\n  C: ['F'], D: [], E: ['F'],\n  F: [],\n}, 'A', 'G');`
      },
      {
        id: '1637655305892',
        title: 'Test Case',
        testCase: `search({\n  1: [2, 3, 4], 2: [5, 6],\n  3: [7], 4: [8, 9], 5: [],\n  6: [10], 7: [11, 12],\n  8: [], 9: [13], 10: [],\n  11: [], 12: [], 13: []\n}, 1, 13);`
      }
    ]
  },
  {
    codes: [
      {
        languageId: 'javascript',
        code: `/**\n * Finds all occurrences of a pattern in a given text using the Z-algorithm.\n *\n * @param {string} pattern - The pattern to search for.\n * @param {string} text - The text in which to search for the pattern.\n * @returns {number[]} - An array of starting indices where the pattern is found in the text.\n */\nfunction search(pattern, text) {\n  function calculateZ(concat) {\n    const Z = new Array(concat.length).fill(0);\n    let L = 0, R = 0;\n\n    for (let i = 1; i < concat.length; i++) {\n      if (i <= R) {\n        Z[i] = Math.min(R - i + 1, Z[i - L]);\n      }\n      while (i + Z[i] < concat.length && concat[Z[i]] === concat[i + Z[i]]) {\n        Z[i]++;\n      }\n      if (i + Z[i] - 1 > R) {\n        L = i;\n        R = i + Z[i] - 1;\n      }\n    }\n\n    return Z;\n  }\n\n  const concat = pattern + "$" + text;\n  const Z = calculateZ(concat);\n\n  const occurrences = [];\n  for (let i = pattern.length + 1; i < Z.length; i++) {\n    if (Z[i] === pattern.length) {\n      occurrences.push(i - pattern.length - 1); \n    }\n  }\n\n  return occurrences;\n}`
      },
      {
        languageId: 'javascript',
        code: `/**\n * Finds all occurrences of a pattern in a given text using a brute-force approach.\n *\n * @param {string} pattern - The pattern to search for.\n * @param {string} text - The text in which to search for the pattern.\n * @returns {number[]} - An array of starting indices where the pattern is found in the text.\n */\nfunction search(pattern, text) {\n  const occurrences = [];\n\n  for (let i = 0; i <= text.length - pattern.length; i++) {\n    let match = true;\n    for (let j = 0; j < pattern.length; j++) {\n      if (text[i + j] !== pattern[j]) {\n        match = false;\n        break;\n      }\n    }\n    if (match) {\n      occurrences.push(i);\n    }\n  }\n\n  return occurrences;\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\nfunction search(pattern: string, text: string): number[] {\n  function calculateZ(concat: string): number[] {\n    const Z: number[] = new Array(concat.length).fill(0);\n    let L = 0, R = 0;\n\n    for (let i = 1; i < concat.length; i++) {\n      if (i <= R) {\n        Z[i] = Math.min(R - i + 1, Z[i - L]);\n      }\n      while (i + Z[i] < concat.length && concat[Z[i]] === concat[i + Z[i]]) {\n        Z[i]++;\n      }\n      if (i + Z[i] - 1 > R) {\n        L = i;\n        R = i + Z[i] - 1;\n      }\n    }\n\n    return Z;\n  }\n\n  const concat = pattern + "$" + text;\n  const Z = calculateZ(concat);\n\n  const occurrences: number[] = [];\n  for (let i = pattern.length + 1; i < Z.length; i++) {\n    if (Z[i] === pattern.length) {\n      occurrences.push(i - pattern.length - 1); \n    }\n  }\n\n  return occurrences;\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\nfunction search(pattern: string, text: string): number[] {\n  const occurrences: number[] = [];\n\n  for (let i = 0; i <= text.length - pattern.length; i++) {\n    let match = true;\n    for (let j = 0; j < pattern.length; j++) {\n      if (text[i + j] !== pattern[j]) {\n        match = false;\n        break;\n      }\n    }\n    if (match) {\n      occurrences.push(i);\n    }\n  }\n\n  return occurrences;\n}`
      }
    ],
    testCases: [
      {
        id: '1637655325784',
        title: 'Test Case',
        testCase: `search('abab', 'ababcabcabababd');`
      },
      {
        id: '1637655325785',
        title: 'Test Case',
        testCase: `search('jodemvel', 'aasd2asdtsgfgrresababjodemvelcabcabababd');`
      },
      {
        id: '1637655325786',
        title: 'Test Case',
        testCase: `search('xd', "a".repeat(1000000) + "xd" + "b".repeat(1000000));`
      }
    ]
  },
  {
    codes: [
      {
        languageId: 'javascript',
        code: `/**\n * Determines if a given number is a prime number.\n *\n * @param {number} num - The number to check for primality.\n * @returns {boolean} - Returns true if the number is prime, otherwise false.\n */\nfunction isPrime(num) {\n  if (num <= 1) return false;\n  for (let i = 2; i < num; i++) {\n    if (num % i === 0) return false;\n  }\n  return true;\n}`
      },
      {
        languageId: 'javascript',
        code: `/**\n * Determines if a given number is a prime number.\n *\n * @param {number} num - The number to check for primality.\n * @returns {boolean} - Returns true if the number is prime, otherwise false.\n */\nfunction isPrime(num) {\n  if (num <= 1) return false;\n  if (num <= 3) return true;\n  if (num % 2 === 0 || num % 3 === 0) return false;\n  for (let i = 5; i * i <= num; i += 6) {\n    if (num % i === 0 || num % (i + 2) === 0) return false;\n  }\n  return true;\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\nfunction isPrime(num: number): boolean {\n  if (num <= 1) return false;\n  for (let i = 2; i < num; i++) {\n    if (num % i === 0) return false;\n  }\n  return true;\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\nfunction isPrime(num: number): boolean {\n  if (num <= 1) return false;\n  if (num <= 3) return true;\n  if (num % 2 === 0 || num % 3 === 0) return false;\n  for (let i = 5; i * i <= num; i += 6) {\n    if (num % i === 0 || num % (i + 2) === 0) return false;\n  }\n  return true;\n}`
      },
    ],
    testCases: [
      {
        id: '1637655846734',
        title: 'Test Case',
        testCase: `isPrime(2);`
      },
      {
        id: '1637655846735',
        title: 'Test Case',
        testCase: `isPrime(654233);`
      },
      {
        id: '1637655846736',
        title: 'Test Case',
        testCase: `isPrime(54209);`
      },
      {
        id: '1637655846737',
        title: 'Test Case',
        testCase: `isPrime(653);`
      },
      {
        id: '1637655846738',
        title: 'Test Case',
        testCase: `isPrime(11);`
      }
    ]
  },
  {
    codes: [
      {
        languageId: 'javascript',
        code: `/**\n * Calculates the shortest distance between two nodes in a weighted graph using Dijkstra's algorithm.\n *\n * @param {Record<string, [string, number][]>} adjList - The adjacency list representing the graph. \n *        Keys are node identifiers, and values are arrays of tuples where each tuple contains a neighboring node and the weight of the edge.\n * @param {string} start - The starting node.\n * @param {string} end - The target node.\n * @returns {number} - The shortest distance from start to end, or -1 if no path exists.\n */\nfunction dist(adjList, start, end) {\n  const distances = {};\n  const visited = new Set();\n  const priorityQueue = [];\n\n  for (const node in adjList) {\n    distances[node] = Infinity;\n  }\n  distances[start] = 0;\n\n  priorityQueue.push({ node: start, distance: 0 });\n\n  while (priorityQueue.length > 0) {\n    priorityQueue.sort((a, b) => a.distance - b.distance);\n    const { node: currentNode, distance: currentDistance } = priorityQueue.shift();\n\n    if (visited.has(currentNode)) continue;\n    visited.add(currentNode);\n\n    if (currentNode === end) {\n      return currentDistance;\n    }\n\n    for (const [neighbor, weight] of adjList[currentNode]) {\n      const newDistance = currentDistance + weight;\n      if (newDistance < distances[neighbor]) {\n        distances[neighbor] = newDistance;\n        priorityQueue.push({ node: neighbor, distance: newDistance });\n      }\n    }\n  }\n\n  return distances[end] === Infinity ? -1 : distances[end];\n}`},
      {
        languageId: 'javascript',
        code: `/**\n * Calculates the shortest distance between two nodes in a weighted graph using the Floyd-Warshall algorithm.\n *\n * @param {Record<string, [string, number][]>} adjList - The adjacency list representing the graph. \n *        Keys are node identifiers, and values are arrays of tuples where each tuple contains a neighboring node and the weight of the edge.\n * @param {string} start - The starting node.\n * @param {string} end - The target node.\n * @returns {number} - The shortest distance from start to end, or -1 if no path exists.\n */\nfunction dist(adjList, start, end) {\n  const nodes = Object.keys(adjList);\n  const distances = {};\n\n  for (const node of nodes) {\n    distances[node] = {};\n    for (const otherNode of nodes) {\n      distances[node][otherNode] = node === otherNode ? 0 : Infinity;\n    }\n  }\n\n  for (const node in adjList) {\n    for (const [neighbor, weight] of adjList[node]) {\n      distances[node][neighbor] = weight;\n    }\n  }\n\n  for (const k of nodes) {\n    for (const i of nodes) {\n      for (const j of nodes) {\n        distances[i][j] = Math.min(\n          distances[i][j],\n          distances[i][k] + distances[k][j]\n        );\n      }\n    }\n  }\n\n  return distances[start][end] === Infinity ? -1 : distances[start][end];\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\ntype AdjacencyList = {\n  [node: string]: [string, number][];\n};\n\n// @ts-ignore\nfunction dist(adjList: AdjacencyList, start: string, end: string): number {\n  const distances: { [node: string]: number } = {};\n  const visited = new Set<string>();\n  const priorityQueue: { node: string; distance: number }[] = [];\n\n  for (const node in adjList) {\n    distances[node] = Infinity;\n  }\n  distances[start] = 0;\n\n  priorityQueue.push({ node: start, distance: 0 });\n\n  while (priorityQueue.length > 0) {\n    priorityQueue.sort((a, b) => a.distance - b.distance);\n    const { node: currentNode, distance: currentDistance } = priorityQueue.shift()!;\n\n    if (visited.has(currentNode)) continue;\n    visited.add(currentNode);\n\n    if (currentNode === end) {\n      return currentDistance;\n    }\n\n    for (const [neighbor, weight] of adjList[currentNode]) {\n      const newDistance = currentDistance + weight;\n      if (newDistance < distances[neighbor]) {\n        distances[neighbor] = newDistance;\n        priorityQueue.push({ node: neighbor, distance: newDistance });\n      }\n    }\n  }\n\n  return distances[end] === Infinity ? -1 : distances[end];\n}`
      },
      {
        languageId: 'typescript',
        code: `// @ts-ignore\ntype AdjacencyList = {\n  [node: string]: [string, number][];\n};\n\n// @ts-ignore\nfunction dist(adjList: AdjacencyList, start: string, end: string): number {\n  const nodes = Object.keys(adjList);\n  const distances: { [node: string]: { [node: string]: number } } = {};\n\n  for (const node of nodes) {\n    distances[node] = {};\n    for (const otherNode of nodes) {\n      distances[node][otherNode] = node === otherNode ? 0 : Infinity;\n    }\n  }\n\n  for (const node in adjList) {\n    for (const [neighbor, weight] of adjList[node]) {\n      distances[node][neighbor] = weight;\n    }\n  }\n\n  for (const k of nodes) {\n    for (const i of nodes) {\n      for (const j of nodes) {\n        distances[i][j] = Math.min(\n          distances[i][j],\n          distances[i][k] + distances[k][j]\n        );\n      }\n    }\n  }\n\n  return distances[start][end] === Infinity ? -1 : distances[start][end];\n}`
      }
    ],
    testCases: [
      {
        id: '1637663764892',
        title: 'Test Case',
        testCase: `dist({\n  A: [['B', 1], ['C', 4]],\n  B: [['A', 1], ['C', 2], ['D', 6]],\n  C: [['A', 4], ['B', 2], ['D', 3]],\n  D: [['B', 6], ['C', 3]]\n}, 'A', 'D');`
      },
      {
        id: '1637663764893',
        title: 'Test Case',
        testCase: `dist({\n  A: [['B', 1], ['C', 4]],\n  B: [['A', 1], ['C', 2], ['D', 6]],\n  C: [['A', 4], ['B', 2], ['D', 3]],\n  D: [['B', 6], ['C', 3]]\n}, 'A', 'C');`
      },
      {
        id: '1637663764894',
        title: 'Test Case',
        testCase: `dist({\n  A: [['B', 5], ['C', 2]],\n  B: [['A', 5], ['C', 1], ['D', 2]],\n  C: [['A', 2], ['B', 1], ['D', 3]],\n  D: [['B', 2], ['C', 3]]\n}, 'A', 'D');`
      }
    ]
  }
];

export const getDefaultRandomCodes = (languageId: string): {selectedCodes: string[], testCases: TestCase[]} => {
  const randomIndex = Math.floor(Math.random() * constantCodes.length);
  const selectedCodes: string[] = 
    constantCodes[randomIndex].codes
      .filter((code) => code.languageId === languageId)
      .map((code) => code.code);
  const testCases: TestCase[] = constantCodes[randomIndex].testCases;

  return { selectedCodes, testCases };
}