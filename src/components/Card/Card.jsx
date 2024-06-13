import React from 'react'

export default function Card(props) {

    const { nama, rombel, rayon } = props; 

  return (
    <>
    <div
        style={{ 
            width: 500,
            height: '100px',
            border: '1px solid black',
            borderRadius: 5,
         }}
    >
        {/* ini cara menggunakan props children */}
        {props.children}

        <tr>
            <td>Nama</td>
            <td>:</td>
            <td>{props.nama}</td>
        </tr>
        <tr>
            <td>Rombel</td>
            <td>:</td>
            <td>{props.rombel}</td>
        </tr>
        <tr>
            <td>Rayon</td>
            <td>:</td>
            <td>{props.rayon}</td>
        </tr>
    </div>
    </>
  )
}
