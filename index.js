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

    // add validation to the picture
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
            alert(this._name)
            return this;
        }
    }
}

class Item {
    constructor(name) {
        this._name = name,
            this._description = ""
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
        this._name = name,
            this._description = ""
        this._conversation = ""
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
  
    set weakness(value) {
      if (value.length < 4) {
        alert("Decription is too short.");
        return;
      }
      this._weakness = value;
    }
  

    // a method to determine the reult of fighting an enemy
     
    // item the item used to fight the enemy 
    // the result of the fight true = win, falese = loose

    fight(item) {
      if (item = this_weakness) {
        return true;
      } else {
        return false;
      }
    }
}

//create the indiviual room objects and add their descriptions and pictures
const Kitchen = new Room("kitchen");
Kitchen.description = "a long narrow room with worktops on either side and a large bench in the middle.";
Kitchen.picture = "https://i2-prod.coventrytelegraph.net/incoming/article15363407.ece/ALTERNATES/s1227b/0_JS167221748.jpg";
const Lounge = new Room("lounge");
Lounge.description = "a large room with two sofas and a large fire place.";
Lounge.picture = "https://ccbritanico.com/wp-content/uploads/2012/12/aiw-doors.jpg";
const GamesRoom = new Room("Games Room");
GamesRoom.description = "a large room with a pool table at it's centre.";
GamesRoom.picture = "";
const Hall = new Room("hall");
Hall.description = "a grand entrance hall with large paintings around the walls.";
Hall.picture = "";

//link the rooms together
Kitchen.linkRoom("south", Lounge);
Kitchen.linkRoom("east", Hall);
Lounge.linkRoom("north", Kitchen);
Lounge.linkRoom("east", GamesRoom);
GamesRoom.linkRoom("west", Lounge);
GamesRoom.linkRoom("north", Hall);
Hall.linkRoom("south", GamesRoom);
Hall.linkRoom("west", Kitchen);

//add characters
const Dave = new Enemy("Dave");
Dave.conversation = "grrr brains";
Dave.description = "a smelly Zombie";
Dave.pronoun = "he";
Dave.weakness = "cheese";


// add characters to rooms
Kitchen.character = Dave;


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
    currentRoom = Kitchen
    displayRoomInfo(currentRoom);
    displayRoomPicture(currentRoom);

    //handle commands
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("usertext").value;
            const directions = ["north", "south", "east", "west"]
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command)
                displayRoomInfo(currentRoom);
                displayRoomPicture(currentRoom);
            } else {
                document.getElementById("usertext").value = ""
                alert("that is not a valid command please try again")
            }

        }
    });
}
startGame();