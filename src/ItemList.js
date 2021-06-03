import React from 'react'
import Item from './Item'

export default function ItemList({itemsList , toggleItem}) {
    return (
        //Mapping all the items in the list array into an actual item object
        itemsList.map( item => {  //Es6 notation for function
            return <Item key={item.id} item={item} toggleItem={toggleItem} /> //Added key for efficiency purposes

        })
    )
}
