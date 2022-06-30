import { useState, useRef, useEffect } from 'react'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'

import styles from './Create.module.css'
import Div100vh from 'react-div-100vh'

const Create = () => {
  const [listName, setListName] = useState('')
  const [newItem, setNewItem] = useState('')
  const [listItems, setListItems] = useState([])
  const [sharedUsers, setSharedUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const nameInputRef = useRef()
  const itemInputRef = useRef()

  const handleSave = async () => {
    if(loading) return

    setLoading(true)

    if(listName.length === 0){
      nameInputRef.current.focus()
      setLoading(false)
      return
    }

    if(listItems.length === 0){
      itemInputRef.current.focus()
      setLoading(false)
      return
    }

    let itemsNoOpen = listItems

    itemsNoOpen.forEach(item => {
      delete item.open
    })

    let listObj = {
      name: listName,
      items: itemsNoOpen,
      ownerUid: auth.currentUser ? auth.currentUser.uid : '',
      shared: sharedUsers,
      createdAt: serverTimestamp()
    }

    try{
      const docRef = await addDoc(collection(db, 'lists'), listObj)

      setListName('')
      setListItems([])
      setSharedUsers([])
  
      window.location.pathname = `/list/${docRef.id}`
    }catch(err){
      console.log(err)
    }

    setLoading(false)
  }

  return(
    <Div100vh className='globalContainer' style={{minHeight: 'unset'}}>
      <div className='globalWrapper'>
        <div
          className={styles.listNameInputWrapper}
          onClick={() => nameInputRef.current.focus()}
        >
          <input
            type='text'
            placeholder='List Name'
            value={listName}
            onChange={(e) => setListName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
            maxLength={16}
            className={styles.listNameInput}
            ref={nameInputRef}
          />
        </div>
        <div className={styles.cardSection}>
          <div className={styles.metadataCard}>
            <div
              className={styles.metadataText}
            >
              {listItems.length} item{listItems.length === 1 ? '' : 's'}
            </div>
          </div>
          <div className={styles.shareCard}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height='2rem' width='2rem' fill='rgb(66, 171, 252)'>
              <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/>
            </svg>
          </div>
        </div>
        <div className={styles.itemsContainer}>
          <div className={styles.itemsWrapper}>
            {
              listItems.map((item, index) => {
                return(
                  <div
                    key={index}
                    className={styles.item}
                  >
                    <div
                      style={{position: 'absolute', top: '50%', left: '.7rem', transform: 'translateY(-50%)', cursor: 'pointer', pointerEvents: item.open ? 'all' : 'none' , opacity: `${item.open ? 1 : 0}`, transition: '.5s ease-in-out', backgroundColor: 'rgba(255, 0, 0, .2)', height: '1.25rem', width: '1.25rem', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                      onClick={() => setListItems(listItems.filter((_, i) => index !== i))}
                    >
                      <div
                        style={{width: '.8rem', height: '.21rem', borderRadius: '1rem', backgroundColor: 'var(--color-red)'}}
                      />
                    </div>                      
                    <div
                      style={{transform: `translateX(${item.open ? '3.2rem' : '0'})`}}
                      className={styles.itemName}
                      onClick={() => {
                        setListItems(listItems.map((iitem, iindex) => {
                          if(index === iindex) {
                            return {
                              ...item,
                              open: !iitem.open
                            }
                          }
                          return iitem
                        }))
                      }}
                    >
                      {item.name}
                    </div>
                    <div className={styles.itemUnitCountWrapper}>
                      <input
                        onFocus={() => {
                          const newListItems = [...listItems]
                          newListItems[index].units = ''
                          setListItems(newListItems)

                        }}
                        onBlur={() => {
                          if(item.units === ''){
                            const newListItems = [...listItems]
                            newListItems[index].units = 1
                            setListItems(newListItems)
                          }
                        }}
                        className={styles.itemUnitCountInput}
                        style={{width: `${item.units.length === 2 ? 3 : 2}ch`}}
                        type='text'
                        inputMode='numeric'
                        value={item.units}
                        onChange={(e) => {
                          const newListItems = [...listItems]
                          newListItems[index].units = e.target.value
                          setListItems(newListItems)
                        }}
                        maxLength={2}
                      />
                    </div>
                  </div>
                )
              })
            }
          </div>
          {
            listItems.length < 100 &&
            <div className={styles.newItemWrapper}>
              <div
                className={styles.addBtn}
                onClick={() => {
                  if(newItem.length > 0){
                    setListItems([...listItems, {name: newItem, units: '1', open: false, checked: false}])
                    setNewItem('')
                  }
                  itemInputRef.current.focus()
                }}
              >
                <div style={{height: '.8rem', width: '.15rem', backgroundColor: 'var(--color-dark-variant)', borderRadius: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
                <div style={{width: '.8rem', height: '.15rem', backgroundColor: 'var(--color-dark-variant)', borderRadius: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
              </div>
              <form
              style={{flexGrow: 1}}
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (newItem.length > 0) {
                      setListItems([...listItems, {name: newItem, units: '1', open: false, checked: false}])
                      setNewItem('')
                    }
                  }}
              >
                <input
                  type='text'
                  placeholder='New item'
                  value={newItem}
                  onChange={(e) => {
                    setNewItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                  }}
                  maxLength={30}
                  className={styles.newItemInput}
                  ref={itemInputRef}
                />
                </form>
            </div>
          }
        </div>
        <div
          className={styles.saveBtn}
          style={{opacity: loading ? .5 : 1}}
          onClick={() => handleSave()}
          >
          Save
        </div>
          {
            !auth.currentUser &&
            <div className={styles.noteText}>
              Note: Create an account to make the list collaborative. <br/> You can still share the list's link with others.
            </div>
          }
      </div>
    </Div100vh>
  )
}

export default Create