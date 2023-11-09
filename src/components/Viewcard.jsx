import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addtoHistory, deleteVideo } from '../services/allAPI';


function Viewcard({displayvideo,setDeleteVideoStatus}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true)
    const {caption,embedLink}=displayvideo
    let time= new Date()
    let timestamp=new Intl.DateTimeFormat("en-US",{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(time)
    console.log(timestamp);
    let videoDetails={
      caption,timestamp,embedLink
    }
    await addtoHistory(videoDetails)
  }

  const removeVideo =async(id)=>{
     const response= await deleteVideo(id)
     setDeleteVideoStatus(true)

  }

  // card drag

  const cardDrag=(e,id)=>{
    console.log(`id of videocard is ${id}`);
    e.dataTransfer.setData("videoId",id)
  }



  return (
    <div className='mt-3  '>
        <Card style={{ width: '18rem' }} className='ps-3' draggable onDragStart={(e)=>cardDrag(e,displayvideo?.id)} >
      <Card.Img variant="top" onClick={handleShow} src={displayvideo.img_url} style={{height:"350px"}} />
      <Card.Body className='d-flex justify-space-between'>
        <Card.Title className='mt-3'>{displayvideo.caption}</Card.Title>
        <button type="button" onClick={()=>removeVideo(displayvideo?.id)} class="btn btn-danger ms-5"><i class="fa-solid fa-trash"></i></button>
      </Card.Body>
    </Card>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayvideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="480" height="391" src={`${displayvideo.embedLink}?autoplay=1`} title="Gojo&#39;s Second Domain Expansion | Jujutsu Kaisen Season 2 Episode 9 | 4K 60FPS | Eng Sub" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Viewcard