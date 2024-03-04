import { ToastContainer, toast } from "react-toastify";

const EditModal = ({ setEditModal, setEditItem, editItem, handleBook }) => {
  function handleEditModal() {
    //stateyi güncelleyecek fonksiyon
    handleBook();
    toast.success("İsim ve Tarih Başarıyla Güncellendi", { autoClose: 2500 });
  }

  return (
    <div className="edit-modal ">
      <div className="editing">
        <h5 className="mb-3 align-items-center">İsmi Düzenle</h5>
        <input
          value={editItem.title}
          type="text"
          className="form-control shadow"
          onChange={(e) =>
            setEditItem({
              ...editItem,
              title: e.target.value,
              date: new Date().toLocaleString(),
            })
          }
        />
        <div className=" d-flex  justify-content-between mt-5">
          <button
            onClick={() => setEditModal(false)}
            className="btn btn-primary mx-2"
          >
            Vazgeç
          </button>
          <button
            onClick={() => {
              handleEditModal(),
                // modalı kapat
                setEditModal(false);
            }}
            className="btn btn-success mx-2"
          >
            Kaydet
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditModal;
