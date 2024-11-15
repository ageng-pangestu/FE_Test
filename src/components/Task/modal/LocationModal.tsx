import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { addSelectedLocation } from "../../../store/slices/taskSlice";

interface LocationModalProps {
  itemCode: string;
}

const LocationModal: React.FC<LocationModalProps> = ({ itemCode }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const locationData = useSelector((state: RootState) => state.location.locations);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCheckboxChange = (item: any) => {
    setSelectedItems((prevSelectedItems) => (prevSelectedItems.includes(item) ? prevSelectedItems.filter((selected) => selected !== item) : [...prevSelectedItems, item]));
  };

  const handleAddToRequestList = () => {
    selectedItems.forEach((item) => dispatch(addSelectedLocation({ ...item, itemCode }))); // Menyertakan itemCode
    setSelectedItems([]);
    setShowModal(false);
  };

  return (
    <div className="App">
      <button className="btn btn-outline-secondary" onClick={handleOpenModal}>
        + Lokasi
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Barang</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="container mt-4">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <th>Nama Lokasi</th>
                        <th>Gudang</th>
                        <th>Jenis</th>
                        <th>Volume</th>
                        <th>Deskripsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {locationData.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input type="checkbox" checked={selectedItems.includes(item)} onChange={() => handleCheckboxChange(item)} />
                          </td>
                          <td>{item.locationName}</td>
                          <td>{item.warehouse}</td>
                          <td>{item.type}</td>
                          <td>{item.volume}</td>
                          <td>{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-secondary" onClick={handleCloseModal}>
                      Batal
                    </button>
                    <button className="btn btn-secondary" onClick={handleAddToRequestList} disabled={selectedItems.length === 0}>
                      Tambahkan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationModal;
