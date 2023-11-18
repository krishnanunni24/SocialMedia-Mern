import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { reportPost } from '../../../actions/PostActions';

function ReportModal({ openModal, closeModal ,postId}) {
  
    const [selectedReason, setSelectedReason] = useState('');
    const reasons = ['Fake News',"It's Spam",'Bullying or Harassment', 'Inappropriate Content',"Hate speach or symbols" ,"Suicidal or self-injury","Nudity or Sexual activity"];
    const handleReasonSelection = (reason) => {
        setSelectedReason(reason);
      };  
      const dispatch = useDispatch()
      const userId=useSelector((state)=>state.authReducer.authData._id)
      const handleReportSubmit = () => {
        // Handle report submission logic
        const data ={
          reason:selectedReason,
          userId:userId,
          postId:postId,
        }
     
        dispatch(reportPost(data))
        closeModal();
      };

    
  return (
    <>
     <Modal opened={openModal} onClose={closeModal}  centered>
     <h2 className="text-lg font-bold mb-4 rounded-lg p-2">Why are you reporting this post?</h2>
        <div className='flex-col'>
        {reasons.map((reason,id) => (
           <div key={id} onClick={()=>{handleReasonSelection(reason)}} className={`text-md font-mono mb-4 ${selectedReason === reason ? "bg-blue-300 hover:bg-blue-300" : ""}  hover:bg-blue-100 rounded-md p-2`}>
            {reason}
           </div>
          ))}
        </div>
        <div className="mt-4">
          <Button className='bg-accent' onClick={handleReportSubmit} disabled={!selectedReason}>
            Submit Report
          </Button>
          <Button variant="outline" onClick={closeModal} className="ml-2">
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ReportModal;
