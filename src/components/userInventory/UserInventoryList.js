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
                        return <p key={`inventoryItem--${inventoryObject.id}`}>{inventoryObject.inventory.type?.nameOfType}; {inventoryObject.inventory.name}: {inventoryObject.user.name}
                        <button
                        onClick={
                            ()=>{returnItem(inventoryObject.inventory, inventoryObject.id)
                            .then(()=>{
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