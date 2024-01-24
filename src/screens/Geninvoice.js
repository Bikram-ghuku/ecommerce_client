import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import favicon from '../ico.png'
import './css/genInvoice.css'
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { jsPDF} from 'jspdf'
import { toPng } from 'html-to-image'


function printBill(oid) {
    const printContents = document.getElementsByClassName("bill-wrapper");
    const printEle = printContents[0]
    toPng(printEle).then((dataUrl) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps= pdf.getImageProperties(dataUrl);

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, 'PNG', 5, 5, pdfWidth-10, pdfHeight-10);
        
        pdf.save("invoice_"+oid+".pdf");
    })

}

function Geninvoice() {
    const {oid} = useParams()
    const [billDetails, setBillDetails] = useState({})
    const [detLoaded, setDetLoaded] = useState(false)
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ADD+'/payment/getBill', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({oid: oid})
        })
        .then(res => res.json())
        .then(data => {
            setBillDetails(data)
            console.log(data)
            setDetLoaded(true)
        }).catch(err => {
            console.log(err)
            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <div>
        <Navbar/>
        <h1>Invoice for orderID: {oid}</h1>
        <div className="bill-main">
            <div className="bill-wrapper">
                <div className="bill-title">
                    <img src={favicon} alt="logo" className="bill-logo"/>
                    <div className="bill-heading">Tax Invoice/Bill of Supply/Cash Memo</div>
                </div>
                <div className="bill-address">
                    <div className="bill-address-seller">
                        Seller: <div className="bill-address-seller-name">
                            {billDetails.sellerName}
                        </div>
                    </div>
                    <div className="bill-address-buyer">
                        Buyer: <div className="bill-address-buyer-name">{billDetails.buyerName}</div>
                        <div className="bill-address-buyer-address">
                            {billDetails.address+" ,"+billDetails.city}<br/>
                            {billDetails.city+" ,"+billDetails.country}<br/>
                            {billDetails.pin}<br/>
                            <div style={{fontWeight: "500", fontSize:"1.5vh", display:"inline-block"}}>Phone No:</div>{billDetails.phone}<br/>
                        </div>
                    </div>
                </div>
                <div className="bill-nos">
                    <div className="billno-paymentid-wrapper">PaymentID: <div className="bill-no-paymentid">{billDetails.paymentId}</div></div>
                    <div className="billno-orderid-wrapper">OrderID: <div className="bill-no-orderid">{oid}</div></div>
                </div>
                <div className="bill-table">
                    <Table>
                        <TableHead>
                            <TableRow style={{fontWeight:"900"}}>
                                <TableCell>Sl no</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell><b>{billDetails.pdtName}</b><br/>{billDetails.desc}</TableCell>
                                <TableCell>{"₹"+billDetails.price}</TableCell>
                                <TableCell>{billDetails.qty}</TableCell>
                                <TableCell>{"₹"+billDetails.price*billDetails.qty}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                {!detLoaded ? <CircularProgress/> : null}
                <div className="bill-total">
                    <div className="bill-total-amt">
                        Total Amount: <div className="bill-tot-amt-value">{"₹"+billDetails.price*billDetails.qty}</div>
                    </div>
                    <div className="bill-total-amt-valuw"></div>
                </div>
            </div>
        </div>
        <button onClick={() => printBill(oid)} className='btn btn-primary'>Print</button>
    </div>
  )
}

export default Geninvoice