import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { deleteHistory, getHistory } from '../services/allAPI';


function Watch() {
  const [history,setHistory]=useState([])
  const navi=useNavigate()
const allHistory= async()=>{
  const {data}= await getHistory()
  // console.log(data);
  setHistory(data)
}

const removeHistory =async(id)=>{
  await deleteHistory(id)
  allHistory()
}

console.log(history);
useEffect(()=>{
  allHistory()
},[])

  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-between'>
        <h1>Watch History</h1>
        <h4 onClick={()=>navi('/home')}><i class="fa-solid fa-arrow-left "></i> Back To Home</h4>
      </div>
      <div className='d-flex justify-content-center align-items-center w-100 '>
        
        <Table >
      <thead>
        <tr>
          <th>#</th>
          <th>Caption</th>
          <th>URL</th>
          <th>Time Stamp</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {history.length>0?
        history.map((item,index)=>(
          <tr>
          <td>{index+1}</td>
          <td>{item.caption}</td>
          <td><a href={`${item.embedLink}?autoplay=1`} target='_blank'>{item.embedLink}</a> </td>
          <td>{item.timestamp}</td>
          <td> <button type="button" onClick={()=>removeHistory(item?.id)} class="btn btn-danger "><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        ))

          
        : <p className='fw-bolder fs-5 text-danger'>no history</p>
        }
        
      </tbody>
    </Table>
        
      </div>

    </div>
  )
}

export default Watch