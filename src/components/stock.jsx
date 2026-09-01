import {BsBoxSeam,BsBoxes,BsThreeDotsVertical, BsSearch} from 'react-icons/bs'

function stock(){
    return(
        <div className="stockContainer">
            <div className="stockHead">
               <div className="">
                  <h3>Stock Management</h3>
                  <p>Manage and track your office stock items</p>
               </div> 
               <div className="button">
                  <button className="btn1">Add Stock Item</button>
               </div>
            </div>
            <div className="cardItem">
                <div className="CardItems">
                    <div>
                       <BsBoxSeam  className='icon4'></BsBoxSeam>
                    </div>
                    <div className='cardContent'>
                        <p>Total Item</p>
                        <strong id='number'>220</strong>
                        <p>All stock items</p>
                    </div>
                </div>
                <div className="CardItems">
                    <div>
                       <BsBoxes className='icon4'></BsBoxes>
                    </div>
                    <div className='cardContent'>
                        <p>In stock</p>
                        <strong id='number'>100</strong>
                        <p>Available items</p>
                    </div>
                </div>
                <div className="CardItems">
                    <div>
                       <BsBoxSeam className='icon4'></BsBoxSeam>
                    </div>
                    <div className='cardContent'>
                        <p>Low stock</p>
                        <strong id='number'>20</strong>
                        <p>items running low</p>
                    </div>
                </div>
            </div>
            <div className='stockSearch'>
                <div className='searchStock'>
                    <BsSearch id='search1'></BsSearch>
                    <input type="text" placeholder='Search stock items...' id='inputSearch'/>
                    <button className='btnS'>All Categories</button>
                    <button className='btnS'>All Status</button>
                    <button className='btn2'>Filters</button>
                </div>
                <button className='btn2'>Export</button>
            </div>
            <table className='tableStock'>
                <tr>
                    <th>ITEMS</th>
                    <th>CATEGORY</th>
                    <th>SKU</th>
                    <th>QUANTITY</th>
                    <th>STATUS</th>
                    <th>LOCATION</th>
                    <th>LAST UPDATED</th>
                    <th>ACTIONS</th>
                </tr>
                <tr>
                    <td>
                        <strong>Dell Latitude 5440</strong>
                        <p>14 Laptop</p>
                    </td>
                    <td>IT Equipment</td>
                    <td>
                        IT-LAP-5440
                    </td>
                    <td>
                        <strong>14</strong>
                        <p>unit</p>
                    </td>
                    <td>In Stock</td>
                    <td>Main Store</td>
                    <td>01 Sept 2026</td>
                    <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                </tr>
                <tr>
                    <td>
                        <strong>Hp LaserJet Pro M404</strong>
                        <p>Monocrome Printer</p>
                    </td>
                    <td>IT Equipment</td>
                    <td>
                        PRN-M404
                    </td>
                    <td>
                        <strong>06</strong>
                        <p>unit</p>
                    </td>
                    <td>In Stock</td>
                    <td>Main Store</td>
                    <td>01 Sept 2026</td>
                    <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                </tr>
                <tr>
                    <td>
                        <strong>Ergonomic Office Chair</strong>
                        <p>Mesh Back Chair</p>
                    </td>
                    <td>Office Furniture</td>
                    <td>
                        CHR-EM-001
                    </td>
                    <td>
                        <strong>08</strong>
                        <p>unit</p>
                    </td>
                    <td>Low Stock</td>
                    <td>Furniture Store</td>
                    <td>24 Aug 2026</td>
                    <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                </tr>
                <tr>
                    <td>
                        <strong>Office Desk</strong>
                        <p>Wooden Top Desk</p>
                    </td>
                    <td>Office Furniture</td>
                    <td>
                        DSK-WD-140
                    </td>
                    <td>
                        <strong>15</strong>
                        <p>unit</p>
                    </td>
                    <td>In Stock</td>
                    <td>Furniture Store</td>
                    <td>31 Aug 2026</td>
                    <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                </tr>
                <tr>
                    <td>
                        <strong>A4 Paper Ream</strong>
                        <p>80gsm</p>
                    </td>
                    <td>Consumables</td>
                    <td>
                        CMP-PPR-A4
                    </td>
                    <td>
                        <strong>07</strong>
                        <p>unit</p>
                    </td>
                    <td>Low Stock</td>
                    <td>Main Store</td>
                    <td>10 Oct 2026</td>
                    <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                </tr>
                <tr>
                    <td>
                        <strong>Hp 203A Toner</strong>
                        <p>Black Toner Cartrige</p>
                    </td>
                    <td>Consumables</td>
                    <td>
                        TRN-203A-BK
                    </td>
                    <td>
                        <strong>0</strong>
                        <p>unit</p>
                    </td>
                    <td>Out Of Stock</td>
                    <td>Main Store</td>
                    <td>28 Aug 2026</td>
                    <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                </tr>
                <tr>
                    <td>
                        <strong>Logitech MK207</strong>
                        <p>Wireless Keyboard & Mouse</p>
                    </td>
                    <td>Accessories</td>
                    <td>
                        ACC-MK270
                    </td>
                    <td>
                        <strong>11</strong>
                        <p>unit</p>
                    </td>
                    <td>In Stock</td>
                    <td>Main Store</td>
                    <td>29 Aug 2026</td>
                    <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                </tr>
                <p id='tp'>Showing 1 to 3 of 142 items</p>

            </table>
        </div>


    )
}

export default stock