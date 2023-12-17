const button = document.querySelector("button");

function characterCreatedNotification(cclass, level, name, race, user){
    console.log(cclass, level, name, race, user);
    console.log("Character created alert")
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            let notification = new Notification("A Character Has Been Created!", {
                data: {cclass: cclass, level: level, name: name, race:race, user:user},
                body: "A Character with these attributes was just created- Name: " + name + " Race: " + race + " Class: "+ cclass + " Level: " + level + " User: " + user,
                icon: "./img/icons/icon-48x48.png",
            })

            notification.addEventListener("error", (event) => {
                console.log(event);
            });
        }
        else {
            console.log("ERROR: notifications not enabled")
        }
    })
}

function characterEditedNotification(cclass, level, name, race, user){
    console.log(cclass, level, name, race, user);
    console.log("Character edited alert")
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            let notification = new Notification("A Character Has Been Updated!", {
                data: {cclass: cclass, level: level, name: name, race:race, user:user},
                body: "A Character with these attributes was just updated- Name: " + name + " Race: " + race + " Class: "+ cclass + " Level: " + level + " User: " + user,
                icon: "./img/icons/icon-48x48.png",
            })

            notification.addEventListener("error", (event) => {
                console.log(event);
            });
        }
        else {
            console.log("ERROR: notifications not enabled")
        }
    })
}

function characterDeletedNotification(cclass, level, name, race, user){
    console.log(cclass, level, name, race, user);
    console.log("Character deleted alert")
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            let notification = new Notification("A Character Has Been Deleted!", {
                data: {cclass: cclass, level: level, name: name, race:race, user:user},
                body: "A Character with these attributes was just deleted- Name: " + name + " Race: " + race + " Class: "+ cclass + " Level: " + level + " User: " + user,
                icon: "./img/icons/icon-48x48.png",
            })

            notification.addEventListener("error", (event) => {
                console.log(event);
            });
        }
        else {
            console.log("ERROR: notifications not enabled")
        }
    })
}