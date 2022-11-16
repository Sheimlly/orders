import OrdersList from "./order"
import AddOrder from "./orders"

const Header = () => {
    return(
        <>
            <header className="container">
                <h1>Zamówienia</h1>
            </header>
        </>
    )
}

const Body = () => {
    return(
        <>
            {/* I'm not sure about it but  */}
            <section className="container">
                <div className="row">
                    <div className="col-6"><AddOrder /></div>
                    <div className="col-6"><OrdersList /></div>
                </div>
            </section>
        </>
    )
}

const Frontpage = () => {
    return(
        <>
            <Header />
            <Body />
        </>
    )
}

export default Frontpage;