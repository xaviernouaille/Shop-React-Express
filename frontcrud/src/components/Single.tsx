import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export const Single = ()=>{
    const [data, setData] = useState<{_id: string, title: string,
    prix: number,
    categorie: string,
    img: string}>()
    const {id} = useParams<{id: string}>()
    let baseUrl = "http://localhost:8888/product"

    const history = useHistory()

    useEffect(()=>{
        axios({
            method: "get",
            url: `${baseUrl}/${id}`
        }).then(res => setData(res.data)).catch(err => history.push('/explore'))
    }, [])

    return(
        <section>
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <figure>
                <img src={data?.img} />
            </figure>
            <div className="flex flex-col space-y-2"><p className="uppercase tracking-wider text-sm">{data?.categorie}</p><h3 className="text-2xl font-medium">{data?.title}</h3><p className="proportional-nums text-indigo-600">{data?.prix}</p></div>
            </div>
        </section>
    )
}