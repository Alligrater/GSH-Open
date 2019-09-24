//Fork wins
var isSoundPlaying = false;

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

let up = keyboard("w"),
    down = keyboard("s"),
    left = keyboard("a"),
    right = keyboard("d"),
    uparr = keyboard("ArrowUp"),
    downarr = keyboard("ArrowDown"),
    leftarr = keyboard("ArrowLeft"),
    rightarr = keyboard("ArrowRight"),
    enter = keyboard("Enter"),
    tab = keyboard("Tab");

tab.press = () => {
    processInput("Tab", 1);
};

tab.release = () => {
    processInput("Tab", 0);
};

uparr.press = () =>{
    up.press();
}
uparr.release = () =>{
    up.release();
}

downarr.press = () =>{
    down.press();
}
downarr.release = () =>{
    down.release();
}
leftarr.press = () =>{
    left.press();
}
leftarr.release = () =>{
    left.release();
}
rightarr.press = () =>{
    right.press();
}
rightarr.release = () =>{
    right.release();
}

enter.press = () => {
    processInput("Enter", 1);
};

enter.release = () => {
    processInput("Enter", 0);
};


up.press = () => {
    processInput("up", 1);
};

up.release = () => {
    processInput("up", 0);
};


down.press = () => {
    processInput("down", 1);
};

down.release = () => {
    processInput("down", 0);
};

left.press = () => {
    processInput("left", 1);
};

left.release = () => {
    processInput("left", 0);
};

right.press = () => {
    processInput("right", 1);
};

right.release = () => {
    processInput("right", 0);
};


function processInput(inputDir, type){

    ACTIVE_STAGE.processInput(inputDir, type);

}
