import React, {useState, useEffect} from 'react';
import '../styles/orders.scss';

const FoodList = (props) => {
    return (
        <>
            {props.food.map((f ,index) => (
                <div className='order-food-list my-3' key={index}>
                    <div className='d-flex flex-row'>
                        {f.name} - cena: {f.price}, ilość: {f.count}, cena całkowita: {f.price*f.count}
                        <div className='order-food-list__button order-food-list__button--delete mx-2' onClick={() => props.deleteOrderFood(props.order, index)}>Usuń <i className="icon-cancel"/></div>
                    </div>
                    <div className='d-flex flex-row order-food-list--edit'>
                        <label>
                            <select
                                onChange={e => props.updateFoodName(props.order, index, e.target.value)}
                            >
                            <option hidden>--- Wybierz jedzenie ---</option>
                            {props.food_list.map((fo, food_index) => (
                                <option key={fo.food_id} value={food_index}>{fo.name}, Cena: {fo.price}</option>
                            ))}
                            </select>

                            <span>Ilość: </span>
                            <input className='food-count' type='number' defaultValue={f.count} min='1' onChange={e => props.updateFoodCount(props.order, e.target.value, index) } />
                        </label>
                        <div className='order-food-list__button order-food-list__button--change mx-2' onClick={() => props.changeOrder(props.order)}>Zmień</div>
                    </div>
                </div>
            ))}
        </>
      );
    
}

const OrderDetails = (props) => {
    return (
        <>
            <div className='orders_list--order__container'>
                <FoodList food={props.order.food} order={props.order} food_list={props.food_list} changeOrder={props.changeOrder} updateFoodName={props.updateFoodName} updateFoodCount={props.updateFoodCount} deleteOrderFood={props.deleteOrderFood} isFoodInOrder={props.isFoodInOrder}/>

                <div>
                    <span>Dodaj jedzenie</span>
                    <select
                        id={'food-choose-'+props.order_index}
                        className='food-choose'
                        required
                    >
                    <option hidden>--- Wybierz jedzenie ---</option>
                    {props.food_list.map((f, index) => (
                        <option key={f.food_id} value={index}>{f.name}, Cena: {f.price}</option>
                    ))}
                    </select>

                    <span>Ilość: </span>
                    <input id={'food-count-'+props.order_index} className='food-count' type='number' min='1'/>
                    <button onClick={() => props.addFood(props.order, props.order_index)}>Dodaj</button>
                </div>

                <p>Całkowita cena za zamówienie: {props.order.total}</p>
            </div>
        </>
    )
}

const OrderCheckout = (props) => {
    return (
        <>
            <div className='orders_list--order__container'>
                <p>Zamówienie:</p>
                {props.order.food.map((f ,index) => (
                    <div className='order-food-list my-3' key={index}>
                        <div className='d-flex flex-row'>
                            {f.name} - cena: {f.price}, ilość: {f.count}, cena całkowita: {f.price*f.count}
                        </div>
                    </div>
                ))}

                <p style={{color: 'white'}}>Całkowita cena za zamówienie: <strong>{props.order.total}</strong></p>

                <div className='checkout-buttons d-flex justify-content-around'>
                    <div className='checkout-button checkout-buttons__checkout' onClick={() => props.handleCheckout(props.order, false)}>Zapłać</div>
                    <div className='checkout-button checkout-buttons__checkout-with-tip' onClick={() => props.handleCheckout(props.order, true)}>Zapłać i daj 5% napiwku od całego zamówienia</div>
                </div>
            </div>
        </>
    )
}

