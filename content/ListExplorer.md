# ListExplorer

A master/detail user interface pattern that presents a list of choices with a [ListBox](ListBox).  This component is built on top of [Explorer](Explorer), and uses `ListBox` as the "proxy list" to contain proxy elements for the items in the list.

[Simple list explorer](/demos/listExplorer.html)

## Usage

    import ListExplorer from 'elix/src/ListExplorer.js';
    const listExplorer = new ListExplorer(); // or
    const listExplorer = document.createElement('elix-list-explorer');

In HTML:

    <script type="module" src="node_modules/elix/src/ListExplorer.js"></script>
    <elix-listExplorer>
      <!-- List items go here. -->
    </elix-listExplorer>

`ListExplorer` is appropriate when:

* You want to let the user focus on a single item at a time.
* The number of items may be large (20 to 100s of items). For large collections, it is helpful to keep the list of items sorted (e.g., alphabetically or chronologically).
