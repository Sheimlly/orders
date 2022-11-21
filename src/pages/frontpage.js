import React from "react"
import OrdersList from "./orders_list"
import AddOrder from "./add_order"

const Header = () => {
    return(
        <>
            <header className="container">
                <h1>Zamówienia</h1>
            </header>
        </>
    )
}

const Body = (props) => {
    return(
        <>
            {/* I'm not sure about it but  */}
            <section className="container">
                <div className="row">
                    <div className="col-6"><AddOrder food_list={props.food_list} tables={props.tables} /></div>
                    <div className="col-6"><OrdersList food_list={props.food_list} /></div>
                </div>
            </section>
        </>
    )
}

class Frontpage extends React.Component {
    constructor(props) {
        super();
        this.tables = [
            {table_id: 1, name: 'Stolik 1'},
            {table_id: 2, name: 'Stolik 2'},
            {table_id: 3, name: 'Stolik 3'},
            {table_id: 4, name: 'Stolik 4'},
            {table_id: 5, name: 'Stolik 5'},
            {table_id: 6, name: 'Stolik 6'},
        ]
        
        this.food_list = [
            {food_id: 1, name: 'Spaghetti', price: 20},
            {food_id: 2, name: 'Pizza', price: 15},
            {food_id: 3, name: 'Owoce morza', price: 75},
            {food_id: 4, name: 'Rosół', price: 10},
            {food_id: 5, name: 'Pierogi z mięsem', price: 15},
            {food_id: 6, name: 'Kurczak w panierce', price: 12}
        ]
    }

    render(){
        return(
            <>
                <Header/>
                <Body tables={this.tables} food_list={this.food_list}/>
            </>
        )
    }
}

export default Frontpage;