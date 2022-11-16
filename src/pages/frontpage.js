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
                <p>Zamówienia</p>
                {/* z z kropką mi nei działą :( */}
                <p>Złóz zamówienie</p>
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