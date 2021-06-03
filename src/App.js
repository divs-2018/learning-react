import React, { useState, useRef, useEffect } from 'react';
import ItemList from './ItemList';
import uuidv4 from 'uuid/v4' 

const LOCAL_STORAGE_KEY = 'ItemApp.ItemList'

function App() {
  //New state variable to keep track of items
  const [items, setItems ] = useState([])
  const itemNameRef = useRef()

  //event listener function to add items to list
  function handleAddItem(e){
    const name = itemNameRef.current.value    //store input in a variable
    if(name === '') return;                   //empty string
    setItems( prevItems =>{
      return [...prevItems, {id: uuidv4(), name: name, complete: false}]
    })
    itemNameRef.current.value = null          //clear input box after add
  }

  //Loading Old Items
  useEffect(() =>{
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setItems(storedItems)
  }, [])

  //Storing Old Items, in case of refresh
  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function toggleItem(id){
    const newItems = [...items] //copy
    const item = newItems.find(todo => todo.id === id)
    item.complete = !(item.complete)
    setItems(newItems )
  }

  function handleClearBoughtItems(){
    const clearedItems = items.filter(item => !(item.complete))
    setItems(clearedItems)
  }


  return (
    <>
      <ItemList itemsList={items} toggleItem = {toggleItem} />
      <input ref={itemNameRef} type="text" />
      <button onClick={handleAddItem}> + Add Item</button>
      <button onClick={handleClearBoughtItems}>Clear Bought Items </button>
      <div> {items.filter(item => !(item.complete)).length} left to buy</div>
    </>
    
  )
}

export default App;
