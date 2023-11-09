import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadvideostatus}) {

  const [videos,setVideos]=useState({
    id:'',
    caption:'',
    img_url:'',
    embedLink:'',
  })
  console.log(videos);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const embedVideo=(e)=>{
    const {value}=e.target
    console.log(value.slice(-11));
    const link=`https://www.youtube.com/embed/${value.slice(-11)}`
    setVideos({...videos,embedLink:link})
  }
  const handleUpload=async()=>{
    const{id,caption,img_url,embedLink} =videos
    if(!id || !caption || !img_url || !embedLink){
      toast.warning('please fill your form')


    }
    else{
      const response= await uploadVideo(videos)
      console.log(response);
      if(response.status>=200 && response.status<300){
        setUploadvideostatus(response.data)
        toast.success('uploaded successfully')
        handleClose()
      }
      else{
        console.log(response);
        toast.error(' something went wrong please try again')
      }


    }
  }


  


  return (
    <div className='d-flex justify-content-between mt-3'>
        <div className='d-flex ms-5 text-dark'>
            <h5 className='mt-4'>Upload new video</h5>
            <button onClick={handleShow} type="button" class="btn btn-light ms-3" style={{backgroundColor:"transparent",border:'none'}}><i class="fa-solid fa-cloud-arrow-up fa-2x"></i></button>
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film text-warning"></i>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <form className='borderborder-secondary p-3 rounded '>
         <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Control  onChange={(e)=>setVideos({...videos,id:e.target.value})} type="text" placeholder="Enter video ID" />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Control  onChange={(e)=>setVideos({...videos,caption:e.target.value})} type="text" placeholder="Enter video caption" />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Control  onChange={(e)=>setVideos({...videos,img_url:e.target.value})} type="text" placeholder="Enter  image URL" />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Control   onChange={(e)=>embedVideo(e)} type="text" placeholder="Enter Youtube video  URL" />
      </Form.Group>

         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
        <div className='mt-4 me-5'>
            <Link to={'/watch-history'} style={{textDecoration:'none',color:"black"}}>Watch History</Link>
        </div>
        <ToastContainer position='top-center' theme='coloured' autoClose={2000}/>

    </div>
  )
}

export default Add