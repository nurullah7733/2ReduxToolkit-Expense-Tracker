import { useDispatch } from "react-redux";
import deleteImage from "../../assets/img/delete.svg";
import editImage from "../../assets/img/edit.svg";
import {
  editActive,
  removeTransectionThank,
} from "../../features/transection/transectionSlice";

export default function Transaction({ transaction = {} }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransectionThank(transaction.id));
  };

  return (
    <li className={`transaction ${transaction.type}`}>
      <p>{transaction.name}</p>
      <div className="right">
        <p>৳ {transaction.amount}</p>
        <button className="link" onClick={handleEdit}>
          <img alt="Edit" className="icon" src={editImage} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
