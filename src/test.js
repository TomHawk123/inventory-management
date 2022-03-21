export const send = object => {
    const newObj = {
        name: object.name,
        description: object.description
    }
    const fetchOption = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newObj)
    }
    return 
}

// Boolean approach

// {user.admin===true? <button> </button> : null}
