import {BsBoxSeam,BsBoxes,BsThreeDotsVertical, BsSearch} from 'react-icons/bs'
import laptop from "../assets/laptop.jpeg"
import printer from "../assets/printer.png"
import chair from "../assets/chair.webp"
import table from "../assets/table.jpeg"
import ream from "../assets/ream.webp"
import color from "../assets/color.jpeg"
import mouse from "../assets/mouse.webp"
import './stock.css'

const stock = () => {
  return (
           <div className="stockContainer">
                <div className="stockHead">
                   <div className="">
                      <h2>Stock management</h2>
                      <p>Manage and track your office stock items</p>
                   </div> 
                   <div className="button">
                      <button className="btn1">+ Add Stock</button>
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
                        <td className='tdI'>
                            <img src={laptop} className='stockImage'/>
                            <div>
                                <strong>Dell Latitude 5440</strong>
                                <p>14 Laptop</p>
                            </div>
                        </td>
                        <td>IT Equipment</td>
                        <td>
                            IT-LAP-5440
                        </td>
                        <td>
                            <strong>14</strong>
                            <p>unit</p>
                        </td>
                        <td className='tdG'>In Stock</td>
                        <td>Main Store</td>
                        <td>01 Sept 2026</td>
                        <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                    </tr>
                    <tr>
                        <td className='tdI'>
                            <img src={printer} className='stockImage'/>
                            <div>
                                <strong>Hp LaserJet Pro M404</strong>
                                <p>Monocrome Printer</p>
                            </div>
                        </td>
                        <td>IT Equipment</td>
                        <td>
                            PRN-M404
                        </td>
                        <td>
                            <strong>06</strong>
                            <p>unit</p>
                        </td>
                        <td className='tdB'>In Stock</td>
                        <td>Main Store</td>
                        <td>01 Sept 2026</td>
                        <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                    </tr>
                    <tr>
                        <td className='tdI'>
                            <img src={chair} className='stockImage'/>
                            <div>
                                <strong>Ergonomic Office Chair</strong>
                                <p>Mesh Back Chair</p>
                            </div>
                        </td>
                        <td>Office Furniture</td>
                        <td>
                            CHR-EM-001
                        </td>
                        <td>
                            <strong>08</strong>
                            <p>unit</p>
                        </td>
                        <td className='tdG'>In Stock</td>
                        <td>Furniture Store</td>
                        <td>24 Aug 2026</td>
                        <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                    </tr>
                    <tr>
                        <td className='tdI'>
                            <img src={table} className='stockImage'/>
                            <div>
                                <strong>Office Desk</strong>
                                <p>Wooden Top Desk</p>
                            </div>
                        </td>
                        <td>Office Furniture</td>
                        <td>
                            DSK-WD-140
                        </td>
                        <td>
                            <strong>15</strong>
                            <p>unit</p>
                        </td>
                        <td className='tdB'>In Stock</td>
                        <td>Furniture Store</td>
                        <td>31 Aug 2026</td>
                        <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                    </tr>
                    <tr>
                        <td className='tdI'>
                            <img src={ream} className='stockImage'/>
                            <div>
                                <strong>A4 Paper Ream</strong>
                                <p>80gsm</p>
                            </div>
                        </td>
                        <td>Consumables</td>
                        <td>
                            CMP-PPR-A4
                        </td>
                        <td>
                            <strong>07</strong>
                            <p>unit</p>
                        </td>
                        <td className='tdR'>Low Stock</td>
                        <td>Main Store</td>
                        <td>10 Oct 2026</td>
                        <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                    </tr>
                    <tr>
                        <td className='tdI'>
                            <img src={color} className='stockImage'/>
                            <div>
                                <strong>Hp 203A Toner</strong>
                                <p>Black Toner Cartrige</p>
                            </div>
                        </td>
                        <td>Consumables</td>
                        <td>
                            TRN-203A-BK
                        </td>
                        <td>
                            <strong>0</strong>
                            <p>unit</p>
                        </td>
                        <td className='tdY'>Out Of Stock</td>
                        <td>Main Store</td>
                        <td>28 Aug 2026</td>
                        <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                    </tr>
                    <tr>
                        <td className='tdI'>
                            <img src={mouse} className='stockImage'/>
                            <div>
                                <strong>Logitech MK207</strong>
                                <p>Wireless Keyboard & Mouse</p>
                            </div>
                        </td>
                        <td>Accessories</td>
                        <td>
                            ACC-MK270
                        </td>
                        <td>
                            <strong>11</strong>
                            <p>unit</p>
                        </td>
                        <td className='tdG'>In Stock</td>
                        <td>Main Store</td>
                        <td>29 Aug 2026</td>
                        <td><BsThreeDotsVertical></BsThreeDotsVertical></td>
                    </tr>
                    <p id='tp'>Showing 1to 8 of 142 items</p>
                    
                </table>
            </div>
   
  )
}

export default stock
