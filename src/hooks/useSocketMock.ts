import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePrice } from '@/lib/features/tokenSlice';

export const useSocketMock = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random token ID (1 to 5)
      const randomId = Math.floor(Math.random() * 5) + 1;
      // Random mock change between -0.5 and +0.5
      const change = (Math.random() * 1) - 0.5;
      
      dispatch(updatePrice({ id: randomId.toString(), change }));
    }, 1000); // Updates every 1 second

    return () => clearInterval(interval);
  }, [dispatch]);
};