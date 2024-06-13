import React from 'react'

export default function table(props) {

    const data = [
        {
          nama: 'Khairul',
          rombel: 'PPLG XI-5',
          rayon: 'Ciawi 2',
        },
        {
          nama: 'Ikhwan',
          rombel: 'PPLG XI-6',
          rayon: 'Ciawi 1',
        },
      ];

  return (
    <>
        <table border="1px solid black">
            <thead>
                <tr>
                    {
                        props.title.map((val, i) => {
                            <td>{val}</td>
                        }
                    )}
                    <td>No</td>
                    <td>Nama</td>
                    <td>Rombel</td>
                    <td>Rayon</td>
                </tr>
            </thead>
            <tbody>
                {props.data}
            </tbody>
        </table>
    </>
)
}
