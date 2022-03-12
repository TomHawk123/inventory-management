import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { sendItem } from "../ApiManager";

export const InventoryForm = () => {
    const history = useHistory()
    const [item, update] = useState({
        name: "",
        userId: null,
        typeId: null,
        quantity: null,
        picture: ""
    });



    const saveItem = e => {
        e.preventDefault()

        const newItem = {
            name: item.name,
            userId: item.userId,
            tupeId: item.typeId,
            quantity: item.quantity,
            picture: item.picture
        }
        
        return sendItem(newItem)
        .then(()=>{
            history.push("/inventory")
        })

    }

    return (
        <form className="inventoryForm">
            <h2 className="inventoryForm__title">New Inventory Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Item..."
                        onChange={
                            e=>{
                                const copy = {...item}
                                copy.name = e.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Type</label>
                    <select name="location" type="select"
                        required autoFocus
                        onChange={
                            e => {
                                const copy = { ...item }
                                copy.typeId = e.target.value
                                update(copy)
                            }
                        }>

                        <option value="" disabled selected hidden>Item type...</option>
                        {item.map(newItem => <option value={newItem.id}>{newItem.name}</option>)}

                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveItem}>
                Submit Item
            </button>
        </form>
    )
}