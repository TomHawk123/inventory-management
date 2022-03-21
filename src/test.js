// Boolean approach

// {user.admin===true? <button> </button> : null}

// const thing = () => {

    
//     return {good || bad ? "on" : "off"}
// }

// let good = true
// let bad = false

// if (good || bad) {
//     console.log("on")
// }



const onOffSwitch = () => {

    const good = true
    const bad = false

    if (good === true || bad === true) {
        return console.log("on")
    } else {
        return console.log("off")
    }
}


onOffSwitch()
