import React from 'react'
import { useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    setpasswordArray(passwords);
    console.log(passwords);
  }

  useEffect(() => {
    getPasswords();
  }, [])

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      // toast.success('Password Saved Successfully..!', {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: Bounce,
      // })
      // #####################################
      let isEdit = passwordArray.some(item => item.id === form.id);

      if (isEdit) {
        await fetch("http://localhost:3000/", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });

        setpasswordArray(passwordArray.map(item =>
          item.id === form.id ? form : item
        ));

        toast.success('Password Updated Successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const id = uuidv4();
        const newPassword = { ...form, id };

        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPassword)
        });

        setpasswordArray([...passwordArray, newPassword]);

        toast.success('Password Saved Successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      setform({ site: "", username: "", password: "" });

    } else {
      toast.warning('Please enter valid credentials', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
  // #####################################

  const deletePassword = async (id) => {
    console.log("Deleting password with id:", id)
    let c = confirm("Do you really want to delete this password..?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      // setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast.success('Password deleted Successfully..!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }
  }

  const editPassword = (id) => {
    console.log("Editing password with id:", id)
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast('Copied to clipboard..!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    })
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="fixed left-0 top-0 z-[-2] min-h-screen w-full bg-green-100 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      {/* <div className="p-3 mycontainer md:mycontainer min-h-[89vh]"> */}
      <div className="p-6 mycontainer md:mycontainer min-h-[89vh] 
bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl">
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-shadow-lg text-center mb-2 '>Yor Own Password Manager</p>
        <div className='text-black flex flex-col p-4 gap-8 items-center '>
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' 
          className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 md:w-1/4 w-full p-4 py-1' type="password" name="password" id="password" />
          </div>
          <button onClick={savePassword} className='flex justify-center ites-center gap-2 border border-green-900 bg-green-500 hover:bg-green-300 rounded-full px-8 py-2 w-fit text-lg font-bold hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 cursor-pointer'>
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>
        <div className="passwords container md:container">
          <h2 className=' font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          <div className="overflow-x-auto">
            {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-green-200'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'><a
                        href={item.site.startsWith("http") ? item.site : `https://${item.site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.site}
                      </a>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "padding": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <span>{item.username}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "padding": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'><span>{"*".repeat(item.password.length)}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "padding": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    {/* ############################## */}
                    <td className='flex items-center justify-center py-2 border border-white text-center'>
                      <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover">
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/xyfswyxf.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                    {/* ################################# */}
                  </tr>
                })}
              </tbody>
            </table>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager