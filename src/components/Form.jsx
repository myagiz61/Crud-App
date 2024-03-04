import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "./EditModal.jsx";

const Form = ({}) => {
  const [inputValue, setInputValue] = useState("");
  const [crud, setCrud] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editModals, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  function handleSubmit(e) {
    setInputValue(e.target.value);
  }

  //eklemme işlemi
  function handleAdd(e) {
    e.preventDefault();

    if (inputValue === "") {
      toast.warn("Lütfen Formu Doldurunuz", {
        position: "top-right",
        autoClose: 2500,
      });

      return;
    }

    const newBook = {
      id: new Date().getTime(),
      title: inputValue,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    setCrud([...crud, newBook]);

    setInputValue("");

    toast.success("Başarıyla Eklendi", { autoClose: 2500 });
  }
  // silme işlemi
  function handleDelete(id) {
    const filteredItem = crud.filter((del) => del.id !== id);
    setCrud(filteredItem);
    toast.error("Başarıyla Silindi", {
      autoClose: 2500,
      position: "top-right",
    });
  }
  // okundu bilgisi
  function handleRead(item) {
    // dizinin kopyasını oluşturma
    const CloneCrud = [...crud];
    // sıra bulma
    const i = CloneCrud.findIndex((book) => item.id === book.id);

    // okundu bilgisini tersine çevir
    const updatedBook = { ...item, isRead: !crud[i].isRead };

    // diziden çıkar ve günceli koy
    CloneCrud.splice(i, 1, updatedBook);
    // state atma
    setCrud(CloneCrud);
  }

  // modal
  function handleModal(id) {
    setDeleteId(id);
    // modalı açma
    setShow(true);
  }

  function handleBook() {
    // sıra bulma
    const i = crud.findIndex((item) => item.id === editItem.id);

    // Kopya oluşturma
    const cloneOBject = [...crud];

    // eskiyi dizeden çıkar ve yenisini koy
    cloneOBject.splice(i, 1, editItem);
    // stateyi güncelle
    setCrud(cloneOBject);
    toast.success("Başarıyla güncellendi", { autoClose: 2500 });
  }
  return (
    <>
      <form className="d-flex  p-5 align-items-center gap-1">
        <input
          value={inputValue}
          type="text"
          className="form-control "
          onChange={handleSubmit}
        />
        <button onClick={handleAdd} className="btn btn-primary fw-bold">
          Ekle
        </button>
      </form>
      <div className="text-center">
        {crud.length === 0 && <h4>Henüz Herhangi Bir Kitap Eklenmedi</h4>}

        {crud.map((item) => (
          <div
            key={item.id}
            className="d-flex border shadow p-3 justify-content-between align-items-center"
          >
            <div>
              <h5
                style={{
                  textDecoration: item.isRead ? "line-through" : "none",
                }}
              >
                {item.title}
              </h5>
              <p>{item.date}</p>
            </div>
            <div>
              <button
                onClick={() => handleModal(item.id)}
                className="btn btn-danger mx-2"
              >
                Sil
              </button>
              <button
                onClick={() => {
                  // güncellenecek elemanı editmodal a gönder
                  setEditItem(item);
                  // modalı aç
                  setEditModal(true);
                }}
                className="btn btn-warning mx-2"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleRead(item)}
                className="btn btn-success mx-1"
              >
                {item.isRead ? "Okundu" : "Okunmadı"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* modal alanı */}
      {show && (
        <div className="confirm-modal">
          <div className="modal-inner shadow">
            <h5>Silmek İstiyormusunuz ?</h5>
            <button
              className="btn btn-danger mt-4"
              onClick={() => {
                setShow(false);
                handleDelete(deleteId);
              }}
            >
              Evet
            </button>
            <button
              className="btn btn-warning mt-4"
              onClick={() => setShow(false)}
            >
              Hayır
            </button>
          </div>
        </div>
      )}
      {/* modal alanı bitiş */}
      {editModals && (
        <EditModal
          setEditItem={setEditItem}
          editItem={editItem}
          setEditModal={setEditModal}
          handleBook={handleBook}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default Form;