const OrdersList = (props) => {
    const [storageOrders, setStorageOrders] = useState([]);
    const [orders, setOrders] = useState(JSON.parse(sessionStorage.getItem('orders')));
    const [checkout, setCheckout] = useState([]);

    function isFoodInOrder(order_food, f_id) {
        order_food.map((f) => {
            if(f.food_id === f_id){

            }
        })
        
        return false;
    }

    // Food
    const updateFoodName = (od, food_order_index, food_index) => {
        var order = orders.find(o => o.table == od.table);
        const index = orders.indexOf(order);
        var f = orders[index].food;
        f[food_order_index].name = props.food_list[food_index].name;
        f[food_order_index].price = props.food_list[food_index].price;
        var orders_copy = orders;
        orders_copy[index].food = f;
        setOrders(orders_copy);
    }
    const updateFoodCount = (od, food_count, food_order_index) => {
        var order = orders.find(o => o.table == od.table);
        const index = orders.indexOf(order);
        var f = orders[index].food;
        f[food_order_index].count = food_count;
        var orders_copy = orders;
        orders_copy[index].food = f;
        setOrders(orders_copy);
    }

    const deleteOrderFood = (od, food_order_index) => {
        var order = storageOrders.find(o => o.table == od.table);
        const index = storageOrders.indexOf(order);

        var f = orders[index].food;
        if (food_order_index > -1) {
            f.splice(food_order_index, 1);
        }

        var orders_copy = orders;
        orders_copy[index].food = f;

        var sesssionStorageOrders_copy = orders;
        sesssionStorageOrders_copy[index].food = f;

        setOrders(orders_copy);
        setStorageOrders(sesssionStorageOrders_copy);
        sessionStorage.setItem('orders', JSON.stringify(sesssionStorageOrders_copy));
    }

    const changeOrder = (od) => {
        var order = orders.find(o => o.table == od.table);
        var session_order = storageOrders.find(o => o.table == od.table);
        const index = storageOrders.indexOf(session_order);
        var orders_copy = [...storageOrders];
        orders_copy[index] = order;
        setStorageOrders(orders_copy);
        sessionStorage.setItem('orders', JSON.stringify(storageOrders));
    }

    const addFood = (od, order_index) => {
        var order = orders.find(o => o.table == od.table);
        const index = orders.indexOf(order)
        var food_list_index = document.getElementById('food-choose-'+order_index).value;
        var food_count = document.getElementById('food-count-'+order_index).value;
        if (food_count < 1) {
            alert('Ilość jedzenia nie może być mniejsza niż 1');
            return;
        }
        var f = orders[index].food;
        f.push({food_id: props.food_list[food_list_index].food_id, name: props.food_list[food_list_index].name, price: props.food_list[food_list_index].price, count: food_count});
        var orders_copy = orders;
        orders_copy[index].food = f;

        var sesssionStorageOrders_copy = orders;
        sesssionStorageOrders_copy[index].food = f;

        setOrders(orders_copy);
        setStorageOrders(sesssionStorageOrders_copy);
        sessionStorage.setItem('orders', JSON.stringify(sesssionStorageOrders_copy));
        window.location.reload(false);
    }

    const deleteOrder = (order) => {
        const index = storageOrders.indexOf(order);
        var sessionStorageOrders_copy = [...storageOrders];
        var orders_copy = [...orders];
        if (index > -1) {
            sessionStorageOrders_copy.splice(index, 1);
            orders_copy.splice(index, 1);
        }
        setStorageOrders(sessionStorageOrders_copy);
        setOrders(orders_copy);
        sessionStorage.setItem('orders', JSON.stringify([...sessionStorageOrders_copy]));
        // window.location.reload(false);
    }

    const handleCheckoutButton = (order_index) => {
        var check = [...checkout];
        check[order_index] = !check[order_index];
        setCheckout(check);
    }

    const handleCheckout = (order, tip5) => {
        var tip = 0;
        tip5 ? tip = 0.05 * order.total : tip = 0;

        alert('Twój rachunek wynosi: '+(order.total+tip));
        deleteOrder(order);
    }

    useEffect(() => {
        const storage_orders = JSON.parse(sessionStorage.getItem('orders'));
        if (storage_orders) {
            setStorageOrders([...storage_orders]);
            setOrders([...storage_orders]);

            var check = [];
            storage_orders.map((storage_order, index) => {
                check.push(false);
            })
            setCheckout(check);
        }
    }, [])

    return(
        <>
            <h2>Lista zamówień</h2>

            {storageOrders.length > 0 ? storageOrders.map((order, key) => (
                <div className='py-2 px-2 mb-3 orders_list--order' key={key}>
                    <h3>{order.table.name}</h3>
                    
                    {!checkout[key] ? <OrderDetails order={order} order_index={key} food_list={props.food_list} changeOrder={changeOrder} updateFoodName={updateFoodName} updateFoodCount={updateFoodCount} deleteOrderFood={deleteOrderFood} addFood={addFood} isFoodInOrder={isFoodInOrder}/> : <OrderCheckout order={order} order_index={key} handleCheckout={handleCheckout} />}

                    <div className='orderss_list--order__buttons d-flex justify-content-between'>
                        <div className='orders_list--order__buttons orders_list--order__buttons--checkout' onClick={() => handleCheckoutButton(key)}>{checkout[key] ? 'Anuluj' : 'Zapłać'}</div>
                        
                        <div className='orders_list--order__buttons orders_list--order__buttons--delete' onClick={() => deleteOrder(order)}>Usuń <i className="icon-cancel"/></div>
                    </div>
                </div>
            )) : <p>Nie ma jeszcze żadnych zamówień</p>}
        </>
    )
}

export default OrdersList;