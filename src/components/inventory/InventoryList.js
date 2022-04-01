import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { fetchInventory, fetchUserInventory, sendUserItem } from "../ApiManager"
import "./Inventory.css"

// export a function that will return the HTML
export const InventoryList = () => {
    const history = useHistory()
    // set up variables for application state with useState hook
    const [inventoryList, setInventoryList] = useState([])
    const [userInventory, setUserInventory] = useState([])
    const [totalItemsMessage, updateMessage] = useState('')

    // fetch inventory list when inventory state changes
    useEffect(
        () => {
            fetchInventory()
                .then(inventoryArray => {
                    setInventoryList(inventoryArray)
                })
            fetchUserInventory()
                .then(userInventoryArray => {
                    setUserInventory(userInventoryArray)
                })
        },
        [] // Only run when initial JSX rendering is complete.
    )

    useEffect(
        () => {
            if (inventoryList.length === 1) {
                updateMessage("You have 1 inventory item")
            } else {
                updateMessage(`You have ${inventoryList.length} inventory line items`)
            }
        },
        [inventoryList]
    )

    const deleteItem = (id) => {
        fetch(`http://localhost:8088/inventories/${id}`, {
            method: "DELETE"
        }).then(fetchInventory)
            .then(inventoryArray => {
                setInventoryList(inventoryArray)
            })
    }


    return (
        <>

            <div id="totalItemsMessage">{totalItemsMessage}</div>

            {localStorage.getItem("inventory__admin") ?

                <button className="inventoryListCreateButton"
                    onClick={
                        () => history.push("/inventory/create")}>Create New
                </button>

                : null
            }

            <div id="centerpiece">
                {
                    inventoryList.map(
                        inventoryObject => <div key={`deleteItem--${inventoryObject.id}`} className="inventory__List">





                            {inventoryObject.quantity}X: {inventoryObject.type.nameOfType}; {inventoryObject.name}

                            <p className="inventoryListParagraph">

                            </p>

                            <article className="buttonContainer">

                                {inventoryObject.quantity > 0 === true ?

                                    <div id="inventoryCheckoutButton"
                                        onClick={
                                            () => {
                                                sendUserItem(inventoryObject)
                                                    .then(() => {
                                                        return fetchInventory()
                                                    })
                                                    .then(inventoryArray => {
                                                        setInventoryList(inventoryArray)
                                                    })
                                            }
                                        }>
                                    </div> : null}

                                {localStorage.getItem("inventory__admin") ?

                                    <button className="editButton"
                                        onClick={
                                            () => history.push(`/inventory/${inventoryObject.id}`)}>
                                    </button>
                                    : null
                                }

                                {localStorage.getItem("inventory__admin") ?

                                    <div className="inventoryDeleteButton"
                                        onClick={() => {
                                            deleteItem(inventoryObject.id)
                                        }}>
                                    </div>
                                    : null
                                }

                            </article>

                        </div>
                    )
                }
            </div>

        </>
    )
}
