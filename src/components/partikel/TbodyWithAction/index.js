import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import moment from "moment";

function TbodyWithAction({
  data,
  display,
  deleteAction,
  customAction,
  actionNotDisplay,
  Detail,
  status,
}) {
  const navigate = useNavigate();

  return (
    <tbody>
      {status === "process" ? (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            <div className="flex items-center justify-center">
              <Spinner animation="border" variant="primary" />
            </div>
          </td>
        </tr>
      ) : data.length ? (
        data.map((data, index) => {
          return (
            <tr key={index}>
              {Object.keys(data).map(
                (key) =>
                  display.indexOf(key) > -1 && (
                    <td key={key}>
                      {key === "dateCreated" || key === "purposedDate"
                        ? data[key] && moment(data[key]).isValid()
                          ? moment(data[key]).format("DD-MM-YYYY, h:mm:ss a")
                          : "Belum Dikonfirmasi"
                        : data[key]}
                    </td>
                  )
              )}
              {!actionNotDisplay && (
                <td>
                  {customAction &&
                    customAction(
                      data.id,
                      data.StatusPengajuan,
                    )}
                  {Detail && (
                    <Button
                      variant={"success"}
                      size={"sm"}
                      action={() => navigate(`${Detail}/${data.id}`)}
                    >
                      Detail
                    </Button>
                  )}
                  {deleteAction && (
                    <Button
                      className={"mx-2"}
                      variant="danger"
                      size={"sm"}
                      action={() => deleteAction(data.id)}
                    >
                      Hapus
                    </Button>
                  )}
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TbodyWithAction;
