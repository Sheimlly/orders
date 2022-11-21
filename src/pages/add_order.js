import React, {useEffect, useState } from 'react';
import '../styles/orders.scss';

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

const AddOrder = (props) => {
    const [sessionStorageOrders, setSessionStorageOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({
        table: "",
        food: [],
        total: 0
    });
    const [food, setFood] = useState({
        food_id: 0,
        name: "",
        price: 0,
        count: 0
    })

    // Update food state
    const updateFoodState = (value, target) => {
        if(target==='food') {
            setFood(previousValue => {
                return {...previousValue, food_id: props.food_list[value].food_id, name: props.food_list[value].name, price: props.food_list[value].price }
            })
        }
        setFood(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    // Order state update
    const updateOrderState = (index) => {
        setOrder(previousValue => {
            return {...previousValue, table: props.tables[index]};
        })
    }

    // Manage food in order state
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

    // Manage orders
    const addOrder = () => {
        console.log(order);
        if (order.table != "" && order.total > 0) {
            setOrders((o) => [...o, order])
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

    // Add orders to session storage
    const addOrders = () => {
        // setSessionStorageOrders((o) => [...o, orders]);
        
        sessionStorage.setItem('orders', JSON.stringify([...sessionStorageOrders, ...orders]));
    }

    useEffect(() => {
        const storage_orders = JSON.parse(sessionStorage.getItem('orders'));
        if (storage_orders) {
            setSessionStorageOrders(storage_orders);
            console.log(sessionStorageOrders);
        }
    }, []);

    return (
        <>
            <h2>Dodaj zamówienie</h2>
            <div className='py-2 px-2 mb-3 addorder__table'>
                <form className='d-flex flex-column' onSubmit={addOrders}>
                    <label>
                        <span>Stolik:</span>
                        <select
                            onChange={e => updateOrderState(e.target.value) }
                            required
                        >
                        <option hidden>--- Wybierz stolik ---</option>
                        {props.tables.map((table, key) => (
                            <option key={key} value={key}>{table.name}</option>
                        ))}
                        </select>
                    </label>
                    
                    <label>
                        <span className='add-form__input-description'>Jedzenie</span>
                        <select
                            onChange={e => updateFoodState(e.target.value, 'food') }
                            required
                        >
                        <option hidden>--- Wybierz jedzenie ---</option>
                        {props.food_list.map((f, key) => (
                            <option key={key} value={key}>{f.name}, Cena: {f.price}</option>
                        ))}
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