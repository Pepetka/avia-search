import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/Store/types/dispatch';

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
