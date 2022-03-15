import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/inventory">Inventory</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/users">Employees</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/userInventory">Employee Inventory</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"

                    onClick={
                        () => {
                            localStorage.removeItem("inventory__user")
                        }
                    }
                >Logout</Link>
            </li>
        </ul>

    )
}