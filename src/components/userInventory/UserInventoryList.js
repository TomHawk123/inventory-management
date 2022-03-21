import React, { useEffect, useState } from "react"
import { fetchInventoryTypes, fetchUserInventory, returnItem } from "../ApiManager"

// export a function that will return the HTML
export const UserInventoryList = () => {
    // set up variables for application state with useState hook
    const [userInventoryArray, setUserInventoryList] = useState([])
    const [totalItemsMessage, updateMessage] = useState('')
    const [types, setTypes] = useState([])
    const [inventorySwitch, setInventorySwitch] = useState(false)

    // fetch inventory list when inventory state changes
    useEffect(
        () => {
            // use expand to get access to user properties  
            fetchUserInventory()
                .then(inventoryArray => {
                    setUserInventoryList(inventoryArray)
                    setInventorySwitch(true)

                })
        },
        []
    )

    useEffect(
        () => {
            fetchInventoryTypes()
                .then(typeArray => {
                    let copy = [...userInventoryArray]
                    let copyTypes = copy.map(inventory => {
                        let found = typeArray.find(type => type.id === inventory.inventory.typeId)
                        inventory.inventory.type = found

                        return inventory
                    })
                    setUserInventoryList(copyTypes)
                    setTypes(typeArray)
                })
        },
        [inventorySwitch]
    )

    useEffect(
        () => {
            if (userInventoryArray.length === 1) {
                updateMessage("You have 1 inventory item")
            } else {
                updateMessage(`You have ${userInventoryArray.length} inventory items`)
            }
        },
        [userInventoryArray]
    )
    // RETURN BUTTON
    // When button is clicked, subtract one from userInventory item quanity and add one to 
    // master inventory item.quantity. Use Patch method as a fetchOption
    return (
        <>

            <div>{totalItemsMessage}</div>

            {
                userInventoryArray.map(
                    inventoryObject => {

                        // initialize new Date object
                        const date_ob = new Date(inventoryObject.timestamp);

                        // year as 4 digits (YYYY)
                        const year = date_ob.getFullYear();

                        // month as 2 digits (MM)
                        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

                        // date as 2 digits (DD)
                        const date = ("0" + date_ob.getDate()).slice(-2);

                        // hours as 2 digits (hh)
                        const hours = ("0" + date_ob.getHours()).slice(-2);

                        // minutes as 2 digits (mm)
                        const minutes = ("0" + date_ob.getMinutes()).slice(-2);

                        // seconds as 2 digits (ss)
                        const seconds = ("0" + date_ob.getSeconds()).slice(-2);

                        return <p key={`inventoryItem--${inventoryObject.id}`}>{inventoryObject.inventory.type?.nameOfType}; {inventoryObject.inventory.name} checked out at {hours}:{minutes}:{seconds} on {month}/{date}/{year} by {inventoryObject.user.name}
                            <button
                                onClick={
                                    () => {
                                        returnItem(inventoryObject.inventory, inventoryObject.id)
                                        .then(() => {
                                            fetchUserInventory()
                                                .then(inventoryArray => {
                                                    setUserInventoryList(inventoryArray)
                                                    setInventorySwitch(!inventorySwitch)
                                                })
                                        })
                                    }
                                }
                            >
                                Return
                            </button>
                        </p>
                    }
                )
            }
        </>
    )
}



// STRETCH GOAL: 
// if quantity property of userInventory is 0, 
    // then delete the item from user's inventory
        // else use fetch call with "PATCH" fetch option to subtract one from user's inventory and add one to master inventory


        // date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()