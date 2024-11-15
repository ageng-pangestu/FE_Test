import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { selectItem, selectAllItems } from "../../../store/slices/itemsSlice";
import { addTask } from "../../../store/slices/taskSlice";

const TaskModal: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const items = useSelector((state: { items: { items: Item[] } }) => state.items.items);
  const selectedItems = useSelector((state: { items: { selectedItems: number[] } }) => state.items.selectedItems);

  const dispatch = useDispatch();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleSelectItem = (id: number) => {
    dispatch(selectItem(id));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectAllItems());
    } else {
      dispatch(selectAllItems());
    }
  };

  const handleAddToTask = () => {
    const selectedItemsData = items.filter((item) => selectedItems.includes(item.id));
    dispatch(addTask(selectedItemsData));
    alert("Items added to task!");
    handleCloseModal();
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="App">
      {/* Button to open the modal */}
      <button className="btn btn-warning" onClick={handleOpenModal}>
        Tambah Barang
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Barang</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>

              <div className="modal-body">
                {/* Search Bar */}
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Cari kode/ nama barang" value={searchTerm} onChange={handleSearch} />
                  <button className="btn btn-outline-secondary">&#128269;</button>
                </div>

                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" onChange={handleSelectAll} />
                      </th>
                      <th>Kode Barang</th>
                      <th>Nama Barang</th>
                      <th>Merk</th>
                      <th>Jenis Barang</th>
                      <th>Gudang</th>
                      <th>Total Stock (Pcs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => toggleSelectItem(item.id)} />
                        </td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.type}</td>
                        <td>{item.warehouse}</td>
                        <td>{item.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                        Prev
                      </button>
                    </li>
                    {[...Array(totalPages).keys()].map((num) => (
                      <li key={num} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(num + 1)}>
                          {num + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={handleCloseModal}>
                  Batal
                </button>
                <button type="button" className="btn btn-warning" onClick={handleAddToTask} disabled={selectedItems.length === 0}>
                  Tambah ke Daftar Permintaan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskModal;
