import { FormEvent, FunctionComponent as FC, useEffect } from "react"
import { useState } from "react"
import { useHistory, useLocation, Link } from 'react-router-dom';
import "./Form.css"
import axios from "axios"
import { Loader } from "./Loader"

interface IFormData {
  recherche?: string
  categorie?: string
  prixMax?: number
  prixMin?: number
  page?: number
}

interface IDataInfo {
  page?: number
  pageSize?: number
  total?: number
}

interface IPost {
  _id: string
  title: string
  prix: number
  categorie: string
  img: string
  date: Date
}

export const Form: FC = (): JSX.Element => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [formData, setFormData] = useState<IFormData>({})
  const [dataInfo, setDataInfo] = useState<IDataInfo>({})
  const location = useLocation()
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)

  useEffect(() => {
    let urlParam = new URLSearchParams(location.search)
    let entries = urlParam.entries()
    let params: IFormData = Object.fromEntries(entries)

    if (params.prixMin && params.prixMax && params.prixMax < params.prixMin) {
      params = { ...params, prixMax: Number(params.prixMin) + 1 }
    }

    setFormData(params)
  }, [])

  let history = useHistory()

  let baseUrl = "http://localhost:8888/product"

  useEffect(() => {
    history.push({
      pathname: location.pathname,
      search: formData
        ? Object.entries(formData)
            .map((e) => e.join("="))
            .join("&")
        : "",
    })
  }, [formData])

  useEffect(() => {
    setLoading(true)

    axios({
      method: "GET",
      url: baseUrl,
      params: formData,
    })
      .then((response) => {
        console.log(response)
        setPosts(response.data.products)
        setDataInfo({
          page: response.data.page,
          pageSize: response.data.pageSize,
          total: response.data.total,
        })
        setTimeout(() => setLoading(false), 500)
      })
      .catch((err) => console.log(err))
  }, [location])

  const categories: string[] = [
    "Baby",
    "Books",
    "Jewelery",
    "Kids",
    "Tools",
    "Music",
  ]

  const [loading, setLoading] = useState<boolean>()

  const postsCards = posts.map((p, index) => (
    <Link
    to={`detail/${p._id}`}
      key={index}
      className="p-6 rounded-md shadow-md flex flex-col md:flex-row md:space-x-6 cursor-pointer transform hover:scale-95 transition-all">
      <figure className="md:pb-0 pb-5">
        <img className="md:h-44 w-full md:w-auto" src={p.img} alt={p.title} />
      </figure>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-2">
          <p className="uppercase tracking-wider text-sm">{p.categorie}</p>
          <h3 className="text-2xl font-medium">{p.title}</h3>
          <p className="proportional-nums text-indigo-600">{p.prix}</p>
        </div>
        <div className="flex-grow flex items-end">
          <p className="opacity-50">20/12/20 19:12</p>
        </div>
      </div>
    </Link>
  ))

  return (
    <section>
      <section className="flex flex-col space-y-5">
        <h2 className="font-semibold text-4xl">Rechercher</h2>
        <form
          className="flex flex-col space-y-5 p-6 rounded-md shadow-md"
          onSubmit={(e: FormEvent) => e.preventDefault()}>
          <section className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5 items-center">
            <div className="flex-grow w-full">
              <label htmlFor="recherche">Recherche</label>
              <input
                type="text"
                id="recherche"
                className="w-full"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recherche: e.target.value,
                    page: 0,
                  })
                }
                value={formData.recherche || ""}
              />
            </div>

            <div className="flex-grow w-full md:w-auto">
              <label htmlFor="categorie">Categorie</label>
              <select
                id="categorie"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categorie: e.target.value,
                    page: 0,
                  })
                }
                value={formData.categorie || ""}>
                <option value="" defaultChecked>
                  ...
                </option>
                {categories.map((categorie, index) => (
                  <option key={index} value={categorie.toLowerCase()}>
                    {categorie}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section>
            {isOpenFilter ? (
              <section className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-10">
                <div className="md:w-auto w-full">
                  <label htmlFor="prixMin">Prix min</label>
                  <input
                    type="number"
                    id="prixMin"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prixMin: Number(e.target.value),
                        page: 0,
                      })
                    }
                    value={formData.prixMin || ""}
                  />
                </div>
                <div className="md:w-auto w-full">
                  <label htmlFor="prixMax">Prix max</label>
                  <input
                    type="number"
                    id="prixMax"
                    min={formData.prixMin ? Number(formData.prixMin) + 1 : ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prixMax: Number(e.target.value),
                        page: 0,
                      })
                    }
                    value={formData.prixMax || ""}
                  />
                </div>
              </section>
            ) : (
              ""
            )}
            <p
              className="mt-3 text-center text-sm cursor-pointer hover:underline"
              onClick={() => setIsOpenFilter(!isOpenFilter)}>
              {isOpenFilter ? "Affichez moins -" : "Affichez plus +"}
            </p>
          </section>
        </form>
        {loading ? (
          <Loader />
        ) : (
          <section>
            <section>
              <h2 className="font-semibold text-4xl">
                {dataInfo?.total
                  ? dataInfo.total > 1
                    ? `${dataInfo.total} résultats`
                    : `${dataInfo.total} résultat`
                  : "0 résultat"}
              </h2>

              <div className="flex flex-col space-y-5 py-5">
                {posts.length > 0 ? (
                  postsCards
                ) : (
                  <p className="my-5 text-xl opacity-60 text-center">
                    Aucun résultat :-(
                  </p>
                )}
              </div>
            </section>
            <section className="flex justify-center">
              <div className="flex flex-wrap justify-center">
                {dataInfo
                  ? [...Array(dataInfo?.page)].map((index, n) => (
                      <span
                        key={n}
                        className="p-2 shadow-md rounded-md mx-2 cursor-pointer hover:opacity-60"
                        onClick={() => setFormData({ ...formData, page: n })}>
                        {n}
                      </span>
                    ))
                  : ""}
              </div>
            </section>
          </section>
        )}
      </section>
    </section>
  )
}
