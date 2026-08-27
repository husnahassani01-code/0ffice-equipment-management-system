import { BsJustifyLeft, BsExclamationTriangle, BsPersonCircle, BsBoxSeam, 
   BsBoxes, BsArrowLeftRight, BsArrowReturnLeft,BsClipboardCheck} from 'react-icons/bs'

function main() {
  

  return (
    <div className='content'>
      <div className='dash'>
      <h2>Dashbord</h2>
      <p>Welcome back</p>
      </div>

      <div className='container'>
      <div className="cardContainer">
        <div className="card">
          <div><BsPersonCircle className='icon1'></BsPersonCircle></div>
        </div>
        <div className='assets'>
          <p>Assigned Assets</p>
          <strong id='number'>340</strong>
          <p id='detail' style={{color: "green"}}>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsClipboardCheck className='icon2'></BsClipboardCheck></div>
        </div>
        <div className='assets'>
          <p>Total Assets</p>
          <strong id='number'>200</strong>
          <p id='detail'>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsBoxes className='icon3'></BsBoxes></div>
        </div>
        <div className='assets'>
          <p>Available Assets</p>
          <strong id='number'>400</strong>
          <p id='detail'>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsBoxSeam  className='icon4'></BsBoxSeam></div>
        </div>
        <div className='assets'>
          <p>Total Stock Item</p>
          <strong id='number'>220</strong>
          <p id='detail'>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsBoxSeam className='icon5'></BsBoxSeam></div>
        </div>
        <div className='assets'>
          <p>Low Stock Item</p>
          <strong id='number'>15</strong>
          <p id='detail' style={{color: "rgb(230, 63, 188)"}}>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsArrowReturnLeft className='icon6'></BsArrowReturnLeft></div>
        </div>
        <div className='assets'>
          <p>Total Returns</p>
          <strong id='number'>120</strong>
          <p id='detail'>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsExclamationTriangle className='icon7' ></BsExclamationTriangle></div>
        </div>
        <div className='assets'>
          <p>Damage/Loose</p>
          <strong id='number'>10</strong>
          <p id='detail' style={{color: "red"}}>View details..  </p>
        </div>
      </div>

      </div>

      <div className='accessContainer'>
        <div className='access'>
          <BsJustifyLeft className='icon' style={{cursor: "pointer"}}></BsJustifyLeft>
          <strong>Quick Access</strong>
        </div>
        <div className="cardAccess">
          <div className="cardInfo">
            <div className="card">
              <div><BsClipboardCheck className='icon1'></BsClipboardCheck></div>
            </div>
            <div className='assets'>
              <p style={{color:"green"}}>Issue Assets</p>
            </div>
         </div>

         <div className="cardInfo" style={{backgroundColor: "rgb(220, 238, 150)"}}>
            <div className="card">
              <div><BsArrowLeftRight className='icon1' style={{color:"blue"}}></BsArrowLeftRight></div>
            </div>
            <div className='assets'>
              <p>Transfers Assets</p>
            </div>
         </div>

         <div className="cardInfo" style={{backgroundColor: "rgb(238, 193, 232)"}}>
            <div className="card">
              <div><BsArrowReturnLeft className='icon1' style={{color:"grey"}}></BsArrowReturnLeft></div>
            </div>
            <div className='assets'>
              <p>Return Assets</p>
            </div>
         </div>

         <div className="cardInfo" style={{backgroundColor: "rgb(213, 219, 213)"}}>
            <div className="card">
              <div><BsPersonCircle className='icon1' style={{color:"orange"}}></BsPersonCircle></div>
            </div>
            <div className='assets'>
              <p>Assigned Assets</p>
            </div>
         </div>

          <div className="cardInfo" children style={{width:"610px", backgroundColor:"pink"}}>
            <div className="card">
              <div><BsExclamationTriangle className='icon1' style={{color:"red"}}></BsExclamationTriangle></div>
            </div>
            <div className='assets'>
              <p style={{color:"red"}}>Assigned Assets</p>
            </div>
         </div>
        </div>


      </div>

     
    </div>
  )
}

export default main