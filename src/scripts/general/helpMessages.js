import { MOBILE } from '../graph/graphView.js';

let helpPage = 0;

export const HELP_MESSAGES = [
    { 
        header: "Graph Visualizer", 
        message: [
            'No, this is not a replacement of your $200 graphing calculator. While utilizing the same name, ',
            "this theory is rather about how the connections to an object can be stored and searched in electronic data. ",
            "So what on earth is this theory?</br></br>",
            "Feel free to skip this tutorial if you'd like, and to click on the title."].join(''),
        image: './src/resources/favicon.png' // location starts at index.html
    },
    { 
        header: "The Graph Programmers Know and Love", 
        message: ["A graph is essentially a list of objects with each object provided its own ",
        "list for some kind of connection in the original list. Facebook uses them to store 'people' and ",
        "who they're friends with, and Google Maps uses them in storing locations and their neighboring ",
        "locations."].join(''),
        image: './src/resources/graph rep.png'
    },
    { 
        header: "Customizing Graph Visualizer", 
        message: ["<i>Adding and Removing Points</i> - A user can ",
        ((!MOBILE) ? "click to add a new point, and right-click to remove one." : 
                    "tap to add a new point, and double tap to remove one.") + "</br></br>",
        "<i>Adding Connections</i> - Users can also ",
        ((!MOBILE) ? "begin dragging from one point to another, or to an open space to simultaneously create a new point, to add a connection between them." : 
        "hold down on a point for half a second and drag from it to add a connection to it.") + "</br></br>",
        "<i>Zooming</i> - A user can further " + ((!MOBILE) ? "use the mouse wheel" : "tap with two fingers") + 
        " to zoom in and out.</br></br>",
        "Other pre-made maps can be loaded using the <span class='buttonDisplay main'>Change Map</span> ",
        "dropdown."].join(''),
        image: ''
    },
    { 
        header: "Searching", 
        message: ["A main advantage of graphs is their efficient ability to search through objects' connections.</br></br>",
        "Users can search the graph for a path using the <span class='buttonDisplay main'>Find Paths",
        "</span> dropdown section.</br></br>",
        "All algorithms use a <span class='buttonDisplay input'>Starting From:</span> point, and most ",
        "use a <span class='buttonDisplay input'>Searching For:</span> point, which can be typed in the ",
        "appropriate inputs. </br></br>",
        "The algorithm to use can be selected at the ending <span class='buttonDisplay algorithm'>",
        "dropdown</span> of the <span class='buttonDisplay main'>Find Paths</span> dropdown section."].join(''),
        image: ''
    },
    { 
        header: "The Algorithm Cast", 
        message: ["<font size=2><span class='buttonDisplay algorithm'>Depth-First Search</span> - Searches through every ",
        "connection to one of the 'neighbors' of the starting point before searching a second 'neighbor', digging first all ",
        "the way to the end of one neighboring line of connections before searching another neighbor and its connections.</br></br>",
        "<span class='buttonDisplay algorithm'>Breadth-First Search</span> - Searches all of the point's 'neighbors' ",
        "before searching those neighbors' neighbors. The fewer the connections to the sought point, the ",
        "quicker it'll be found.</br></br>",
        "<span class='buttonDisplay algorithm'>Shortest Entirety Path</span> - Determines the smallest distance to travel to every ",
        "point, though not necessarily in a linear path.</br></br>",
        "<span class='buttonDisplay algorithm'>Shortest Path</span> - Guarantees the shortest path from starting point to searching-for ",
        "point."].join(''),
        image: ''
    },
    { 
        header: "Additional Features", 
        message: ["<i>Sorting</i> - Users can additionally sort the points based on their 'X' or 'Y' co-ordinates ",
        "using the <span class='buttonDisplay main'>Sort</span> dropdown, which uses the Merge Sort algorithm.</br></br>",
        "<i>Closest Pair</i> - A last feature includes finding the closest pair of points in the graph, ",
        "which visualizes the 'Divide and Conquer' method."].join(''),
        image: ''
    },
    { 
        header: "Thanks so much for checking this project out!", 
        message: ["It has been incredibly learning for me, and I hope you find it interesting as well.</br></br>",
        "The GitHub repository can be found <a href=\'https://github.com/paulmeddaugh/Graph-Visualizer\'>here",
        "</a>.</br>",
        "The Trello board can be found <a href=\'https://trello.com/b/0vXmvjiV/graph-visualizer'>here",
        "</a>."].join(''),
        image: ''
    },
];

document.getElementById('previous').addEventListener("click", showHelpMessages);
document.getElementById('next').addEventListener("click", showHelpMessages);

function showHelpMessages (e) {

    // Checks pre-helpPage value to determine if button text needs to be changed
    changeIfOnEndingPages("Previous", "Next");

    helpPage = (e.currentTarget.id == 'previous') ? --helpPage : ++helpPage;

    if (helpPage < 0 || helpPage >= HELP_MESSAGES.length) {
        closeHelpMessages();
        return;
    }

    // Changes to beginning or finishing button text if currently on first or last HELP_MESSAGE index
    changeIfOnEndingPages("Skip", "Finish");

    loadCurrentHelpPage();
}

/**
 * Checks if the current help page is the first index or last index of HELP_MESSAGES, and changes
 * 'previous' button text to previousButtonText param if first index, or 'next' button text to nextButtonText
 * if last index.
 * @param {*} previousButtonText The text to change the 'previous' button text to if on the first index 
 * of HELP_MESSAGES.
 * @param {*} nextButtonText The text to change the 'next' button text to if on the last index of 
 * HELP_MESSAGES.
 */
function changeIfOnEndingPages(previousButtonText, nextButtonText) {
    if (helpPage == 0) {
        document.getElementById('previous').innerHTML = previousButtonText;
    } else if (helpPage == HELP_MESSAGES.length - 1) {
        document.getElementById('next').innerHTML = nextButtonText;
    }
}

export function loadCurrentHelpPage() {
    let img = document.getElementsByTagName('img')[0]?.remove();
    let helpMessage = document.getElementsByClassName('helpMessage')[0];

    document.getElementsByClassName('helpHeader')[0].innerHTML = HELP_MESSAGES[helpPage].header;
    helpMessage.innerHTML = HELP_MESSAGES[helpPage].message;

    // Re-appends or creates help <img> tag
    if (HELP_MESSAGES[helpPage].image != '') {
        
        if (!img) img = document.createElement('img');
        img.src = HELP_MESSAGES[helpPage].image;
        helpMessage.appendChild(img);
    }
}

document.getElementById('tutorial').addEventListener("click", () => {
    helpPage = 0;
    loadCurrentHelpPage();
    document.getElementById('previous').innerHTML = "Skip";
    document.getElementById('next').innerHTML = "Next";
    document.getElementById('helpMessage').style.display = 'flex';
});

document.getElementById('closeTutorial').addEventListener("click", closeHelpMessages);

function closeHelpMessages () {
    document.getElementById('helpMessage').style.display = 'none';
}