// store API url
const API = "http://localhost:8088"

// export a fetch call for each data type?
// A:
export const fetchInventory = () =>
    fetch(`${API}/inventory?_expand=user&_expand=type`)
        .then(r => r.json())

export const fetchUsers = () =>
    fetch(`${API}/users`)
        .then(r => r.json())

export const fetchUserInventory = () =>
    fetch(`${API}/userInventory`)
        .then(r => r.json())

export const fetchInventoryTypes = () =>
    fetch(`${API}/types`)
        .then(r => r.json())

export const sendItem = async (newItem) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newItem)
    }
    const res = await fetch("http://localhost:8088/inventory", fetchOption)
    return await res.json()
}

export const sendUserItem = async (inventoryObject) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(inventoryObject)
    }
    const res = await fetch("http://localhost:8088/userInventory", fetchOption)
    return await res.json()
}
