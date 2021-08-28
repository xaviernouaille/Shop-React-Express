import { useState, useEffect } from "react"
import { Switch, Route, useLocation } from "react-router-dom"
import { Form } from "./Form"
import { Home } from "./Home"
import { Nav } from "./Nav"
import { Loader } from "./Loader"
import { Single } from "./Single"

export const Layout = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 300)
  }, [location.pathname])

  return (
    <>
      {isLoading ? (
        <section className="z-50 bg-white h-screen w-full absolute flex justify-center items-center">
          <Loader />
        </section>
      ) : (
        <>
          <Nav />
          <Switch>
            <main className="py-10 container mx-auto md:p-0 md:py-8 p-5">
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/explore">
                <Form />
              </Route>
              <Route path="/detail/:id">
                <Single />
              </Route>
              {/* <Route path="*">
                <Redirect to="/" />
              </Route> */}
            </main>
          </Switch>
        </>
      )}
    </>
  )
}
