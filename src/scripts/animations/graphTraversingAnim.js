import { SearchTree } from '../graph.js';
import { clear, drawDirectionalEdgeAnim, drawVertex } from '../graphView.js';

/**
 * Animates through the search results of a Graph.dfs()
 * 
 * @param {*} searchTree the SearchTree object returned from a Graph.dfs() or Graph.bfs().
 */
async function depthFirstAnim (searchTree) {
    if (!searchTree instanceof SearchTree) {
        throw new TypeError("Only displays results from a SearchTree class, returned from a Graph.dfs or Graph.bfs");
    }

    let parents = searchTree.getParents();
    for (let vertex in parents) {
        await drawDirectionalEdgeAnim(JSON.parse(parents[vertex]), JSON.parse(vertex), true, .93);
    }
}

/**
 * Uses a Map to animate searching by level simultaneously, which helps visualize the algorithm.
 * 
 * @param {*} searchTree the SearchTree object returned from a Graph.dfs() or Graph.bfs().
 */
async function breadthFirstAnim (searchTree) {
    if (!searchTree instanceof SearchTree) {
        throw new TypeError("Only displays results from a SearchTree class, returned from a Graph.dfs or Graph.bfs");
    }

    let parents = searchTree.getParents();
    let searchLevel = new Map();
    searchLevel.set(JSON.stringify(searchTree.getRoot()), []);

    for (let vertex in parents) {

        // stores the vertices in the Map until its parent is no longer a key in the Map
        if (!searchLevel.has(parents[vertex])) {
            await visualizeLevel(searchLevel);
        }

        searchLevel.get(parents[vertex]).push(vertex);
    }

    // empties searchLevel to display the last level
    await visualizeLevel(searchLevel);

    /**
     * This method iterates through searchLevel and displays the animations of the edges in parallel. It additionally
     * deletes keys once finishing their iteration, and then indirectly sets its values as new keys for the
     * next level.
     */ 
    async function visualizeLevel (searchLevel) {
        let result;
        let nextLevel = [];
        for (let [parent, vertices] of searchLevel) {
            for (let vertex of vertices) {
                result = drawDirectionalEdgeAnim(JSON.parse(parent), JSON.parse(vertex), true, .95);
                drawVertex(JSON.parse(parent), 'blue');
                drawVertex(JSON.parse(vertex), 'blue');
                nextLevel.push(vertex);
            }
            searchLevel.delete(parent);
        }

        await result;

        for (let vertex of nextLevel) {
            searchLevel.set(vertex, []);
        }
    }
}

export { depthFirstAnim, breadthFirstAnim };