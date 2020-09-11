import React, { useEffect, useState } from 'react'
import * as utils from '../helper/utils';

export default function Data() {

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        setDatas(utils.gerarDatas());

    }, []);
    return (
        <div>
            <button >&lt;</button>
            <select className="browser-default" style={{ display: 'inline' }}>
                {
                    datas.map((data, id) => {
                        return (
                            <option key={id} value={data.valor}>{data.display}</option>
                        )
                    })
                }
            </select>
            <button>&gt;</button>
        </div>
    )
}
