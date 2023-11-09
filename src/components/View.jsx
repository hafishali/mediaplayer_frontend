import React, { useEffect, useState } from 'react'
import Viewcard from './Viewcard'
import { Col, Row } from 'react-bootstrap'
import { getAllvideos } from '../services/allAPI'

function View({uploadvideostatus}) {

  const [allvideo,setAllvideo]=useState([])

  const [deleteVideoStatus,setDeleteVideoStatus]=useState(false)

const getuploadedvideos =async()=>{
  const response=await getAllvideos()
  // console.log(response);
  const {data}=response
  // console.log(data);
  setAllvideo(data)

}
console.log(allvideo);

useEffect(()=>{
  getuploadedvideos()
  setDeleteVideoStatus(false)
},[uploadvideostatus,deleteVideoStatus])


  return (
    <div className='ms-2'>
        <h3>All Videos</h3>
        <Row>
           { allvideo.length>0?

           allvideo.map((video)=>( <Col sm={12} md={6} lg={4} xl={3}> <Viewcard displayvideo={video} setDeleteVideoStatus={setDeleteVideoStatus}/></Col>
           ))
            : <p>nothing to display</p>
            }
          

        </Row>
    </div>
  )
}

export default View