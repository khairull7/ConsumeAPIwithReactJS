import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Inbound( {opsiButton}) {
    const [payload, setPayLoad] = useState({
        date: null,
        stuff_id: null,
        total: null,
        proff_file: null
    });
    const [stuffs, setStuffs] = useState({});
    const [error, setError] = useState({});
    const [alert, setAlert] = useState(false);
   

    useEffect(() => {
         axios.get('http://localhost:8000/stuffs/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 
            }
        })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
    }, []);

    function handleInputFileChange(e) {
        const { name, files } = e.target;
        setPayLoad(prevPayload => ({
            ...prevPayload,
            [name]: files[0]    
        }));
    }
    
    function handleSubmitForm(e) {
        e.preventDefault();
        console.log(payload)

        // const formData = new FormData();
        // formData.append('date', payload.date);
        // formData.append('stuff_id', payload.stuff_id);
        // formData.append('total', payload.total);
        // formData.append('proff_file', payload.proff_file);

        axios.post('http://localhost:8000/inbound-stuffs/store', payload, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type' : 'multipart/form-data',
            }
        })
            .then(res => {  
                setError({})
                setAlert(true)
                navigate('/inbound-stuffs/{id}')
            })
            .catch (err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                } else {
                    setError(err.response.data);
                }
            })
    }
    return (
        <Case>
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-white dark:text-white">Add a new Inbound Stuff Data</h2>
                {
                    alert ? (
                        <div class="p-4 mb-4 text-sm text-white-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-green-400"
                        role="alert">       
                            <span class="font-medium">Success!</span> check inbound data in <b><Link>this pages</Link></b>
                           
                        </div>
                    ) : ''
                }
                {
                    Object.keys(error).length > 0 ? (
                        <div role="alert">
                        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Gagal!
                        </div>
                        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <ul>
                                {
                                 Object.entries(error).map(([key, value]) => (
                                    <li key={key}>{key != "status" && key != "message" ? value : ''}</li>
                                 ))
                                }
                            </ul>
                        </div>
                     </div>
                    ) : ''
                }
                <form onSubmit={handleSubmitForm}>
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="date" class="block mb-2 text-sm font-medium text-white dark:text-white">Date</label>
                            <input type="date" name="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg 
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setPayLoad({ ...payload, date: e.target.value})} />
                        </div>
                        <div>
                            <label for="stuff" class="block mb-2 text-sm font-medium text-white dark:text-white">Stuff</label>
                            <select id="stuff"  name="stuff_id" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 
                                block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setPayLoad({ ...payload, stuff_id: e.target.value})} >
                                <option hidden disabled selected>Select Stuff</option>
                                {
                                    Object.entries(stuffs).map(([index, item]) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label for="total" class="block mb-2 text-sm font-medium text-white dark:text-white">Total Stuff</label>
                            <input type="number" name="total" id="total" class="bg-gray-50 border border-gray-300 text-gray-700 
                            text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setPayLoad({ ...payload, total: e.target.value})}/>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="proff_file" class="block mb-2 text-sm font-medium text-white dark:text-white">Proff File</label>
                            <input type="file" name="proff_file" id="proff_file" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 
                            focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleInputFileChange} />
                        </div>
                    </div>
                    <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg 
                    focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" >
                       Add Inbound
                    </button>
                </form>
            </div>
        </Case>
    )
}