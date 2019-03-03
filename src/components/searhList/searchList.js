import React from 'react';
import './searchList.css';
import Aux from '../../hoc/Aux';

const searchList = (props) => {
  let albumList = ''
    if(props.albumList !== null){
         albumList = props.albumList.map((cur,index)=>{
         return(
          <tr key={index} className='listItem' onClick={()=>props.click(index)}>
            <td>{cur.name}</td>
            <td>{cur.artists[0].name}</td>
            <td>{cur.album.name}</td>
          </tr>                     
         )
       })
     } else {
         return(
          albumList = ''
         )
     }
     return(
       <Aux>
         {albumList}
       </Aux>
      )
}
export default searchList