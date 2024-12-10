import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AddCategoryForm from '../../components/AdminPanel/AddCategoryForm/AddCategoryForm'

const AddCategory = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AddCategoryForm />
      </main>
      <Footer />
    </>
  )
}

export default AddCategory