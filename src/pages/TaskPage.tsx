import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTasks, removeLocation } from "../store/slices/taskSlice";
import LocationModal from "../components/Task/modal/LocationModal";
import TaskModal from "../components/Task/modal/TaskModal";
import { RootState } from "../store/store";
import image1 from "../assets/image/setting-items.png";

function TaskPage() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const selectedLocations = useSelector((state: RootState) => state.task.selectedLocations);

  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(tasks.map(() => false));

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCheckedItems(tasks.map(() => newSelectAll));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
    setSelectAll(updatedCheckedItems.every((item) => item === true));
  };

  const handleClearAll = () => {
    dispatch(clearTasks());
  };

  const handleDeleteLocation = (itemCode: string, locationName: string) => {
    dispatch(removeLocation({ itemCode, locationName }));
  };

  return (
    <>
      <div className="container-fluid bg-light mt-4 shadow" style={{ width: "97%" }}>
        <div className="">
          <h5>Buat Task Baru</h5>
        </div>

        <div className="border-top border-bottom border-2 py-3">
          <div className="d-flex gap-4">
            <div>
              <label>Task No</label>
              <input type="text" value="SM-PB-001/24/2024" readOnly className="form-control" style={{ width: "100%", backgroundColor: "#E8EBEA" }} />
            </div>
            <div>
              <label>Ditugaskan ke</label>
              <select className="form-control" style={{ width: "130%" }}>
                <option>Pilih karyawan</option>
              </select>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center p-2">
          {tasks.length === 0 ? (
            <>
              <h6>Belum ada barang</h6>
              <p className="text-secondary">Silahkan tambah barang terlebih dahulu untuk mulai memindahkan</p>
              <TaskModal />
            </>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                  </th>
                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                    Kode Barang
                  </th>
                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                    Nama Barang
                  </th>
                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                    Merk
                  </th>
                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                    Jenis Barang
                  </th>
                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                    Gudang
                  </th>
                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                    Total Stock (Pcs)
                  </th>
                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                    Lokasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        <input type="checkbox" checked={checkedItems[index] || false} onChange={() => handleCheckboxChange(index)} />
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className={`btn dropdown-toggle d-flex align-items-center ${openDropdownIndex === index ? "btn-secondary" : "btn-outline-secondary"}`}
                            style={{
                              fontSize: "15px",
                              padding: "5px",
                              transform: openDropdownIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                            type="button"
                            onClick={() => toggleDropdown(index)}
                          ></button>
                          <span>{item.code}</span>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.type}</td>
                      <td>{item.warehouse}</td>
                      <td>{item.stock}</td>
                      <td>
                        <LocationModal itemCode={item.code} />
                      </td>
                    </tr>
                    {openDropdownIndex === index && (
                      <tr>
                        <td colSpan={8} className=" text-secondary">
                          {selectedLocations.filter((location) => location.itemCode === item.code).length === 0 ? (
                            <>
                              <div className="container p-3" style={{ backgroundColor: "#E8EBEA" }}>
                                <p className="text-dark" style={{ fontWeight: "" }}>
                                  Belum ada lokasi
                                </p>
                                <p className="text-secondary">
                                  silahkan pilih dan tambahkan lokasi dengan menekan <span className="text-dark">+ Lokasi</span> terlebih dahulu untuk memindahkan barang
                                </p>
                              </div>
                            </>
                          ) : (
                            <table className="table table-bordered" style={{ width: "50%" }}>
                              <thead>
                                <tr>
                                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                                    Lokasi Awal
                                  </th>
                                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                                    QTY (PCS)
                                  </th>
                                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                                    Satuan
                                  </th>
                                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                                    Volume
                                  </th>
                                  <th style={{ backgroundColor: "#E8EBEA" }} scope="col">
                                    Tindakan
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedLocations
                                  .filter((location) => location.itemCode === item.code)
                                  .map((location, index) => (
                                    <tr key={index}>
                                      <td>{location.locationName}</td>
                                      <td>
                                        <input type="number" />
                                      </td>
                                      <td>
                                        <select className="">
                                          <option>Pilih Satuan</option>
                                        </select>
                                      </td>
                                      <td>{location.volume} PCS</td>
                                      <td>
                                        <button className="btn btn-link" onClick={() => handleDeleteLocation(item.code, location.locationName)}>
                                          <img src={image1} style={{ width: "100%", maxWidth: "50px", height: "auto" }} alt="delete button" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="d-flex justify-content-end gap-2 py-3">
          <button className="btn btn-outline-secondary text-dark" onClick={handleClearAll}>
            Batal
          </button>
          <button className="btn btn-secondary" disabled={tasks.length === 0}>
            Generate Task
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskPage;
