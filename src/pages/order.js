import React, {useState } from 'react';
import '../styles/order.scss';

const tables = [
    {table_id: 1, name: 'Stolik 1'},
    {table_id: 2, name: 'Stolik 2'},
    {table_id: 3, name: 'Stolik 3'},
    {table_id: 4, name: 'Stolik 4'},
    {table_id: 5, name: 'Stolik 5'},
    {table_id: 6, name: 'Stolik 6'},
]

const food_list = [
    {name: 'Spaghetti', price: 20},
    {name: 'Pizza', price: 15},
    {name: 'Owoce morza', price: 75},
    {name: 'Rosół', price: 10},
    {name: 'Pierogi z mięsen', price: 15}
]

const OrdersList = () => {

    return(
        <>
            <h2>Lista zamówień</h2>
        </>
    )
}

export default OrdersList;