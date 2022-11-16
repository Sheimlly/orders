import React, {useState } from 'react';
import '../styles/orders.scss';

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

const FoodList = ({food, addFood, deleteFood}) => {
    return (
        <>
            <strong className='addFood mt-2 d-block' onClick={addFood}>Dodaj jedzenie<i className="icon-right-small" /></strong>
            <ul>
                {food.map((f, index) => {
                    return <div key={index}>
                                <span>{f.name}, </span>
                                Ilość: {f.count},
                                Cena: {f.price}, 
                                Cena całkowita: {f.price * f.count}, 
                                <i className="icon-cancel" onClick={() => {deleteFood(f)}} />
                            </div>;
                })}
            </ul>
        </>
      );
    
}

const OrdersList = ({orders, addOrder, deleteOrder}) => {
    return (
        <>
            <strong className='addOrder mt-2 d-block' onClick={addOrder}>Dodaj do zamówienia<i className="icon-right-small" /></strong>
            <ul>
                {orders.map((order, index) => {
                    return <div className='orderslist' key={index}>
                                <h3>{order.table.name}</h3>
                                Jedzenie:
                                <ul>
                                    {Object.keys(order.food).map((key) => (
                                        <li key={key}>{order.food[key].name}, Cena: {order.food[key].price}, Cena całkowita: {order.food[key].price*order.food[key].count}</li>
                                    ))}
                                </ul>
                                <p>Cena: {order.total}</p>
                                <span onClick={() => {deleteOrder(order)}}>Usuń<i className="icon-cancel"/></span>
                            </div>;
                })}
            </ul>
        </>
      );
    
}

const AddOrder = () => {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({
        table: "",
        food: [],
        total: 0
    });
    const [food, setFood] = useState({
        name: "",
        price: 0,
        count: 0
    })

    const updateOrderState = (index) => {
        setOrder(previousValue => {
            return {...previousValue, table: tables[index]};
        })
    }

    const updateFoodState = (value, target) => {
        if(target==='food') {
            setFood(previousValue => {
                return {...previousValue, name: food_list[value].name, price: food_list[value].price }
            })
        }
        setFood(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const addFood = () => {
        if (food.name != "") {
            var f = [...order.food];
            f.push(food);
            var t = order.total;

            setOrder(previousValue => {
                return {...previousValue, food: f, total: t+food.price*food.count};
            })
        }
    }

    const deleteFood = (value) => {
        var f = [...order.food];
        var index = f.indexOf(value);
        if (index !== -1) {
            f.splice(index, 1);
        }
        setOrder(previousValue => {
            return {...previousValue, food: f};
        })
    }

    const addOrder = () => {
        console.log(order);
        if (order.table != "" && order.total > 0) {
            setOrders((d) => [...d, order])
            setOrder(previousValue => {
                return {...previousValue, table: "", food: [], total: 0 }
            })
        }
    }

    const deleteOrder = (value) => {
        setOrders(current =>
            current.filter(element => {
                return element !== value
            }),
        );
    }

    const addOrders = () => {
        orders.map((o) => {
            sessionStorage.setItem(o.table.name, o);
        })
    }

    return (
        <>
            <h2>Dodaj zamówienie</h2>
            <div className='py-2 mb-3 addorder__table'>
                <form className='d-flex flex-column' onSubmit={addOrders}>
                    <label>
                        <span>Stolik:</span>
                        <select
                            onChange={e => updateOrderState(e.target.value) }
                            required
                        >
                        {
                            Object.keys(tables).map((key) => (
                                <option key={key} value={key}>{tables[key].name}</option>
                            ))
                        }
                        </select>
                    </label>
                    
                    <label>
                        <span className='add-form__input-description'>Jedzenie</span>
                        <select
                            onChange={e => updateFoodState(e.target.value, 'food') }
                            required
                        >
                        {
                            Object.keys(food_list).map((key) => (
                                <option key={key} value={key}>{food_list[key].name}, Cena: {food_list[key].price}</option>
                            ))
                        }
                        </select>

                        <span>Ilość: </span>
                        <input className='food-count' type='number' min='1' onChange={(e) => updateFoodState(e.target.value, 'count')} required />
                        <FoodList food={order.food} addFood={addFood} deleteFood={deleteFood} />
                    </label>
                    <OrdersList orders={orders} addOrder={addOrder} deleteOrder={deleteOrder} />
                    <button type='submit'>Dodaj zamówienia</button>
                </form>
            </div>
        </>
    )
}

export default AddOrder;