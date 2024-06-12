import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState()
  const [age, setAge] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3001/getUsers')
    .then((users)=>{
      console.log(users)
      setUsers(users.data)
    }).catch(err => console.log(err))
  },[])

  const Submit = ()=>{
    axios.post('http://localhost:3001/createUser',{name,age})
    .then((users)=>{
      window.location.reload()
      console.log(users)
    }).catch(err => console.log(err))
  }

  const Delete = (id)=>{
    axios.delete(`http://localhost:3001/${id}`)
    .then((users)=>{
      window.location.reload()
      console.log(users)
    }).catch(err => console.log(err))
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2>FIRST MERN (MONGODB node react and express) APP</h2>
      {
        users.map((user)=>{
          return <div>
            <h3>{user.name} </h3>
            <h3>{user.age}</h3>
            <button className='border-8 w-[4rem]' onClick={Delete(user._id)}>delete</button>
          </div>
        })
      }
      <input className='border-2' type="text" onChange={(e)=>{setName(e.target.value)}}  />
      <input className='border-2' type="text" onChange={(e)=>{setAge(e.target.value)}} />
      <button onClick={Submit}>Create User</button>
      
    </div>
  )
}

export default App
