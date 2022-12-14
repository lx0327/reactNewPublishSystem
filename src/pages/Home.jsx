import { useSelector, useDispatch } from 'react-redux';
import { increament, decrement } from '../store/module/conterSlice';
function Home() {
  const {count,user} = useSelector((store) => store.counter);
  const dispatch = useDispatch();
  return (
    <div className="Home">
      这是Home页
      {user.username}
      <p>{count}</p>
      <button
        onClick={() => {
          dispatch(increament());
        }}>
        +
      </button>
      <button
        onClick={() => {
          console.log(user)
          dispatch(decrement());
        }}>
        -
      </button>
    </div>
  );
}
export default Home;
