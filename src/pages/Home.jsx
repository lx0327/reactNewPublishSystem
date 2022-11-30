import { useSelector, useDispatch } from 'react-redux';
import { increament, decrement } from '../store/module/conterSlice';
function Home() {
  const value = useSelector((store) => store.counter);
  const dispatch = useDispatch();
  return (
    <div className="Home">
      这是Home页
      <p>{value.count}</p>
      <button
        onClick={() => {
          dispatch(increament());
        }}>
        +
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}>
        -
      </button>
    </div>
  );
}
export default Home;
