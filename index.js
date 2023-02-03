class Room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
        this._picture = "";
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get character() {
        return this._character;
    }

    get picture() {
        return this._picture;
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Description is too short.");
            return;
        }
        this._description = value;
    }

    set character(value) {
        this._character = value;
    }

    // add validation to the picture!! must start with https and end with jpg and have speech marks
    set picture(value) {
        this._picture = value;
    }

    // a method to produce friendly room description
    describe() {
        return "Looking around the " + this._name + " you can see " + this._description;
    }


    // a method to add rooms to link rooms to this one
    // it does this by adding them to _linkedRooms
    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }


    // a method to produce friendly description of linked rooms
    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
            let text = "The " + room._name + " is to the " + direction + ". ";
            details.push(text);
        }
        return details.join("");
    }

    //method to move the adventurer to a new room
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way",);
            return this;
        }
    }
}

class Item {
    constructor(name) {
        this._name = name;
        this._description = "";
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }


    // a method to produce friendly item description
    describe() {
        return "The " + this._name + " is " + this._description;
    }

}

class Character {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._conversation = "";
    }
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    set conversation(value) {
        if (value.length < 4) {
            alert("Conversation is too short.");
            return;
        }
        this._conversation = value;
    }
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get conversation() {
        return this._conversation;
    }

    // a method to produce friendly character description
    describe() {
        return "You have met " + this._name + ". " + this._name + " is " + this._description;
    }


    // a method to produce friendly conversation text
    converse() {
        return this._name + " says " + "'" + this._conversation + "'.";
    }
}

class Enemy extends Character {
    constructor(name) {
        super(name);
        this._weakness = "";
    }

    //DO I NEED TO MAKE GET WEAKNESS? CHECK SLIDES.

    set weakness(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._weakness = value;
    }


    // a method to determine the reult of fighting an enemy

    // item the item used to fight the enemy 
    // the result of the fight true = win, falese = lose

    fight(item) {
        if (item = this_weakness) {
            return true;
        } else {
            return false;
        }
    }
}

//create the indiviual room objects and add their descriptions and pictures
const Bathroom = new Room("bathroom");
Bathroom.description = "a tiled room with a bathtub.";
Bathroom.picture = "https://live.staticflickr.com/7331/9366169103_1d3521ff76_b.jpg";

const Hall = new Room("hall");
Hall.description = "a dimly lit circular hall, with a teeny tiny door partially hidden behind curtains.";
Hall.picture = "https://ccbritanico.com/wp-content/uploads/2012/12/aiw-doors.jpg";

const Library = new Room("library");
Library.description = "a large room with tall shelves filled with books.";
Library.picture = "https://www.messynessychic.com/wp-content/uploads/2018/06/5C3FB7B6-866D-444E-AC7B-ADFCA3A409C0.jpg";

const TinyRoom = new Room("tiny room");
TinyRoom.description = "three people eating.";
TinyRoom.picture = "https://gcottraux.files.wordpress.com/2016/12/003-borrowers-emilia-dziubak.jpg?w=648";

//link the rooms together
Hall.linkRoom("north", Bathroom);
Hall.linkRoom("east", Library);
Hall.linkRoom("south", TinyRoom);

Bathroom.linkRoom("south", Hall);

Library.linkRoom("west", Hall);

TinyRoom.linkRoom("north", Hall);

// create characters

// FIX: ALLOW MULTIPLE CHARACTERS IN ONE ROOM
const Thimble = new Character("Thimble");
Thimble.conversation = "Mum! Look a human";
Thimble.description = "a small mouselike boy";

const Bean = new Character("Bean");
Bean.conversation = "Mum! Look a human";
Bean.description = "a small girl";

const Mother = new Character("Mother");
Mother.conversation = "Hush now. I'll ask them who they are";
Mother.description = "a round faced woman";


// add characters to rooms
TinyRoom.character = Thimble;
TinyRoom.character = Mother;
TinyRoom.character = Bean;

// create items
// const Bottle = new Item("Bottle");

// Subroutine to display information about the current room
function displayRoomInfo(room) {
    let occupantMsg = ""
    if (room.character === "") {
        occupantMsg = ""
    } else {
        occupantMsg = room.character.describe() + ". " + room.character.converse()
    }

    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
        occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
}

function displayRoomPicture(room) {
    document.getElementById("image-holder").src = room.picture;
}


// Subroutine to complete inital game set up then handle commands from the user
function startGame() {
    //set and display start room
    currentRoom = Hall
    displayRoomInfo(currentRoom);
    displayRoomPicture(currentRoom);

    //handle commands
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = document.getElementById("usertext").value.toLowerCase().split(" ");
            
            // distinguish bewteen action -> go, get, drop, eat, drink
            switch (command[0]) {
                case "go":
                    const directions = ["north", "south", "east", "west"]
                    if (directions.includes(command[1])) {
                        currentRoom = currentRoom.move(command[1])
                        displayRoomInfo(currentRoom);
                        displayRoomPicture(currentRoom);
                    } else {
                        document.getElementById("usertext").value = ""
                        alert("That is not a valid command. Please try again.")
                    }
                    break;
                case "get":
                    // if command[1] is an item that can be picked up
                    // add item to inventory
                    // remove item from the current room (unlink)
                    document.getElementById("usertext").value = ""
                    alert("You picked up the item. It is now in your inventory.")
                    break;
                case "drop":
                    // if command[1] is an item that can be dropped
                    // remove item from inventory
                    // change location of item to the current room
                    // add item to the current room
                    document.getElementById("usertext").value = ""
                    alert("You dropped the item.")
                    break;
                case "eat":
                    // if command[1] is a food item that can be eaten
                    // player eats food item
                    document.getElementById("usertext").value = ""
                    alert("You ate the food.")
                    break;
                case "drink":
                    // if command[1] is a food item that can be drank
                    // player drinks food item
                    document.getElementById("usertext").value = ""
                    alert("You drank the food.")
                    break;
                default:
                    document.getElementById("usertext").value = ""
                    alert("That is not a valid command. Please try again.")
            }
        }
    });
}
startGame();