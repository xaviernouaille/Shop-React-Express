import { Link } from "react-router-dom"
export const Home = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center space-y-8 relative z-10 py-20 container mx-auto">
        <h1 className="font-semibold text-5xl text-center relative">
          Recherchez ce dont vous avez besoin
        </h1>
        <Link
          className="mx-auto p-3 bg-green-500 text-white rounded-md hover:bg-green-400"
          to="/explore">
          Voir toutes les annonces
        </Link>
      </section>
    </>
  )
}
