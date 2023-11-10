import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { addAllcategory, deleteCategory, getAllcategory, getAvideo, updateCategory } from '../services/allAPI';
import { Col, Row } from 'react-bootstrap';
import Viewcard from './Viewcard';

function Category() {
    const [show, setShow] = useState(false);
    const [category,setCategory]=useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName,setCategoryName]=useState('')

  const addcategory=async()=>{
    console.log(categoryName);
    if (categoryName){
      let body={
        categoryName,
        allVideos:[]
      }
      const response =await addAllcategory(body)
      console.log(response);
      if(response.status>=200 && response.status<300){
        alert('category added succesfully')
        // state value is made null
        setCategoryName("")
        handleClose()
        allCategory()


      }
      else{
        alert('something went wrong please try again')

      }

    }
    else{
      alert('please enter a category')
    }
    
  }

  const deletecategory=async(id)=>{
    await deleteCategory(id)
    allCategory()

  }

  const allCategory=async()=>{
    const{data}=await getAllcategory()
    // console.log(data);
    setCategory(data)
  }
  console.log(category);
  

  // function to prevebt reload

  const dragOver=(e)=>{
    e.preventDefault()
  }

  const videoDrop=async (e,categoryID)=>{
    console.log(`category id is ${categoryID}`);
    // to get the data send from videocard

    let videoID=e.dataTransfer.getData('videoId')
    console.log(videoID);
    const {data}=await getAvideo(videoID)
    // console.log(data);
   const selectedCategory = category.find(item=>item.id===categoryID)
   selectedCategory.allVideos.push(data)
   console.log(selectedCategory);

    await updateCategory(categoryID,selectedCategory)
    allCategory()

  


  }
  useEffect(()=>{
    allCategory()
  },[])



  return (
   <div>
        <div>
            <button onClick={handleShow} style={{backgroundColor:"orange",width:"200px", height:"30px",borderRadius:'6px' }}>Add New Category</button>
        </div>
        
         
          
            {category?.length>0?
            category?.map((item)=>(<div className='m-5 border border-secondary  rounded'>
               <div className='d-flex justify-content-between  rounded align-items-center' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item.id)} >
              <h6 className='text-danger'>{item?.categoryName}</h6>
              <button onClick={()=>deletecategory(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
              </div>
             <div>
               <Row>
                <Col>
                {item.allVideos?.length>0?
                  item?.allVideos?.map(card=>(<Viewcard displayvideo={card} isPresent={true} />
                  ))
                    : <p>nothing to display</p>
                    }
    
                </Col>
    
               </Row>
             </div>
             
          </div>


            ))
           
          : <p>no category</p>
          }
          

        

         <Modal
         show={show}
         onHide={handleClose}
         backdrop="static"
         keyboard={false}
       >
         <Modal.Header closeButton>
           <Modal.Title><i class="fa-solid fa-film text-warning"></i>Upload Category</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <form className='borderborder-secondary p-3 rounded '>
        
       <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Category Name</Form.Label>
         <Form.Control type="text" onChange={(e)=>{setCategoryName(e.target.value)}} placeholder="Enter category name" />
       </Form.Group>
      
    
          </form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             Cancel
           </Button>
           <Button onClick={()=>addcategory()}  variant="primary">Add</Button>
         </Modal.Footer>
       </Modal>
   </div>
  )
}

export default Category