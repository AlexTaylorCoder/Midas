

function UnknownRoute() {
    const currentUrl = window.location.pathname
    return (
        <div id = "unknownroute">
            <h1> Unknown Route {currentUrl} </h1>
        </div>
    )
}

export default UnknownRoute